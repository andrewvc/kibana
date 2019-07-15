/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiLoadingSpinner, EuiTitle, EuiPanel, EuiBasicTable, EuiText } from '@elastic/eui';
import React, { Fragment, useContext } from 'react';
import { uniq, flatten, merge } from 'lodash';
import { CoalescedTimelineEvent } from '../../../common/graphql/types';
import { UptimeGraphQLQueryProps, withUptimeGraphQL } from '../higher_order';
import { coalescedTimelineQuery } from '../../queries';
import { UptimeSettingsContext } from '../../contexts';
import moment from 'moment';
import { MonitorListStatusColumn } from './monitor_list/monitor_list_status_column';
import { FormattedMessage } from '@kbn/i18n/react';

interface MonitorPageCoalescedTimelineQueryResult {
  timeline?: CoalescedTimelineEvent[];
}

interface MonitorPageCoalescedTimelineProps {
  dateRangeStart: string;
  dateRangeEnd: string;
  monitorId: string;
}

type Props = MonitorPageCoalescedTimelineProps &
  UptimeGraphQLQueryProps<MonitorPageCoalescedTimelineQueryResult>;

type TableCTE = CoalescedTimelineEvent & {
  isCurrentStatus: boolean;
  statusByLocation: { [key: string]: string };
};

const timelineToTableData = (
  timeline: CoalescedTimelineEvent[]
): { locations: string[]; tabularTimeline: any } => {
  // We want to process this backwards, from earliest to latest
  const chronological = timeline.slice().reverse();
  const lastLocStatuses: { [key: string]: string } = {};
  const mapped = chronological.map((cte, idx) => {
    const isMostRecent = idx === chronological.length - 1;
    const res: TableCTE = {
      start: cte.start,
      end: cte.end,
      locations: cte.locations,
      status: cte.status,
      interval: cte.interval,
      up: cte.up,
      down: cte.down,
      // TODO Use the same constant for slop here as in the timeline
      isCurrentStatus: new Date().getTime() < cte.end + 5 * cte.interval,
      statusByLocation: {},
    };
    cte.locations.forEach(location => {
      res.statusByLocation[location] = cte.status;
      lastLocStatuses[location] = cte.status;
      merge(res, lastLocStatuses);
    });
    return res;
  });
  mapped.reverse();
  const locations = Object.keys(lastLocStatuses);
  locations.sort();
  return { locations: locations, tabularTimeline: mapped };
};

export const MonitorPageCoalescedTimelineComponent = ({ data }: Props) => {
  if (!data || !data.timeline) {
    return <EuiLoadingSpinner size="xl" />;
  }

  const { locations, tabularTimeline } = timelineToTableData(data.timeline);

  const { colors } = useContext(UptimeSettingsContext);
  const colorMap: any = {
    up: colors.success,
    mixed: colors.warning,
    down: colors.danger,
  };
  const columns = [];
  locations.forEach(l => {
    columns.push({
      field: l,
      name: l,
      sortable: false,
      width: '100px',
      render: (status: string, d: TableCTE) => {
        const grayOut = !d.isCurrentStatus && d.locations.indexOf(l) < 0;

        return (
          <MonitorListStatusColumn
            grayOut={grayOut}
            status={status}
            timestamp={d.start.toString()}
          />
        );
      },
    });
  });
  columns.push({
    field: 'status',
    name: 'Description',
    sortable: false,
    render: (status: string, { locations, start, end, isCurrentStatus, up, down }: TableCTE) => {
      const verb = isCurrentStatus
        ? locations.length > 1
          ? 'have been'
          : 'has been'
        : locations.length > 1
        ? 'were'
        : 'was';
      const total = up + down;
      const statusMessage =
        status != 'unstable' && status != 'flapping' && status! + 'mixed' ? (
          <strong>{status}</strong>
        ) : (
          <Fragment>
            <strong>{status}</strong> having too many transitions to show here.{' '}
            <strong>{Number((up / total) * 100).toFixed(2)}%</strong> of pings succeeded
          </Fragment>
        );
      return (
        <EuiText>
          <strong>{locations.join(', ')}</strong> {verb} {statusMessage} for{' '}
          <strong>{moment.duration(end - start).humanize()}</strong> with{' '}
          <strong>{total} pings</strong> performed
        </EuiText>
      );
    },
  });

  return (
    <Fragment>
      <EuiTitle size="xs">
        <h4>
          <FormattedMessage
            id="xpack.uptime.timeline.titleLabel"
            defaultMessage="Timeline"
            description="Timeline of events"
          />
        </h4>
      </EuiTitle>
      <EuiPanel>
        <EuiBasicTable items={tabularTimeline} columns={columns} />
      </EuiPanel>
    </Fragment>
  );
};

export const MonitorPageCoalescedTimeline = withUptimeGraphQL<
  MonitorPageCoalescedTimelineQueryResult,
  MonitorPageCoalescedTimelineProps
>(MonitorPageCoalescedTimelineComponent, coalescedTimelineQuery);
