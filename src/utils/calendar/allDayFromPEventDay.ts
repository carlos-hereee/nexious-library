import type { CalendarTimedEvent, PEventDay } from "nxs-calendar";

// A "YYYY-MM-DD" wire date, the shape every month consumer already passes.
const ISO_DAY = /^(\d{4})-(\d{2})-(\d{2})$/;

/**
 * The LOCAL day a PEventDay names. "2026-09-11" through the Date constructor is midnight UTC,
 * which is the evening of the 10th for anyone west of Greenwich, so the three parts are read
 * out and rebuilt as a local date. Anything else (a full ISO instant, a toDateString value) is
 * handed to Date as-is, which is what the month grid already does with it.
 */
export const localDayFromWire = (value: string): Date => {
  const parts = ISO_DAY.exec(value);
  if (parts) return new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
  return new Date(value);
};

/**
 * Month-grid events rendered as all day chips, so a consumer that flips a month calendar to
 * week or day without supplying `timedEvents` never sees an empty grid. PEventDay.startTime is
 * typed number and holds "3:00 PM" strings in practice, so no time is read from it: a timed
 * block is what `timedEvents` is for.
 */
export const allDayFromPEventDay = (events: PEventDay[]): CalendarTimedEvent[] =>
  events
    .filter((event) => Boolean(event.date))
    .map((event, index) => {
      const date = event.date as string;
      const start = localDayFromWire(date);
      return {
        id: event.uid || event.eventId || `${date}-${index}`,
        title: event.details || event.value || event.data || date,
        start,
        allDay: true,
        isMuted: event.isOpen === false,
      };
    })
    .filter((event) => !Number.isNaN(event.start.getTime()));
