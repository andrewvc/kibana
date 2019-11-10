/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

require('../../../../../src/setup_node_env');

const { join, resolve } = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const { generate } = require('graphql-code-generator');

const CONFIG_PATH = resolve(__dirname, 'gql_gen.json');
const OUTPUT_INTROSPECTION_PATH = resolve('common', 'graphql', 'introspection.json');
const OUTPUT_TYPES_PATH = resolve('common', 'graphql', 'types.ts');
const SCHEMA_PATH = resolve(__dirname, 'graphql_schemas.ts');

const GRAPHQL_GLOBS = [
  join('public', 'queries', '**', '*._query.ts{,x}')
];

async function main() {
  await generate(
    {
      schema: SCHEMA_PATH,
      overwrite: true,
      generates: {
        [OUTPUT_INTROSPECTION_PATH]: {
          documents: GRAPHQL_GLOBS,
          primitives: {
            String: 'string',
            Int: 'number',
            Float: 'number',
            Boolean: 'boolean',
            ID: 'string',
          },
          config: {
            namingConvention: {
              typeNames: 'change-case#pascalCase',
              enumValues: 'keep',
            },
            //contextType: 'UptimeContext',
            scalars: {
              ToStringArray: 'string[] | string',
              ToNumberArray: 'number[] | number',
              ToDateArray: 'string[] | string',
              ToBooleanArray: 'boolean[] | boolean',
              Date: 'string',
            },
          },
          plugins: ['introspection'],
        },
        [OUTPUT_TYPES_PATH]: {
          primitives: {
            String: 'string',
            Int: 'number',
            Float: 'number',
            Boolean: 'boolean',
            ID: 'string',
          },
          config: {
            avoidOptionals: false,
            namingConvention: {
              typeNames: 'change-case#pascalCase',
              enumValues: 'keep',
            },
            //contextType: 'UptimeContext',
            scalars: {
              ToStringArray: 'string[] | string',
              ToNumberArray: 'number[] | number',
              ToDateArray: 'string[] | string',
              ToBooleanArray: 'boolean[] | boolean',
              Date: 'string',
            },
          },
          plugins: [
            {
              add: `
              /* tslint:disable */
              /* eslint-disable */
              /*
              * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
              * or more contributor license agreements. Licensed under the Elastic License;
              * you may not use this file except in compliance with the Elastic License.
              */

              import { SiemContext } from '../lib/types';
              `,
            },
            'typescript-common',
            'typescript-server',
            'typescript-resolvers',
          ],
        },
      },
    }
  )
}

if (require.main === module) {
  main();
}
