import { Timeline, TLEvent, TLMultiEvent } from '../timeline';

describe('timeline', () => {
  it('initializes empty without error', () => {
    const tl = new Timeline([], 1, 1);
  });

  describe('coalescing multiple locations - contiguous', () => {
    it('coalesces events with the same start', () => {
      const loc1 = 'fooLoc';
      const loc2 = 'barLoc';
      const tl = new Timeline(
        [
          // First block
          new TLEvent(loc1, 1, 'up', 1, 2),
          new TLEvent(loc1, 1, 'up', 1, 3),
          new TLEvent(loc1, 1, 'up', 1, 4),
          new TLEvent(loc1, 1, 'up', 1, 5),
          // Second block
          new TLEvent(loc1, 1, 'down', 7, 8),
          new TLEvent(loc1, 1, 'up', 7, 9),
          // Loc2 First block
          new TLEvent(loc2, 1, 'down', 2, 3),
          new TLEvent(loc2, 1, 'down', 2, 4),
          new TLEvent(loc2, 1, 'down', 2, 5),
          // Loc2 Second block
          new TLEvent(loc2, 1, 'up', 8, 9),
          new TLEvent(loc2, 1, 'down', 8, 10),
        ],
        1,
        10
      );
      tl.coalesceIdenticalStart();
      const ebl = tl.eventsByLocation;

      const l1Events = ebl[loc1];
      const l2Events = ebl[loc2];

      expect(l1Events[0]).toEqual(new TLEvent(loc1, 1, 'up', 1, 5));
      expect(l1Events[1]).toEqual(new TLEvent(loc1, 1, 'flapping', 7, 9));

      expect(l2Events[0]).toEqual(new TLEvent(loc2, 1, 'down', 2, 5));
      expect(l2Events[1]).toEqual(new TLEvent(loc2, 1, 'flapping', 8, 10));

      expect(l1Events.length + l2Events.length).toEqual(4);
    });

    it('coalesces events with similar start/ end times from different locations', () => {
      const loc1 = 'l1';
      const loc2 = 'l2';

      const tl = new Timeline(
        [new TLEvent(loc1, 1, 'up', 1, 7), new TLEvent(loc2, 1, 'up', 2, 6)],
        1,
        7
      );

      expect(tl.events[0]).toEqual(new TLMultiEvent([loc1, loc2], 1, 'up', 1, 7));
      expect(tl.events.length).toEqual(1);
    });

    it('adds no data events', () => {
      const loc1 = 'l1';

      const tl = new Timeline(
        [new TLEvent(loc1, 1, 'up', 1, 7), new TLEvent(loc1, 1, 'up', 50, 70)],
        1,
        70
      );

      expect(tl.events).toEqual([
      new TLEvent(loc1, 1, 'up', 50, 70),
      new TLEvent(loc1, 1, 'missing', 8, 49),
      new TLEvent(loc1, 1, 'up', 1, 7),
      ])

      expect(tl.events.length).toEqual(3);
    });

    it('handles complexity', () => {
      const interval = 1000;
      const rawData = [
        { start: 4001, end: 4999, status: 'up', location: 'St. Paul', interval: 1000 },
        { start: 4205, end: 5203, status: 'up', location: 'Minneapolis', interval: 1000 },
        { start: 5000, end: 5998, status: 'up', location: 'St. Paul', interval: 1000 },
        { start: 5203, end: 6201, status: 'up', location: 'Minneapolis', interval: 1000 },
        { start: 6002, end: 7001, status: 'up', location: 'St. Paul', interval: 1000 },
        { start: 6203, end: 7201, status: 'up', location: 'Minneapolis', interval: 1000 },
        { start: 7004, end: 8002, status: 'up', location: 'St. Paul', interval: 1000 },
        { start: 7201, end: 8200, status: 'up', location: 'Minneapolis', interval: 1000 },
      ];

      const data = rawData.map(d => new TLEvent(d.location, d.interval, d.status, d.start, d.end));

      const start: number = Math.min(...data.map(d => d.start));
      const end: number = Math.max(...data.map(d => d.end));

      const tl = new Timeline(data, start, end);
      const msp = 'Minneapolis';
      const stp = 'St. Paul';
      const both = [msp, stp];

      expect(tl.events).toEqual([
        new TLMultiEvent(both, 1000, 'up', 4001, 8200)
      ]);

      expect(tl.events.length).toEqual(1);
    });
  });
});
