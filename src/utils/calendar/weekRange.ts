// Local-day arithmetic for the week and day views.
//
// Two traps shape every function here, and both have shipped as bugs in this directory:
//
//   1. calendarValues().yyyymmdd is toISOString().substring(0, 10), the UTC date. For any viewer
//      west of Greenwich in the evening it names TOMORROW, so it must never bucket, key or compare
//      a week view day. Keys here come from the LOCAL getters.
//   2. A day is never stepped by adding 86 400 000 ms. The week of 2026-11-01 holds the US daylight
//      saving change, so a 24 hour step lands at 23:00 or 01:00 on the wrong day. The Date
//      constructor normalizes an out-of-range day-of-month itself and stays on wall clock midnight.

export const MINUTES_PER_DAY = 1440;

const pad = (n: number) => `${n}`.padStart(2, "0");

/** Local midnight of the given date. */
export const startOfLocalDay = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

/**
 * The date shifted by whole calendar days, keeping its wall clock time. Built through the
 * constructor so a DST day is one day long in the calendar sense rather than 23 or 25 hours.
 */
export const addDays = (date: Date, days: number): Date =>
  new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + days,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );

export const isSameLocalDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** "YYYY-MM-DD" from the LOCAL getters, the only safe key for a day the viewer is looking at. */
export const localDayKey = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

/** Wall clock minutes since local midnight (14:30 is 870), which is what a time grid positions by. */
export const minutesSinceMidnight = (date: Date): number => date.getHours() * 60 + date.getMinutes();

/** Local midnight of the first day of the week holding `date`. 0 is Sunday first, 1 is Monday first. */
export const startOfWeek = (date: Date, weekStartsOn: 0 | 1 = 0): Date => {
  const offset = (date.getDay() - weekStartsOn + 7) % 7;
  return addDays(startOfLocalDay(date), -offset);
};

/** The seven local midnights of the week holding `date`, in display order. */
export const weekDays = (date: Date, weekStartsOn: 0 | 1 = 0): Date[] => {
  const first = startOfWeek(date, weekStartsOn);
  return Array.from({ length: 7 }, (_, index) => addDays(first, index));
};
