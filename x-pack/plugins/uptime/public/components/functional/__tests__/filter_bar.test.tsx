/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import { shallowWithIntl } from 'test_utils/enzyme_helpers';
import { FilterBar } from '../filter_bar';

describe('FilterBar component', () => {
  const data = {
    filterBar: {
      ports: [9200, 12349],
      ids: [
        'auto-tcp-0X81440A68E839814C',
        'auto-http-0X3675F89EF0612091',
        'auto-http-0X970CBD2F2102BFA8',
        'auto-http-0X131221E73F825974',
        'auto-http-0X9CB71300ABD5A2A8',
        'auto-http-0XD9AE729FC1C1E04A',
        'auto-http-0XDD2D4E60FD4A61C3',
        'auto-http-0XA8096548ECEB85B7',
        'auto-http-0XC9CDA429418EDC2B',
        'auto-http-0XE3B163481423197D',
      ],
      urls: [
        'tcp://localhost:9200',
        'http://localhost:12349/',
        'http://www.google.com/',
        'https://www.google.com/',
        'https://www.github.com/',
        'http://www.reddit.com/',
        'https://www.elastic.co',
        'http://www.example.com/',
        'https://www.wikipedia.org/',
        'https://news.google.com/',
      ],
      names: [],
      schemes: ['tcp', 'http'],
    },
  };

  it('renders the component without errors', () => {
    const component = shallowWithIntl(
      <FilterBar filterBar={data.filterBar} updateQuery={jest.fn()} />
    );
    expect(component).toMatchSnapshot();
  });
});
