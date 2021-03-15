/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { set } from '@elastic/safer-lodash-set';
import { QueryContext } from './query_context';
import { MonitorSummary } from '../../../../common/runtime_types';

/**
 * This is the first phase of the query. In it, we find all monitor IDs that have ever matched the given filters.
 * @param queryContext the data and resources needed to perform the query
 * @param searchAfter indicates where Elasticsearch should continue querying on subsequent requests, if at all
 * @param size the minimum size of the matches to chunk
 */
export const findPotentialMatches = async (
  queryContext: QueryContext,
  searchAfter: any,
  size: number
) => {
  const { body: queryResult } = await query(queryContext, searchAfter, size);

  const monitorSummaries: MonitorSummary[] = [];
  (queryResult.aggregations?.monitors.buckets ?? []).forEach((bucket: any) => {
    const monitorId = bucket.key.monitor_id;
    const pings = bucket.geo.buckets.map((gb: any) => gb.top.hits.hits[0]);
    pings.sort((a: any, b: any) => {
      const aTs = a._source['@timestamp'];
      const bTs = b._source['@timestamp'];

      if (aTs < bTs) {
        return 1;
      } else if (bTs > aTs) {
        return -1;
      }
      return 0;
    });

    const up = pings
      .map((p: any) => p._source.summary.up)
      .reduce((acc: number, v: number) => acc + v);
    const down = pings
      .map((p: any) => p._source.summary.down)
      .reduce((acc: number, v: number) => acc + v);

    const summary: MonitorSummary = {
      monitor_id: monitorId,
      state: {
        timestamp: pings[0]._source['@timestamp'],
        monitor: pings[0]._source.monitor,
        url: pings[0]._source.url,
        summary: {
          up,
          down,
          status: down > 0 ? 'down' : 'up',
        },
        summaryPings: pings.map((p: any) => p._source),
        observer: pings.map((p: any) => p.observer),
      },
    };
    monitorSummaries.push(summary);
  });

  return {
    monitorSummaries,
    searchAfter: queryResult.aggregations?.monitors?.after_key,
  };
};

const query = async (queryContext: QueryContext, searchAfter: any, size: number) => {
  const body = await queryBody(queryContext, searchAfter, size);

  const params = {
    body,
  };

  return await queryContext.search(params);
};

const queryBody = async (queryContext: QueryContext, searchAfter: any, size: number) => {
  const filters = await queryContext.dateAndCustomFilters();
  filters.push({ exists: { field: 'summary.up' } });

  if (queryContext.statusFilter && queryContext.query) {
    filters.push({ match: { 'monitor.status': queryContext.statusFilter } });
  }

  const body = {
    size: 0,
    query: {
      bool: {
        filter: filters,
        ...(queryContext.query
          ? {
              minimum_should_match: 1,
              should: [
                {
                  multi_match: {
                    query: escape(queryContext.query),
                    type: 'phrase_prefix',
                    fields: ['monitor.id.text', 'monitor.name.text', 'url.full.text'],
                  },
                },
              ],
            }
          : {}),
      },
    },
    aggs: {
      monitors: {
        composite: {
          size,
          sources: [
            {
              monitor_id: { terms: { field: 'monitor.id', order: queryContext.cursorOrder() } },
            },
          ],
        },
        aggs: {
          geo: {
            terms: { field: 'observer.geo.name', missing: 'No Location Configured' },
            aggs: {
              top: { top_hits: { size: 1, sort: { '@timestamp': 'desc' } } },
            },
          },
        },
      },
    },
  };

  if (searchAfter) {
    set(body, 'aggs.monitors.composite.after', searchAfter);
  }

  return body;
};
