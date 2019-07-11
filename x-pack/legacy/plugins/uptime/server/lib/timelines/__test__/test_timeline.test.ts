import { Timeline, TLEvent, TLMultiEvent } from "../timeline";

describe('timeline', () => {
  it('initializes empty without error', () => {
    const tl = new Timeline([]);
  });

  describe("coalescing multiple locations - contiguous", () => {
    it('coalesces events with the same start', () => {
      const loc1 = "fooLoc";
      const loc2 = "barLoc";
      const tl = new Timeline([
        // First block
        new TLEvent(loc1, 1, "up", 1, 2),
        new TLEvent(loc1, 1, "up", 1, 3),
        new TLEvent(loc1, 1, "up", 1, 4),
        new TLEvent(loc1, 1, "up", 1, 5),
        // Second block
        new TLEvent(loc1, 1, "down", 7, 8),
        new TLEvent(loc1, 1, "up", 7, 9),
        // Loc2 First block
        new TLEvent(loc2, 1, "down", 2, 3),
        new TLEvent(loc2, 1, "down", 2, 4),
        new TLEvent(loc2, 1, "down", 2, 5),
        // Loc2 Second block
        new TLEvent(loc2, 1, "up", 8, 9),
        new TLEvent(loc2, 1, "down", 8, 10),
      ]);
      tl.coalesceIdenticalStart();
      tl.mergeLocationsIntoComputed();
      tl.sortComputed();
      const events = tl.computed;
      expect(events.length).toEqual(4);
      expect(events[0]).toEqual(new TLEvent(loc2, 1, "flapping", 8, 10));
      expect(events[1]).toEqual(new TLEvent(loc1, 1, "flapping", 7, 9));
      expect(events[2]).toEqual(new TLEvent(loc2, 1, "down", 2, 5));
      expect(events[3]).toEqual(new TLEvent(loc1, 1, "up", 1, 5));
    });

    it('coalesces events with similar start/ end times from different locations', () => {
      const loc1 = "l1";
      const loc2 = "l2";

      const tl = new Timeline([
        new TLEvent(loc1, 1, "up", 1, 7),
        new TLEvent(loc2, 1, "up", 2, 6),
      ]);

      expect(tl.events.length).toEqual(1);
      expect(tl.events[0]).toEqual(new TLMultiEvent([loc1, loc2], 1, "up", 1, 7 ));
    });
  })
  
});
