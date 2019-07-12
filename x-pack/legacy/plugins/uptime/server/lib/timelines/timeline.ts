import { CoalescedTimelineEvent } from '../../../common/graphql/types';
import { sortBy, groupBy, uniq, flatten } from 'lodash';

export const combineStatuses = (...statuses: string[]): string => {
  const unique = uniq(statuses);
  return unique.length == 1 ? unique[0] : 'flapping';
};

export class TLEvent implements CoalescedTimelineEvent {
  start: number;
  end: number;
  status: string;
  location: string;
  interval: number;

  constructor(location: string, interval: number, status: string, start: number, end: number) {
    this.location = location;
    this.status = status;
    this.start = start;
    this.end = end;
    this.interval = interval;
  }

  get locations() {
    return [this.location];
  }
}


export class TLMultiEvent implements CoalescedTimelineEvent {
  start: number;
  end: number;
  status: string;
  locations: string[];
  interval: number;

  constructor(locations: string[], interval: number, status: string, start: number, end: number) {
    this.locations = uniq(locations);
    this.locations.sort();
    this.status = status;
    this.start = start;
    this.end = end;
    this.interval = interval;
  }

  static combine(...input: CoalescedTimelineEvent[]): TLMultiEvent {
    return new TLMultiEvent(
      flatten(input.map(e => e.locations)),
      input[0].interval,
      combineStatuses(...input.map(e => e.status)),
      Math.min(...input.map( e => e.start)),
      Math.max(...input.map( e => e.end)),
    );
  }
}

export class Timeline {
  eventsByLocation: { [key: string]: TLEvent[] };
  computed: CoalescedTimelineEvent[];
  needComputeUpdate: boolean;
  // Number of intervals (in time) adjacent checks from different locations can be coalesced
  intervalSlop: number;

  // These numbers are used to find missing data at the beginning / end of the range
  start: number; // Earliest bound data pulled from
  end: number; // Latest bound data pulled from

  maxEnd: number;

  constructor(events: TLEvent[], start: number, end: number) {
    this.eventsByLocation = {};
    this.computed = [];
    this.needComputeUpdate = false;
    this.intervalSlop = 10;
    this.start = start;
    this.end = end;
    this.maxEnd = 0;
    events.forEach(event => this.add(event));
  }

  add(event: TLEvent) {
    this.needComputeUpdate = true;

    let group = this.eventsByLocation[event.location];
    if (!group) {
      group = [];
      this.eventsByLocation[event.location] = group;
    }

    this.maxEnd = Math.max(this.maxEnd, event.end);

    group.push(event);
  }

  compute(): CoalescedTimelineEvent[] {
    // These calculations happen on the individual location data
    this.coalesceIdenticalStart();
    this.coalesceCloseTogether();
    this.calculateNoData();
    // This calculation merges the individual location data into one sequence
    // It also combines similar events on the timeline
    this.mergeLocationsIntoComputed();
    this.sortComputed();


    return this.computed;
  }

  get events(): CoalescedTimelineEvent[] {
    if (this.needComputeUpdate) {
      this.compute();
      this.needComputeUpdate = false;
    }
    return this.computed;
  }

  coalesceIdenticalStart() {
    for (let location in this.eventsByLocation) {
      const locEvents = this.eventsByLocation[location];
      const byStart = groupBy(locEvents, 'start');

      const coalesced: TLEvent[] = []
      for (let startStr in byStart) {
        const eventGroup = byStart[startStr];
        let start = eventGroup[0].start;
        // Events with the same start time will always have the same interval
        const interval = eventGroup[0].interval;
        const end = Math.max(...eventGroup.map(e => e.end));
        const status = combineStatuses(...eventGroup.map(event => event.status));

        coalesced.push(new TLEvent(location, interval, status, start, end));
      }

      this.eventsByLocation[location] = coalesced;
    }
  }

