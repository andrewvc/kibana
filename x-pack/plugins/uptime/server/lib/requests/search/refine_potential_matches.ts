/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { QueryContext } from './query_context';
import { CursorDirection } from '../../../../common/runtime_types';
import { MonitorGroups, MonitorLocCheckGroup } from './fetch_page';

/**
 * Determines whether the provided check groups are the latest complete check groups for their associated monitor ID's.
 * If provided check groups are not the latest complete group, they are discarded.
 * @param queryContext the data and resources needed to perform the query
 * @param potentialMatchMonitorIDs the monitor ID's of interest
 * @param potentialMatchCheckGroups the check groups to filter for the latest match per ID
 */
// check groups for their associated monitor IDs. If not, it discards the result.
export const refinePotentialMatches = async (
  queryContext: QueryContext,
  potentialMatchMonitorIDs: string[],
  potentialMatchCheckGroups: Set<string>
): Promise<MonitorGroups[]> => {
  if (potentialMatchMonitorIDs.length === 0) {
    return [];
  }

  const recentGroupsMatchingStatus = await fullyMatchingIds(
    queryContext,
    potentialMatchMonitorIDs,
    potentialMatchCheckGroups
  );

  // Return the monitor groups filtering out potential matches that weren't current
  const matches: MonitorGroups[] = potentialMatchMonitorIDs
    .map((id: string) => {
      return { id, groups: recentGroupsMatchingStatus.get(id) || [] };
    })
    .filter((mrg) => mrg.groups.length > 0);

  // Sort matches by ID
  matches.sort((a: MonitorGroups, b: MonitorGroups) => {
    return a.id === b.id ? 0 : a.id > b.id ? 1 : -1;
  });

  if (queryContext.pagination.cursorDirection === CursorDirection.BEFORE) {
    matches.reverse();
  }
  return matches;
};

const fullyMatchingIds = async (
  queryContext: QueryContext,
  potentialMatchMonitorIDs: string[],
  potentialMatchCheckGroups: Set<string>
) => {
  const mostRecentQueryResult = await mostRecentCheckGroups(queryContext, potentialMatchMonitorIDs);

  const matching = new Map<string, MonitorLocCheckGroup[]>();
  MonitorLoop: for (const monBucket of mostRecentQueryResult.aggregations.monitor.buckets) {
    const monitorId: string = monBucket.key;
    const groups: MonitorLocCheckGroup[] = [];

    // Did at least one location match?
    let matched = false;
    for (const locBucket of monBucket.location.buckets) {
      const location = locBucket.key;
      const latestSource = locBucket.latest.hits.hits[0]._source;
      const latestStillMatchingSource = locBucket.latest_matching.top.hits.hits[0]._source;
      // If the most recent document still matches the most recent document matching the current filters
      // we can include this in the result
      if (latestStillMatchingSource['@timestamp'] >= latestSource['@timestamp']) {
        matched = true;
      }
      const checkGroup = latestSource.monitor.check_group;
      const status = latestSource.summary.down > 0 ? 'down' : 'up';

      // This monitor doesn't match, so just skip ahead and don't add it to the output
      // Only skip in case of up statusFilter, for a monitor to be up, all checks should be up
      if (queryContext?.statusFilter === 'up' && queryContext.statusFilter !== status) {
        continue MonitorLoop;
      }

      groups.push({
        monitorId,
        location,
        checkGroup,
        status,
        summaryTimestamp: latestSource['@timestamp'],
      });
    }

    // If one location matched, include data from all locations in the result set
    if (matched) {
      matching.set(monitorId, groups);
    }
  }

  return matching;
};

export const mostRecentCheckGroups = async (
  queryContext: QueryContext,
  potentialMatchMonitorIDs: string[]
): Promise<any> => {
  const params = {
    index: queryContext.heartbeatIndices,
    body: {
      size: 0,
      query: {
        bool: {
          filter: [
            await queryContext.dateRangeFilter(),
            { terms: { 'monitor.id': potentialMatchMonitorIDs } },
            // only match summary docs because we only want the latest *complete* check group.
            { exists: { field: 'summary' } },
          ],
        },
      },
      aggs: {
        monitor: {
          terms: { field: 'monitor.id', size: potentialMatchMonitorIDs.length },
          aggs: {
            location: {
              terms: { field: 'observer.geo.name', missing: 'N/A', size: 100 },
              aggs: {
                latest: {
                  top_hits: {
                    sort: [{ '@timestamp': 'desc' }],
                    _source: {
                      includes: ['monitor.check_group', '@timestamp', 'summary.up', 'summary.down'],
                    },
                    size: 1,
                  },
                },
                latest_matching: {
                  filter: queryContext.filterClause || { match_all: {} },
                  aggs: {
                    top: {
                      top_hits: {
                        sort: [{ '@timestamp': 'desc' }],
                        _source: {
                          includes: ['monitor.check_group', '@timestamp'],
                        },
                        size: 1,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return await queryContext.search(params);
};
