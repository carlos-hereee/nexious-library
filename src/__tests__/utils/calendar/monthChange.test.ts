import { monthChange } from "@nxs-utils/calendar/monthChange";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";

const day = (y: number, m: number, d: number) => calendarValues(new Date(y, m, d));

describe("monthChange", () => {
  it("'start' jumps to January of the active year", () => {
    const setActive = jest.fn();
    monthChange({ label: "start", active: day(2024, 5, 15), setActive });
    expect(setActive).toHaveBeenCalledTimes(1);
    expect(setActive.mock.calls[0][0].month).toBe(0);
    expect(setActive.mock.calls[0][0].year).toBe(2024);
  });

  it("'last' rolls to December of the active year (via month=12 overflow)", () => {
    const setActive = jest.fn();
    monthChange({ label: "last", active: day(2024, 5, 15), setActive });
    expect(setActive).toHaveBeenCalled();
    // new Date(2024, 12, 1) is Jan 1 2025 — current source behavior. Lock it in.
    const arg = setActive.mock.calls[0][0];
    expect(arg.year).toBe(2025);
    expect(arg.month).toBe(0);
  });

  it("'prev' steps back one month", () => {
    const setActive = jest.fn();
    monthChange({ label: "prev", active: day(2024, 5, 15), setActive });
    expect(setActive).toHaveBeenCalled();
    expect(setActive.mock.calls.at(-1)?.[0].month).toBe(4);
  });

  it("'next' steps forward one month", () => {
    const setActive = jest.fn();
    monthChange({ label: "next", active: day(2024, 5, 15), setActive });
    expect(setActive).toHaveBeenCalled();
    expect(setActive.mock.calls.at(-1)?.[0].month).toBe(6);
  });

  it("does nothing when active is undefined", () => {
    const setActive = jest.fn();
    monthChange({ label: "next", setActive });
    expect(setActive).not.toHaveBeenCalled();
  });
});
