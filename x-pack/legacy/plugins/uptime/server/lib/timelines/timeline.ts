import { CoalescedTimelineEvent } from '../../../common/graphql/types';
import { sortBy, groupBy, max, min, uniq, flatten, map } from 'lodash';

export const combineStatuses = (...statuses: string[]): string => {
    const unique = uniq(statuses);
    return unique.length == 1 ? unique[0] : 'flapping';
}

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
        min<number>(map(input, 'start')),
        max<number>(map(input, 'end'))
    );
  }
}

export class Timeline {
  eventsByLocation: { [key: string]: TLEvent[] };
  computed: CoalescedTimelineEvent[];
  needComputeUpdate: boolean;
  // Number of intervals (in time) adjacent checks from different locations can be coalesced
  intervalSlop: number;

  constructor(events: TLEvent[]) {
    this.eventsByLocation = {};
    this.computed = [];
    this.needComputeUpdate = false;
    this.intervalSlop = 5;
    events.forEach(event => this.add(event));
  }

  add(event: TLEvent) {
    this.needComputeUpdate = true;

    let group = this.eventsByLocation[event.location];
    if (!group) {
      group = [];
      this.eventsByLocation[event.location] = group;
    }

    group.push(event);
  }

  compute(): CoalescedTimelineEvent[] {
    this.coalesceIdenticalStart();
    this.coalesceSimilarComputedEvents();
    //this.mergeLocationsIntoComputed();
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

      const coalesced: TLEvent[] = [];
      for (let startStr in byStart) {
        const eventGroup = byStart[startStr];
        let start = eventGroup[0].start;
        // Events with the same start time will always have the same interval
        const interval = eventGroup[0].interval;
        const end = max(eventGroup, 'end').end;
        const status = combineStatuses(...eventGroup.map(event => event.status));

        coalesced.push(new TLEvent(location, interval, status, start, end));
      }

      this.eventsByLocation[location] = coalesced;
    }
  }

  mergeLocationsIntoComputed() {
    this.computed = [];

    for (let location in this.eventsByLocation) {
      const locEvents = this.eventsByLocation[location];
      locEvents.forEach(e => this.computed.push(e));
    }
  }

  coalesceSimilarComputedEvents() {
    // This is a pretty naive/inefficient algorithm, we can probably improve it
    const results: CoalescedTimelineEvent[] = [];

    const combined: TLEvent[] = [];
    // Make one timeline of all events
    Object.values(this.eventsByLocation).forEach( events => events.forEach(e => combined.push(e)));

    while(combined.length > 0) {
      const event = combined.pop()!;

      const slopDistance = event.interval * this.intervalSlop;

      const closestEventsByLocation: {
        [key: string]: { 
          event: TLEvent
          distance: number
        };
      } = {};

      combined.forEach( candidateEvent => {
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
      };

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