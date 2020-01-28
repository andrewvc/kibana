/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { groupBy } from 'lodash';
import { Span } from '../../../../../../../../typings/es_schemas/ui/Span';
import { Transaction } from '../../../../../../../../typings/es_schemas/ui/Transaction';
import {
  getClockSkew,
  getOrderedWaterfallItems,
  getWaterfall,
  IWaterfallItem,
  IWaterfallTransaction
} from './waterfall_helpers';
import { APMError } from '../../../../../../../../typings/es_schemas/ui/APMError';

describe('waterfall_helpers', () => {
  describe('getWaterfall', () => {
    const hits = [
      {
        processor: { event: 'transaction' },
        trace: { id: 'myTraceId' },
        service: { name: 'opbeans-node' },
        transaction: {
          duration: { us: 49660 },
          name: 'GET /api',
          id: 'myTransactionId1'
        },
        timestamp: { us: 1549324795784006 }
      } as Transaction,
      {
        parent: { id: 'mySpanIdA' },
        processor: { event: 'span' },
        trace: { id: 'myTraceId' },
        service: { name: 'opbeans-ruby' },
        transaction: { id: 'myTransactionId2' },
        timestamp: { us: 1549324795825633 },
        span: {
          duration: { us: 481 },
          name: 'SELECT FROM products',
          id: 'mySpanIdB'
        }
      } as Span,
      {
        parent: { id: 'myTransactionId2' },
        processor: { event: 'span' },
        trace: { id: 'myTraceId' },
        service: { name: 'opbeans-ruby' },
        transaction: { id: 'myTransactionId2' },
        span: {
          duration: { us: 6161 },
          name: 'Api::ProductsController#index',
          id: 'mySpanIdA'
        },
        timestamp: { us: 1549324795824504 }
      } as Span,
      {
        parent: { id: 'mySpanIdA' },
        processor: { event: 'span' },
        trace: { id: 'myTraceId' },
        service: { name: 'opbeans-ruby' },
        transaction: { id: 'myTransactionId2' },
        span: {
          duration: { us: 532 },
          name: 'SELECT FROM product',
          id: 'mySpanIdC'
        },
        timestamp: { us: 1549324795827905 }
      } as Span,
      {
        parent: { id: 'myTransactionId1' },
        processor: { event: 'span' },
        trace: { id: 'myTraceId' },
        service: { name: 'opbeans-node' },
        transaction: { id: 'myTransactionId1' },
        span: {
          duration: { us: 47557 },
          name: 'GET opbeans-ruby:3000/api/products',
          id: 'mySpanIdD'
        },
        timestamp: { us: 1549324795785760 }
      } as Span,
      ({
        parent: { id: 'mySpanIdD' },
        processor: { event: 'transaction' },
        trace: { id: 'myTraceId' },
        service: { name: 'opbeans-ruby' },
        transaction: {
          duration: { us: 8634 },
          name: 'Api::ProductsController#index',
          id: 'myTransactionId2',
          marks: {
            agent: {
              domInteractive: 382,
              domComplete: 383,
              timeToFirstByte: 14
            }
          }
        },
        timestamp: { us: 1549324795823304 }
      } as unknown) as Transaction,
      ({
        processor: { event: 'error' },
        parent: { id: 'myTransactionId1' },
        timestamp: { us: 1549324795810000 },
        trace: { id: 'myTraceId' },
        transaction: { id: 'myTransactionId1' },
        error: {
          id: 'error1',
          grouping_key: 'errorGroupingKey1',
          log: {
            message: 'error message'
          }
        },
        service: { name: 'opbeans-ruby' },
        agent: {
          name: 'ruby',
          version: '2'
        }
      } as unknown) as APMError
    ];

    it('should return full waterfall', () => {
      const entryTransactionId = 'myTransactionId1';
      const errorsPerTransaction = {
        myTransactionId1: 2,
        myTransactionId2: 3
      };
      const waterfall = getWaterfall(
        {
          trace: { items: hits, exceedsMax: false },
          errorsPerTransaction
        },
        entryTransactionId
      );

      expect(waterfall.items.length).toBe(7);
      expect(waterfall.items[0].id).toBe('myTransactionId1');
      expect(waterfall.errorsCount).toEqual(1);
      expect(waterfall).toMatchSnapshot();
    });

    it('should return partial waterfall', () => {
      const entryTransactionId = 'myTransactionId2';
      const errorsPerTransaction = {
        myTransactionId1: 2,
        myTransactionId2: 3
      };
      const waterfall = getWaterfall(
        {
          trace: { items: hits, exceedsMax: false },
          errorsPerTransaction
        },
        entryTransactionId
      );

      expect(waterfall.items.length).toBe(4);
      expect(waterfall.items[0].id).toBe('myTransactionId2');
      expect(waterfall.errorsCount).toEqual(0);
      expect(waterfall).toMatchSnapshot();
    });
  });

  describe('getWaterfallItems', () => {
    it('should order items correctly', () => {
      const items: IWaterfallItem[] = [
        {
          docType: 'span',
          doc: {
            parent: { id: 'c' },
            service: { name: 'opbeans-java' },
            transaction: {
              id: 'c'
            },
            timestamp: { us: 1536763736371000 },
            span: {
              id: 'd',
              name: 'SELECT'
            }
          } as Span,
          id: 'd',
          parentId: 'c',
          duration: 210,
          offset: 0,
          skew: 0
        },
        {
          docType: 'span',
          doc: {
            parent: { id: 'a' },
            service: { name: 'opbeans-java' },
            transaction: {
              id: 'a'
            },
            timestamp: { us: 1536763736368000 },
            span: {
              id: 'b',
              name: 'GET [0:0:0:0:0:0:0:1]'
            }
          } as Span,
          id: 'b',
          parentId: 'a',
          duration: 4694,
          offset: 0,
          skew: 0
        },
        {
          docType: 'span',
          doc: {
            parent: { id: 'a' },
            service: { name: 'opbeans-java' },
            transaction: {
              id: 'a'
            },
            timestamp: { us: 1536763736367000 },
            span: {
              id: 'b2',
              name: 'GET [0:0:0:0:0:0:0:1]'
            }
          } as Span,
          id: 'b2',
          parentId: 'a',
          duration: 4694,
          offset: 0,
          skew: 0
        },
        {
          docType: 'transaction',
          doc: {
            parent: { id: 'b' },
            service: { name: 'opbeans-java' },
            timestamp: { us: 1536763736369000 },
            transaction: { id: 'c', name: 'APIRestController#productsRemote' }
          } as Transaction,
          id: 'c',
          parentId: 'b',
          duration: 3581,
          offset: 0,
          skew: 0
        },
        {
          docType: 'transaction',
          doc: {
            service: { name: 'opbeans-java' },
            timestamp: { us: 1536763736366000 },
            transaction: {
              id: 'a',
              name: 'APIRestController#products'
            }
          } as Transaction,
          id: 'a',
          duration: 9480,
          offset: 0,
          skew: 0
        }
      ];

      const childrenByParentId = groupBy(items, hit =>
        hit.parentId ? hit.parentId : 'root'
      );
      const entryTransactionItem = childrenByParentId
        .root[0] as IWaterfallTransaction;

      expect(
        getOrderedWaterfallItems(childrenByParentId, entryTransactionItem)
      ).toMatchSnapshot();
    });

    it('should handle cyclic references', () => {
      const items = [
        {
          docType: 'transaction',
          id: 'a',
          doc: ({
            transaction: { id: 'a' },
            timestamp: { us: 10 }
          } as unknown) as Transaction
        } as IWaterfallItem,
        {
          docType: 'span',
          id: 'b',
          parentId: 'a',
          doc: ({
            span: {
              id: 'b'
            },
            parent: { id: 'a' },
            timestamp: { us: 20 }
          } as unknown) as Span
        } as IWaterfallItem
      ];
      const childrenByParentId = groupBy(items, hit =>
        hit.parentId ? hit.parentId : 'root'
      );
      const entryTransactionItem = childrenByParentId
        .root[0] as IWaterfallTransaction;
      expect(
        getOrderedWaterfallItems(childrenByParentId, entryTransactionItem)
      ).toMatchSnapshot();
    });
  });

  describe('getClockSkew', () => {
    it('should adjust when child starts before parent', () => {
      const child = {
        docType: 'transaction',
        doc: {
          timestamp: { us: 0 }
        },
        duration: 50
      } as IWaterfallItem;

      const parent = {
        docType: 'transaction',
        doc: {
          timestamp: { us: 100 }
        },
        duration: 100,
        skew: 5
      } as IWaterfallItem;

      expect(getClockSkew(child, parent)).toBe(130);
    });

    it('should not adjust when child starts after parent has ended', () => {
      const child = {
        docType: 'transaction',
        doc: {
          timestamp: { us: 250 }
        },
        duration: 50
      } as IWaterfallItem;

      const parent = {
        docType: 'transaction',
        doc: {
          timestamp: { us: 100 }
        },
        duration: 100,
        skew: 5
      } as IWaterfallItem;

      expect(getClockSkew(child, parent)).toBe(0);
    });

    it('should not adjust when child starts within parent duration', () => {
      const child = {
        docType: 'transaction',
        doc: {
          timestamp: { us: 150 }
        },
        duration: 50
      } as IWaterfallItem;

      const parent = {
        docType: 'transaction',
        doc: {
          timestamp: { us: 100 }
        },
        duration: 100,
        skew: 5
      } as IWaterfallItem;

      expect(getClockSkew(child, parent)).toBe(0);
    });

    it('should return parent skew for spans', () => {
      const child = {
        docType: 'span'
      } as IWaterfallItem;

      const parent = {
        docType: 'span',
        doc: {
          timestamp: { us: 100 }
        },
        duration: 100,
        skew: 5
      } as IWaterfallItem;

      expect(getClockSkew(child, parent)).toBe(5);
    });

    it('should return parent skew for errors', () => {
      const child = {
        docType: 'error'
      } as IWaterfallItem;

      const parent = {
        docType: 'transaction',
        doc: {
          timestamp: { us: 100 }
        },
        duration: 100,
        skew: 5
      } as IWaterfallItem;

      expect(getClockSkew(child, parent)).toBe(5);
    });

    it('should handle missing parent', () => {
      const child = {
        docType: 'transaction'
      } as IWaterfallItem;

      const parent = undefined;

      expect(getClockSkew(child, parent)).toBe(0);
    });
  });
});
