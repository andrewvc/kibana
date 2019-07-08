/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { EuiLoadingSpinner } from '@elastic/eui';
import React from 'react';
import {  CoalescedTimelineEvent } from '../../../common/graphql/types';
import { UptimeGraphQLQueryProps, withUptimeGraphQL } from '../higher_order';
import { coalescedTimelineQuery } from '../../queries';

interface MonitorPageCoalescedTimelineQueryResult {
  timeline?: CoalescedTimelineEvent[];
}

interface MonitorPageCoalescedTimelineProps {
  dateRangeStart: string;
  dateRangeEnd: string;
  monitorId: string;
}

type Props = MonitorPageCoalescedTimelineProps & UptimeGraphQLQueryProps<MonitorPageCoalescedTimelineQueryResult>;

export const MonitorPageCoalescedTimelineComponent = ({ data }: Props) =>
  data && data.timeline ? (
      <pre>
        {data.timeline}
      </pre>
  ) : (
    <EuiLoadingSpinner size="xl" />
  );

export const MonitorPageCoalescedTimeline = withUptimeGraphQL<
  MonitorPageCoalescedTimelineQueryResult,
  MonitorPageCoalescedTimelineProps
>(MonitorPageCoalescedTimelineComponent, coalescedTimelineQuery);
