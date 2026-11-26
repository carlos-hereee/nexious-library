import type { CalendarTimedEvent } from "nxs-calendar";
import { MIN_BLOCK_MINUTES, layoutDay, resolveEnd } from "@nxs-utils/calendar/layoutDay";

const day = new Date(2026, 8, 11);
const at = (hour: number, minute = 0) => new Date(2026, 8, 11, hour, minute);
const event = (id: string, start: Date, end?: Date, extra: Partial<CalendarTimedEvent> = {}): CalendarTimedEvent => ({
  id,
  title: id,
  start,
  end,
  ...extra,
});

const byId = (laidOut: ReturnType<typeof layoutDay>, id: string) => {
  const found = laidOut.find((item) => item.event.id === id);
  if (!found) throw new Error(`${id} was not laid out`);
  return found;
};

describe("layoutDay: extents", () => {
  it("positions a single event by minutes from local midnight", () => {
    const [only] = layoutDay(day, [event("a", at(9, 30), at(10, 15))]);
    expect(only).toMatchObject({ top: 570, height: 45, column: 0, columns: 1, continuesNextDay: false });
  });

  it("applies the default duration when the end is missing", () => {
    const [only] = layoutDay(day, [event("a", at(9))]);
    expect(only.height).toBe(60);
    const [custom] = layoutDay(day, [event("a", at(9))], 30);
    expect(custom.height).toBe(30);
  });

  it("treats an end before the start as the default duration, never a negative height", () => {
    const [only] = layoutDay(day, [event("a", at(9), at(8))]);
    expect(only.height).toBe(60);
    const [zero] = layoutDay(day, [event("a", at(9), at(9))]);
    expect(zero.height).toBe(60);
  });

  it("holds a five minute event at the fifteen minute floor", () => {
    const [only] = layoutDay(day, [event("a", at(9), at(9, 5))]);
    expect(only.height).toBe(MIN_BLOCK_MINUTES);
  });

  it("keeps a late block inside the day when the floor would push it past midnight", () => {
    const [only] = layoutDay(day, [event("a", at(23, 55), at(23, 58))]);
    expect(only.top + only.height).toBeLessThanOrEqual(1440);
  });

  it("clips an event crossing midnight at the day's end and flags it", () => {
    const [only] = layoutDay(day, [event("a", at(22), new Date(2026, 8, 12, 2))]);
    expect(only).toMatchObject({ top: 1320, height: 120, continuesNextDay: true });
  });

  it("ignores events that start on another day, including the one that ran in from yesterday", () => {
    const laidOut = layoutDay(day, [
      event("yesterday", new Date(2026, 8, 10, 22), new Date(2026, 8, 11, 2)),
      event("tomorrow", new Date(2026, 8, 12, 9)),
      event("today", at(9)),
    ]);
    expect(laidOut.map((item) => item.event.id)).toEqual(["today"]);
  });

  it("skips all day events, which the all day row renders", () => {
    expect(layoutDay(day, [event("a", at(9), undefined, { allDay: true })])).toEqual([]);
  });

  it("resolveEnd is the same end the block height was drawn from", () => {
    expect(resolveEnd(event("a", at(9), at(10))).getTime()).toBe(at(10).getTime());
    expect(resolveEnd(event("a", at(9)), 45).getTime()).toBe(at(9, 45).getTime());
    expect(resolveEnd(event("a", at(9), at(8)), 45).getTime()).toBe(at(9, 45).getTime());
  });
});

describe("layoutDay: overlap packing", () => {
  it("gives non overlapping events one full width column each", () => {
    const laidOut = layoutDay(day, [event("a", at(9), at(10)), event("b", at(10), at(11))]);
    expect(byId(laidOut, "a")).toMatchObject({ column: 0, columns: 1 });
    expect(byId(laidOut, "b")).toMatchObject({ column: 0, columns: 1 });
  });

  it("splits two overlapping events into two equal columns", () => {
    const laidOut = layoutDay(day, [event("a", at(9), at(10, 30)), event("b", at(10), at(11))]);
    expect(byId(laidOut, "a")).toMatchObject({ column: 0, columns: 2 });
    expect(byId(laidOut, "b")).toMatchObject({ column: 1, columns: 2 });
  });

  it("lets a third event fall back into column 0 when the first has ended", () => {
    // a 9 to 10, b 9:30 to 11, c 10 to 11. c starts as a ends, so it takes a's column rather
    // than opening a third, and the whole group is two columns wide.
    const laidOut = layoutDay(day, [event("a", at(9), at(10)), event("b", at(9, 30), at(11)), event("c", at(10), at(11))]);
    expect(byId(laidOut, "a")).toMatchObject({ column: 0, columns: 2 });
    expect(byId(laidOut, "b")).toMatchObject({ column: 1, columns: 2 });
    expect(byId(laidOut, "c")).toMatchObject({ column: 0, columns: 2 });
  });

  it("renders four simultaneous events as four equal columns", () => {
    const laidOut = layoutDay(day, ["a", "b", "c", "d"].map((id) => event(id, at(14), at(15))));
    expect(laidOut.map((item) => item.columns)).toEqual([4, 4, 4, 4]);
    expect(laidOut.map((item) => item.column).sort()).toEqual([0, 1, 2, 3]);
  });

  it("sorts by start, then the longer event first, and keeps chronological output order", () => {
    const laidOut = layoutDay(day, [event("short", at(9), at(9, 30)), event("long", at(9), at(11))]);
    expect(laidOut.map((item) => item.event.id)).toEqual(["long", "short"]);
    expect(byId(laidOut, "long")).toMatchObject({ column: 0, columns: 2 });
    expect(byId(laidOut, "short")).toMatchObject({ column: 1, columns: 2 });
  });

  it("closes a collision group so a later, separate event is full width again", () => {
    const laidOut = layoutDay(day, [event("a", at(9), at(10)), event("b", at(9), at(10)), event("c", at(13), at(14))]);
    expect(byId(laidOut, "c")).toMatchObject({ column: 0, columns: 1 });
  });

  it("treats blocks that overlap only through the minimum height as overlapping, so they never stack", () => {
    // Two five minute events at 9:00 and 9:05 both draw fifteen minutes tall, so drawn at full
    // width the second would sit on top of the first.
    const laidOut = layoutDay(day, [event("a", at(9), at(9, 5)), event("b", at(9, 5), at(9, 10))]);
    expect(byId(laidOut, "a").columns).toBe(2);
    expect(byId(laidOut, "b").columns).toBe(2);
  });
});
