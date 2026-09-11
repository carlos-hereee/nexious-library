import {
  addDays,
  isSameLocalDay,
  localDayKey,
  minutesSinceMidnight,
  startOfLocalDay,
  startOfWeek,
  weekDays,
} from "@nxs-utils/calendar/weekRange";

// Every date here is built with the LOCAL constructor and read back with local getters, which is
// the contract the week view relies on. None of these assertions depend on the machine's zone.

describe("weekRange: local day helpers", () => {
  it("localDayKey reads the local date, never the UTC one", () => {
    // 23:30 local on the 11th. toISOString() names the 12th for any viewer west of UTC, which is
    // exactly the trap calendarValues().yyyymmdd carries and this key exists to avoid.
    expect(localDayKey(new Date(2026, 8, 11, 23, 30))).toBe("2026-09-11");
    expect(localDayKey(new Date(2026, 0, 5))).toBe("2026-01-05");
  });

  it("startOfLocalDay drops the time and keeps the day", () => {
    const midnight = startOfLocalDay(new Date(2026, 8, 11, 14, 30, 15));
    expect([midnight.getFullYear(), midnight.getMonth(), midnight.getDate()]).toEqual([2026, 8, 11]);
    expect([midnight.getHours(), midnight.getMinutes(), midnight.getSeconds()]).toEqual([0, 0, 0]);
  });

  it("isSameLocalDay compares calendar days, not instants", () => {
    expect(isSameLocalDay(new Date(2026, 8, 11, 0, 1), new Date(2026, 8, 11, 23, 59))).toBe(true);
    expect(isSameLocalDay(new Date(2026, 8, 11, 23, 59), new Date(2026, 8, 12, 0, 0))).toBe(false);
  });

  it("minutesSinceMidnight is wall clock minutes", () => {
    expect(minutesSinceMidnight(new Date(2026, 8, 11, 14, 30))).toBe(870);
    expect(minutesSinceMidnight(new Date(2026, 8, 11, 0, 0))).toBe(0);
  });
});

describe("weekRange: stepping days", () => {
  it("addDays keeps the wall clock time", () => {
    const stepped = addDays(new Date(2026, 8, 11, 9, 15), 3);
    expect(localDayKey(stepped)).toBe("2026-09-14");
    expect([stepped.getHours(), stepped.getMinutes()]).toEqual([9, 15]);
  });

  it("addDays crosses a month and a year boundary", () => {
    expect(localDayKey(addDays(new Date(2026, 11, 30), 3))).toBe("2027-01-02");
    expect(localDayKey(addDays(new Date(2027, 0, 2), -3))).toBe("2026-12-30");
  });

  it("the week of 2026-11-01 (US daylight saving change) is seven DISTINCT local days at midnight", () => {
    // A 24 hour millisecond step would land on 23:00 of the same day or 01:00 of the next one
    // in a zone that changes clocks that morning; the constructor step does not.
    const days = weekDays(new Date(2026, 10, 1, 12));
    expect(days.map(localDayKey)).toEqual([
      "2026-11-01",
      "2026-11-02",
      "2026-11-03",
      "2026-11-04",
      "2026-11-05",
      "2026-11-06",
      "2026-11-07",
    ]);
    days.forEach((day) => expect(day.getHours()).toBe(0));
  });
});

describe("weekRange: weeks", () => {
  it("startOfWeek finds the Sunday by default", () => {
    // Friday 2026-09-11 sits in the week of Sunday the 6th.
    expect(localDayKey(startOfWeek(new Date(2026, 8, 11, 17)))).toBe("2026-09-06");
    // A Sunday is its own week start.
    expect(localDayKey(startOfWeek(new Date(2026, 8, 6)))).toBe("2026-09-06");
  });

  it("startOfWeek finds the Monday when weekStartsOn is 1", () => {
    expect(localDayKey(startOfWeek(new Date(2026, 8, 11), 1))).toBe("2026-09-07");
    // A Sunday belongs to the week that STARTED the previous Monday.
    expect(localDayKey(startOfWeek(new Date(2026, 8, 13), 1))).toBe("2026-09-07");
  });

  it("weekDays returns seven local midnights in order", () => {
    const days = weekDays(new Date(2026, 8, 11));
    expect(days).toHaveLength(7);
    expect(localDayKey(days[0])).toBe("2026-09-06");
    expect(localDayKey(days[6])).toBe("2026-09-12");
    expect(days.map((day) => day.getDay())).toEqual([0, 1, 2, 3, 4, 5, 6]);
  });

  it("weekDays spans a year rollover", () => {
    const days = weekDays(new Date(2026, 11, 30));
    expect(localDayKey(days[0])).toBe("2026-12-27");
    expect(localDayKey(days[6])).toBe("2027-01-02");
  });
});
