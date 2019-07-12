/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiLoadingSpinner, EuiPanel, EuiBasicTable, EuiText } from '@elastic/eui';
import React, { Fragment, useContext } from 'react';
import { uniq, flatten, merge } from 'lodash';
import { CoalescedTimelineEvent } from '../../../common/graphql/types';
import { UptimeGraphQLQueryProps, withUptimeGraphQL } from '../higher_order';
import { coalescedTimelineQuery } from '../../queries';
import { UptimeSettingsContext } from '../../contexts';
import moment from 'moment';
import { MonitorListStatusColumn } from './monitor_list/monitor_list_status_column';

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

const timelineToTableData = (
  timeline: CoalescedTimelineEvent[]
): { locations: string[]; tabularTimeline: any } => {
  // We want to process this backwards, from earliest to latest
  const chronological = timeline.slice().reverse();
  const lastLocStatuses: { [key: string]: string } = {};
  const mapped = chronological.map(cte => {
    const res: any = { start: cte.start, end: cte.end, locations: cte.locations, status: cte.status };
    cte.locations.forEach(l => {
      res[l] = cte.status;
      lastLocStatuses[l] = cte.status;
      merge(res, lastLocStatuses);
    });
    return res;
  });
  mapped.reverse();
  const locations = Object.keys(lastLocStatuses)
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
      render: (status: string, d: any) => {
        const unchanged = d.locations.indexOf(l) < 0;
        return <MonitorListStatusColumn grayOut={unchanged} status={status} timestamp={d.start} />;
      },
    });
  });
  columns.push({
    field: 'status',
    name: 'Description',
    sortable: false,
    render: (status: string, { locations, start, end }: { locations: string[], start: number, end: number }) => {
      return (
        <EuiText>
          <strong>{locations.join(', ')}</strong> was <strong>{status}</strong> for <strong>{moment.duration(end-start).humanize()}</strong>
        </EuiText>
      );
    },
  });

  return (
    <EuiPanel>
      <EuiBasicTable items={tabularTimeline} columns={columns} />
    </EuiPanel>
  );

  /*
  const listItems = data.timeline.map(cte => {
    

    const label = <Fragment><strong>{cte.status}</strong>
                    {' '}from <strong>{cte.locations.join(", ")}</strong>
                    {' '}at <strong>{moment(cte.start).fromNow()}</strong>
                  </Fragment>
    return <EuiListGroupItem label={label} />
  });

  return <EuiPanel>
    <EuiListGroup maxWidth="false">
      {listItems}
    </EuiListGroup>
    </EuiPanel>;
    */
};

export const MonitorPageCoalescedTimeline = withUptimeGraphQL<
  MonitorPageCoalescedTimelineQueryResult,
  MonitorPageCoalescedTimelineProps
>(MonitorPageCoalescedTimelineComponent, coalescedTimelineQuery);
