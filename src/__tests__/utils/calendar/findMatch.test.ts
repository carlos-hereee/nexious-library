import { isTileMatch, isTileMute, findMatch } from "@nxs-utils/calendar/findMatch";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";

const day = (y: number, m: number, d: number) => calendarValues(new Date(y, m, d));

describe("isTileMatch", () => {
  it("returns true when day, month and year all line up", () => {
    expect(isTileMatch({ day1: day(2024, 5, 15), day: 15, day2: day(2024, 5, 1) })).toBe(true);
  });

  it("returns false when the day differs", () => {
    expect(isTileMatch({ day1: day(2024, 5, 15), day: 14, day2: day(2024, 5, 1) })).toBe(false);
  });

  it("returns false when the month differs", () => {
    expect(isTileMatch({ day1: day(2024, 5, 15), day: 15, day2: day(2024, 6, 1) })).toBe(false);
  });

  it("returns false when the year differs", () => {
    expect(isTileMatch({ day1: day(2024, 5, 15), day: 15, day2: day(2025, 5, 1) })).toBe(false);
  });
});

describe("isTileMute", () => {
  it("returns false when no minDate is provided", () => {
    expect(isTileMute({ day: 5, data: day(2024, 5, 1) })).toBe(false);
  });

  it("mutes when minDate's year is greater than data's year", () => {
    expect(isTileMute({ day: 5, minDate: day(2025, 0, 1), data: day(2024, 5, 1) })).toBe(true);
  });

  it("mutes when same year but minDate's month is greater than data's", () => {
    expect(isTileMute({ day: 5, minDate: day(2024, 6, 1), data: day(2024, 5, 1) })).toBe(true);
  });

  it("mutes when same year+month but minDate's day is greater", () => {
    expect(isTileMute({ day: 5, minDate: day(2024, 5, 10), data: day(2024, 5, 1) })).toBe(true);
  });

  it("does not mute when day equals minDate's day (strict greater-than)", () => {
    expect(isTileMute({ day: 10, minDate: day(2024, 5, 10), data: day(2024, 5, 1) })).toBe(false);
  });
});

describe("findMatch", () => {
  it("returns null when events is undefined/null", () => {
    expect(findMatch({ events: undefined, calDay: day(2024, 5, 15) })).toBeNull();
  });

  it("returns the matching event for a calDay", () => {
    const events = [
      { date: new Date(2024, 5, 15).toString(), list: [{ id: "a" }] },
      { date: new Date(2024, 6, 1).toString(), list: [{ id: "b" }] },
    ];
    const result = findMatch({ events, calDay: day(2024, 5, 15) });
    expect(result).toBeDefined();
    expect(result?.list).toEqual([{ id: "a" }]);
  });

  it("returns undefined when no event matches the calDay", () => {
    const events = [{ date: new Date(2024, 5, 15).toString(), list: [] }];
    const result = findMatch({ events, calDay: day(2024, 5, 16) });
    expect(result).toBeUndefined();
  });
});
