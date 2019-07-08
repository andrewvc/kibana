/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import gql from 'graphql-tag';

export const coalescedTimelineQuery = gql`
  query CoalescedTimeline($dateRangeStart: String!, $dateRangeEnd: String!, $monitorId: String!) {
    timeline: getCoalescedTimeline(dateRangeStart: $dateRangeStart, dateRangeEnd: $dateRangeEnd, monitorId: $monitorId) {
      start
      end
      status
      locations
    }
  }

 `;