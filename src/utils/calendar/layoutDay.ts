import type { CalendarTimedEvent } from "nxs-calendar";
import { MINUTES_PER_DAY, isSameLocalDay, minutesSinceMidnight } from "./weekRange";

// Overlap packing for ONE day's timed events. Pure: no React, no DOM, only numbers the
// stylesheet turns into geometry (top and height in minutes, column and columns as a fraction),
// so a consumer that changes --calendar-hour-height rescales everything without any JS math.

export const DEFAULT_DURATION_MINUTES = 60;
// A 5 minute event at 48px per hour would be 4px tall. Fifteen minutes keeps it a real target
// without lying about the schedule by more than a quarter hour.
export const MIN_BLOCK_MINUTES = 15;

export interface LaidOutEvent {
  event: CalendarTimedEvent;
  // Minutes from local midnight.
  top: number;
  // Minutes, never below MIN_BLOCK_MINUTES.
  height: number;
  column: number;
  columns: number;
  // The event ends on a later day and was clipped at midnight.
  continuesNextDay: boolean;
}

type Extent = { event: CalendarTimedEvent; top: number; height: number; continuesNextDay: boolean };

/**
 * The end the grid draws and speaks for an event: its own `end` when that is after `start`,
 * otherwise start plus the default duration. Exported so the block's accessible name says the
 * same end the block's height shows.
 */
export const resolveEnd = (event: CalendarTimedEvent, defaultDurationMinutes: number = DEFAULT_DURATION_MINUTES): Date =>
  event.end !== undefined && event.end.getTime() > event.start.getTime()
    ? event.end
    : new Date(event.start.getTime() + defaultDurationMinutes * 60000);

/**
 * The block's vertical extent for an event that starts on `day`, or null when it does not.
 *
 * An event that started the PREVIOUS day and runs into this one is deliberately not drawn here in
 * v1: it belongs to its start day and is clipped there. Duplicating it would need a "continued"
 * marker on both halves and an accessible name that says so, which is a follow up, not a default.
 */
const extentOn = (day: Date, event: CalendarTimedEvent, defaultDurationMinutes: number): Extent | null => {
  if (!isSameLocalDay(event.start, day)) return null;
  const top = minutesSinceMidnight(event.start);
  const end = resolveEnd(event, defaultDurationMinutes);
  const continuesNextDay = !isSameLocalDay(end, day);
  const endMinutes = continuesNextDay ? MINUTES_PER_DAY : minutesSinceMidnight(end);
  const height = Math.max(MIN_BLOCK_MINUTES, endMinutes - top);
  // The minimum height can push a block past midnight (an event at 23:55). Pull it up rather
  // than letting it hang below the last hour row.
  return { event, top: Math.min(top, MINUTES_PER_DAY - height), height, continuesNextDay };
};

/**
 * Lay out the timed (non all day) events that start on `day`.
 *
 * ① Sort by start, then by longer duration first, so the widest span claims column 0 and shorter
 *    events tuck in beside it rather than under it.
 * ② Sweep into collision groups: an event joins the open group when it starts before the group's
 *    latest end, otherwise it opens a new group.
 * ③ Inside a group each event takes the first column whose last event ends at or before its start,
 *    and every event in the group is then given the group's column count, so all its blocks share
 *    one equal width and the day reads as a set of side by side lanes.
 */
export const layoutDay = (
  day: Date,
  events: CalendarTimedEvent[],
  defaultDurationMinutes: number = DEFAULT_DURATION_MINUTES
): LaidOutEvent[] => {
  const extents = events
    .filter((event) => !event.allDay)
    .map((event) => extentOn(day, event, defaultDurationMinutes))
    .filter((extent): extent is Extent => extent !== null)
    .sort((a, b) => a.top - b.top || b.height - a.height);

  const laidOut: LaidOutEvent[] = [];
  let group: LaidOutEvent[] = [];
  let columnEnds: number[] = [];
  let groupEnd = -1;

  const closeGroup = () => {
    const columns = Math.max(1, columnEnds.length);
    group.forEach((item) => {
      item.columns = columns;
      laidOut.push(item);
    });
    group = [];
    columnEnds = [];
  };

  extents.forEach((extent) => {
    if (extent.top >= groupEnd) closeGroup();
    const end = extent.top + extent.height;
    let column = columnEnds.findIndex((columnEnd) => columnEnd <= extent.top);
    if (column === -1) {
      column = columnEnds.length;
      columnEnds.push(end);
    } else {
      columnEnds[column] = end;
    }
    group.push({ ...extent, column, columns: 1 });
    groupEnd = Math.max(groupEnd, end);
  });
  closeGroup();

  return laidOut;
};
