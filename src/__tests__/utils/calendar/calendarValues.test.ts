import {
  calendarValues,
  prevMonth,
  nextMonth,
  formatCalDayToDate,
} from "@nxs-utils/calendar/calendarValues";
import type { CalendarDayProp } from "nxs-calendar";

// Construct dates with the local-time constructor to match how calendarValues
// pulls year/month/day with the local getters.
const localDate = (y: number, m: number, d: number) => new Date(y, m, d);

describe("calendarValues", () => {
  it("extracts year, month, day, maxDays, and start-of-month weekday", () => {
    // Jan 15 2024 — January has 31 days; Jan 1 2024 is a Monday (weekday index 1)
    const v = calendarValues(localDate(2024, 0, 15));
    expect(v.year).toBe(2024);
    expect(v.month).toBe(0);
    expect(v.day).toBe(15);
    expect(v.maxDays).toBe(31);
    expect(v.start).toBe(1);
    // (31 + 1) / 7 → ceil = 5
    expect(v.weeks).toBe(5);
  });

  it("handles February in a leap year (29 days)", () => {
    expect(calendarValues(localDate(2024, 1, 1)).maxDays).toBe(29);
  });

  it("handles February in a non-leap year (28 days)", () => {
    expect(calendarValues(localDate(2023, 1, 1)).maxDays).toBe(28);
  });

  it("formats yyyymmdd as a 10-character ISO date prefix", () => {
    const v = calendarValues(new Date(Date.UTC(2024, 0, 15)));
    expect(v.yyyymmdd).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(v.yyyymmdd.length).toBe(10);
  });
});

describe("formatCalDayToDate", () => {
  it("formats month/day/year using zero-indexed month as written", () => {
    const day: CalendarDayProp = {
      dayIdx: 0,
      month: 0,
      year: 2024,
      day: 15,
      maxDays: 31,
      weeks: 5,
      start: 1,
      date: "Mon Jan 15 2024",
      yyyymmdd: "2024-01-15",
    };
    expect(formatCalDayToDate(day)).toBe("0/15/2024");
  });
});

describe("prevMonth", () => {
  it("invokes the callback with the previous month's calendar value", () => {
    const start = calendarValues(localDate(2024, 5, 10)); // June
    const cb = jest.fn();
    prevMonth(start, cb);
    expect(cb).toHaveBeenCalled();
    const arg = cb.mock.calls[cb.mock.calls.length - 1][0];
    expect(arg.month).toBe(4); // May
    expect(arg.year).toBe(2024);
  });
});

describe("nextMonth", () => {
  it("invokes the callback with the following month's calendar value", () => {
    const start = calendarValues(localDate(2024, 5, 10)); // June
    const cb = jest.fn();
    nextMonth(start, cb);
    expect(cb).toHaveBeenCalled();
    const arg = cb.mock.calls[cb.mock.calls.length - 1][0];
    expect(arg.month).toBe(6); // July
    expect(arg.year).toBe(2024);
  });

  it("rolls into the following year when called from December", () => {
    const start = calendarValues(localDate(2024, 11, 10)); // December
    const cb = jest.fn();
    nextMonth(start, cb);
    expect(cb).toHaveBeenCalled();
    // Source uses `new Date(year + 1, 1, 0)` which lands on the last day of
    // January of the next year. Lock current behavior so future fixes are
    // visible regressions.
    const arg = cb.mock.calls[cb.mock.calls.length - 1][0];
    expect(arg.year).toBe(2025);
    // month should be January (0) since `new Date(2025, 1, 0)` is Jan 31 2025
    expect(arg.month).toBe(0);
  });
});