  coalesceCloseTogether() {
    for (let location in this.eventsByLocation) {
      const events = sortBy(this.eventsByLocation[location], 'start');
      if (events.length < 2) continue;
      const results: TLEvent[] = [events.shift()!];
      let last = results[0];
      events.forEach( (candidateEvent, idx)  => {
        const withinSlop = (candidateEvent.start - last.end < this.intervalSlop*candidateEvent.interval);
        if (candidateEvent.status === last.status && withinSlop) {
          last.end = Math.max(last.end, candidateEvent.end);
          return;
        }
        results.push(candidateEvent);
        last = candidateEvent;
      });
      this.eventsByLocation[location] = results;
    }
  }

  calculateNoData() {
    // Start by assuming a single empty range spanning the entire timespan
    // we then arrive at the conclusion after iterating through all data

    for (let location in this.eventsByLocation) {
      const locEvents = sortBy(this.eventsByLocation[location], 'start');
      const locResults: TLEvent[] = [];

      // Handle a missing initial event
      const first = locEvents[0];
      const firstGapStart = this.start;
      const firstGapEnd = first.start-1;
      const firstGap = firstGapEnd - firstGapStart;
      if (firstGap > first.interval * this.intervalSlop) {
        locResults.push(
          new TLEvent(location, first.interval, 'missing', firstGapStart, firstGapEnd)
        );
      }

      // Find gaps in the middle
      locEvents.forEach((event, idx) => {
        locResults.push(event);

        const next = locEvents[idx+1];
        if (!next) return; // nothing to do on last element

        const gapStart = event.end + 1;
        const gapEnd = next.start -1;
        const gap = gapEnd - gapStart;
        if (gap > next.interval * this.intervalSlop) {
          locResults.push(
            new TLEvent(location, next.interval, 'missing', gapStart, gapEnd)
          );
        }
      });

      // Handle a missing final event
      const last = locEvents[locEvents.length - 1];
      const endGapStart = last.end+1;
      const endGapEnd = this.end;
      const endGap = endGapEnd - endGapStart;
      if (endGap > last.interval * this.intervalSlop) {
        locResults.push(new TLEvent(location, last.interval, 'missing', endGapStart, endGapEnd));
      }

      this.eventsByLocation[location] = locResults;
    }
  }

  mergeLocationsIntoComputed() {
    // This is a pretty naive/inefficient algorithm, we can probably improve it
    const results: CoalescedTimelineEvent[] = [];

    const combined: TLEvent[] = [];
    // Make one timeline of all events
    Object.values(this.eventsByLocation).forEach(events => events.forEach(e => combined.push(e)));

    while (combined.length > 0) {
      const event = combined.pop()!;

      const slopDistance = event.interval * this.intervalSlop;

      const closestEventsByLocation: {
        [key: string]: {
          event: TLEvent;
          distance: number;
        };
      } = {};

      combined.forEach(candidateEvent => {
        const startDistance = Math.abs(event.start - candidateEvent.start);
        const endDistance = Math.abs(event.end - candidateEvent.end);
        if (startDistance <= slopDistance && endDistance <= slopDistance) {
          const distance = startDistance + endDistance;
          const lastMatch = closestEventsByLocation[candidateEvent.location];
          if (!lastMatch || lastMatch.distance > distance) {
            closestEventsByLocation[candidateEvent.location] = {
              event: candidateEvent,
              distance: distance,
            };
          }
        }
      });

      const closestEvents = Object.values(closestEventsByLocation).map(ed => ed.event);
      if (closestEvents.length == 0) {
        results.push(event);
        continue;
      }

      results.push(TLMultiEvent.combine(event, ...closestEvents));

      closestEvents.forEach(e => combined.splice(combined.indexOf(e), 1));
    }

    this.computed = results;
  }

  sortComputed() {
    this.computed = sortBy(this.computed, 'end');
    this.computed.reverse(); // We want descending order
  }
}
