import { CalendarDayProps, CalendarEventProp } from "@nxs-utils/helpers/types";

export const calendarValues = (e: Date): CalendarDayProps => {
  // get max days for current.month
  const maxDays = new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate();
  const startIdx = new Date(e.getFullYear(), e.getMonth(), 1).getDay();
  const maxWeeks = Math.ceil((maxDays + startIdx) / 7);
  return {
    dayIdx: e.getDay(),
    month: e.getMonth(),
    year: e.getFullYear(),
    day: e.getDate(),
    maxDays: maxDays,
    weeks: maxWeeks,
    start: startIdx,
    date: e.toDateString(),
    yyyyddmm: e.toISOString().substring(0, 10),
  };
};

export const prevMonth = (c: CalendarDayProps, cb: (a: any) => void) => {
  if (c.month === 0) {
    cb(calendarValues(new Date(c.year - 1, 12, 1)));
  }
  if (c.month <= 12) {
    cb(calendarValues(new Date(c.year, c.month - 1, 1)));
  }
};
export const nextMonth = (c: CalendarDayProps, cb: (a: any) => void) => {
  if (c.month === 11) {
    cb(calendarValues(new Date(c.year + 1, 1, 0)));
  }
  if (c.month < 11) {
    cb(calendarValues(new Date(c.year, c.month + 1, 1)));
  }
};
export const findMonthEvents = (array: CalendarEventProp[], item: CalendarDayProps) => {
  return array.filter(({ date }) => {
    const c = new Date(date);
    return c.getMonth() === item?.month && c.getFullYear() === item?.year;
  });
};
