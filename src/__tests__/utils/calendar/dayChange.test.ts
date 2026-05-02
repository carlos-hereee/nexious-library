import { dayChange } from "@nxs-utils/calendar/dayChange";
import { calendarValues } from "@nxs-utils/calendar/calendarValues";

const day = (y: number, m: number, d: number) => calendarValues(new Date(y, m, d));

describe("dayChange", () => {
  it("calls onDayClick with the matched event when active day is in range", () => {
    const today = day(2024, 5, 1);
    const active = { ...day(2024, 5, 15), day: 15 };
    const events = [{ date: new Date(2024, 5, 15).toString(), list: [{ id: "a" }] }];
    const setActive = jest.fn();
    const onDayClick = jest.fn();

    dayChange({ today, active, setActive, events, onDayClick });

    expect(setActive).toHaveBeenCalledWith(active);
    expect(onDayClick).toHaveBeenCalledTimes(1);
    expect(onDayClick.mock.calls[0][0].list).toEqual([{ id: "a" }]);
  });

  it("calls onDayClick with an empty event when no event matches", () => {
    const today = day(2024, 5, 1);
    const active = { ...day(2024, 5, 20), day: 20 };
    const setActive = jest.fn();
    const onDayClick = jest.fn();

    dayChange({ today, active, setActive, events: [], onDayClick });

    expect(onDayClick).toHaveBeenCalledWith({ date: active.date, list: [] });
  });

  it("does not require onDayClick to be provided", () => {
    const today = day(2024, 5, 1);
    const active = { ...day(2024, 5, 15), day: 15 };
    const setActive = jest.fn();

    expect(() => dayChange({ today, active, setActive, events: [] })).not.toThrow();
    expect(setActive).toHaveBeenCalled();
  });

  it("delegates to prevMonth (via setActive callback) when active.day <= 0", () => {
    const today = day(2024, 5, 1);
    const active = { ...day(2024, 5, 1), day: 0 };
    const setActive = jest.fn();

    dayChange({ today, active, setActive, events: [] });
    // prevMonth invokes setActive at least once
    expect(setActive).toHaveBeenCalled();
  });

  it("delegates to nextMonth when active.day exceeds today's maxDays", () => {
    const today = day(2024, 5, 1); // June, 30 days
    const active = { ...day(2024, 5, 1), day: 35 };
    const setActive = jest.fn();

    dayChange({ today, active, setActive, events: [] });
    expect(setActive).toHaveBeenCalled();
  });
});
