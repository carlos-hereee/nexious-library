// Intl formatting for the week and day views. Every visible or spoken date string in those views
// comes from here so the header, the accessible names and the range heading cannot disagree.
//
// `locale` undefined is the runtime locale, which is what Intl does on its own. The only word the
// library supplies itself is the "to" between two ends of a range, and that arrives through
// CalendarLabels so a consumer can localize it; Intl's own formatRange was not used because it
// joins with a dash, which the platform's copy rules forbid.

const format = (locale: string | undefined, options: Intl.DateTimeFormatOptions, date: Date): string =>
  new Intl.DateTimeFormat(locale, options).format(date);

/** "Friday, September 11, 2026", the accessible name of a day. */
export const formatFullDate = (date: Date, locale?: string): string =>
  format(locale, { weekday: "long", month: "long", day: "numeric", year: "numeric" }, date);

/** "Fri", the visible day name in a week header. */
export const formatWeekdayShort = (date: Date, locale?: string): string => format(locale, { weekday: "short" }, date);

/** "11", the visible day number in a week header. */
export const formatDayNumber = (date: Date, locale?: string): string => format(locale, { day: "numeric" }, date);

/** "3:00 PM" (or "15:00" where the locale prefers it). */
export const formatTime = (date: Date, locale?: string): string =>
  format(locale, { hour: "numeric", minute: "2-digit" }, date);

/** "8 AM" for the hour gutter. Built from a fixed date so a DST gap cannot skip or repeat a row. */
export const formatHourLabel = (hour: number, locale?: string): string =>
  format(locale, { hour: "numeric" }, new Date(2000, 0, 1, hour));

/** "3:00 PM to 5:00 PM", with the joiner supplied by labels so it can be localized. */
export const formatTimeRange = (start: Date, end: Date, to: string, locale?: string): string =>
  `${formatTime(start, locale)} ${to} ${formatTime(end, locale)}`;

/**
 * The heading over a range of days.
 *
 * One day reads as its full date. Several days collapse whatever the two ends share: "Sep 6 to 12,
 * 2026" inside one month, "Sep 27 to Oct 3, 2026" across a month, and "Dec 27, 2026 to Jan 2, 2027"
 * across a year, so the year is never stated twice and never omitted when the ends differ.
 */
export const formatDayRange = (days: Date[], to: string, locale?: string): string => {
  if (days.length === 0) return "";
  const first = days[0];
  const last = days[days.length - 1];
  if (days.length === 1) return formatFullDate(first, locale);

  const monthDay = (date: Date) => format(locale, { month: "short", day: "numeric" }, date);
  const monthDayYear = (date: Date) => format(locale, { month: "short", day: "numeric", year: "numeric" }, date);
  const sameYear = first.getFullYear() === last.getFullYear();
  const sameMonth = sameYear && first.getMonth() === last.getMonth();

  if (sameMonth) return `${monthDay(first)} ${to} ${formatDayNumber(last, locale)}, ${first.getFullYear()}`;
  if (sameYear) return `${monthDay(first)} ${to} ${monthDay(last)}, ${first.getFullYear()}`;
  return `${monthDayYear(first)} ${to} ${monthDayYear(last)}`;
};
