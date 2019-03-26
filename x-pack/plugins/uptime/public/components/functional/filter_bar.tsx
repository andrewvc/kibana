/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

// @ts-ignore No typings for EuiSearchBar
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiSearchBar, EuiToolTip } from '@elastic/eui';
import { i18n } from '@kbn/i18n';
import React from 'react';
import { FilterBar as FilterBarType, MonitorKey } from '../../../common/graphql/types';
import { filterBarSearchSchema } from './search_schema';

interface FilterBarProps {
  filterBar: FilterBarType;
  updateQuery: (query: object | undefined) => void;
}

const SEARCH_THRESHOLD = 2;

export const FilterBar = ({
  filterBar: { names, ports, ids, urls, schemes },
  updateQuery,
}: FilterBarProps) => {
  // TODO: add a factory function + type for these filter options
  const filters = [
    {
      type: 'field_value_toggle_group',
      field: 'monitor.status',
      items: [
        {
          value: 'up',
          name: i18n.translate('xpack.uptime.filterBar.filterUpLabel', {
            defaultMessage: 'Up',
          }),
        },
        {
          value: 'down',
          name: i18n.translate('xpack.uptime.filterBar.filterDownLabel', {
            defaultMessage: 'Down',
          }),
        },
      ],
    },
    // TODO: add health to this select
    {
      type: 'field_value_selection',
      field: 'monitor.id',
      name: i18n.translate('xpack.uptime.filterBar.options.idLabel', {
        defaultMessage: 'ID',
      }),
      multiSelect: false,
      options: ids ? ids.map((id: string) => ({ value: id, view: id })) : [],
      searchThreshold: SEARCH_THRESHOLD,
    },
    {
      type: 'field_value_selection',
      field: 'monitor.name',
      name: i18n.translate('xpack.uptime.filterBar.options.nameLabel', {
        defaultMessage: 'Name',
      }),
      multiSelect: false,
      options: names
        ? names.map((nameValue: string) => ({ value: nameValue, view: nameValue }))
        : [],
      searchThreshold: SEARCH_THRESHOLD,
    },
    {
      type: 'field_value_selection',
      field: 'url.full',
      name: i18n.translate('xpack.uptime.filterBar.options.urlLabel', {
        defaultMessage: 'URL',
      }),
      multiSelect: false,
      options: urls ? urls.map((url: string) => ({ value: url, view: url })) : [],
      searchThreshold: SEARCH_THRESHOLD,
    },
    {
      type: 'field_value_selection',
      field: 'url.port',
      name: i18n.translate('xpack.uptime.filterBar.options.portLabel', {
        defaultMessage: 'Port',
      }),
      multiSelect: false,
      options: ports
        ? ports.map((portValue: any) => ({
            value: portValue,
            view: portValue,
          }))
        : [],
      searchThreshold: SEARCH_THRESHOLD,
    },
    {
      type: 'field_value_selection',
      field: 'monitor.type',
      name: i18n.translate('xpack.uptime.filterBar.options.schemeLabel', {
        defaultMessage: 'Scheme',
      }),
      multiSelect: false,
      options: schemes
        ? schemes.map((schemeValue: string) => ({
            value: schemeValue,
            view: schemeValue,
          }))
        : [],
      searchThreshold: SEARCH_THRESHOLD,
    },
  ];
  return (
    <EuiFlexGroup>
      <EuiFlexItem grow>
        <EuiSearchBar
          // TODO: update typing
          onChange={({ query }: { query?: { text: string } }) => {
            try {
              let esQuery;
              if (query && query.text) {
                esQuery = EuiSearchBar.Query.toESQuery(query);
              }
              updateQuery(esQuery);
            } catch (e) {
              updateQuery(undefined);
            }
          }}
          filters={filters}
          schema={filterBarSearchSchema}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
