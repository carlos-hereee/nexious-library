import "@testing-library/jest-dom";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import type { CalendarTimedEvent } from "nxs-calendar";
import CalendarTimeGrid from "@nxs-organism/calendar/CalendarTimeGrid";
import Calendar from "@nxs-template/Calendar";
import { weekDays } from "@nxs-utils/calendar/weekRange";

// Friday 2026-09-11 at 14:30 LOCAL, injected everywhere so "today" is the same day on every
// machine and in every zone. Every Date is built with the local constructor for the same reason.
const now = new Date(2026, 8, 11, 14, 30);
const locale = "en-US";
const week = weekDays(now);
const at = (day: number, hour: number, minute = 0) => new Date(2026, 8, day, hour, minute);
const timed = (id: string, start: Date, end?: Date, extra: Partial<CalendarTimedEvent> = {}): CalendarTimedEvent => ({
  id,
  title: id,
  start,
  end,
  ...extra,
});

// Intl in newer ICU builds separates "3:00" from "PM" with U+202F, which \s matches and a
// literal space does not.
const FRIDAY = "Friday, September 11, 2026";
const dayGroups = () =>
  screen.getAllByRole("group").filter((group) => !(group.getAttribute("aria-label") ?? "").startsWith("All day"));
const allDayGroups = () =>
  screen.getAllByRole("group").filter((group) => (group.getAttribute("aria-label") ?? "").startsWith("All day"));

describe("CalendarTimeGrid: structure", () => {
  it("renders seven labelled day groups for a week and one for a day", () => {
    const { unmount } = render(<CalendarTimeGrid days={week} now={now} locale={locale} />);
    expect(dayGroups()).toHaveLength(7);
    expect(allDayGroups()).toHaveLength(7);
    expect(screen.getByRole("group", { name: FRIDAY })).toBeInTheDocument();
    unmount();
    render(<CalendarTimeGrid days={[week[5]]} now={now} locale={locale} />);
    expect(dayGroups()).toHaveLength(1);
  });

  it("names the section with the formatted range when no heading id is given", () => {
    render(<CalendarTimeGrid days={week} now={now} locale={locale} />);
    expect(screen.getByRole("region", { name: "Sep 6 to 12, 2026" })).toBeInTheDocument();
  });

  it("marks today with aria-current and a visually hidden label, and draws the now line there", () => {
    const { container } = render(<CalendarTimeGrid days={week} now={now} locale={locale} />);
    const today = screen.getByRole("button", { name: FRIDAY });
    expect(today).toHaveAttribute("aria-current", "date");
    expect(within(today).getByText("Today")).toHaveClass("sr-only");
    expect(screen.getAllByRole("button", { name: /2026$/ }).filter((b) => b.hasAttribute("aria-current"))).toHaveLength(1);
    const nowLine = container.querySelector(".calendar-now-line");
    expect(nowLine).toHaveAttribute("aria-hidden", "true");
    expect(nowLine?.parentElement).toHaveClass("calendar-day-column--today");
    // 14:30 is 870 wall clock minutes; the stylesheet turns that into a top offset.
    expect((nowLine as HTMLElement).style.getPropertyValue("--now-minutes")).toBe("870");
  });

  it("suppresses every today signal with hideToday", () => {
    const { container } = render(<CalendarTimeGrid days={week} now={now} locale={locale} hideToday />);
    expect(screen.getByRole("button", { name: FRIDAY })).not.toHaveAttribute("aria-current");
    expect(container.querySelector(".calendar-now-line")).toBeNull();
  });

  it("says No events, visually hidden, in every empty day", () => {
    render(<CalendarTimeGrid days={week} now={now} locale={locale} />);
    const hidden = screen.getAllByText("No events");
    expect(hidden).toHaveLength(7);
    hidden.forEach((node) => expect(node).toHaveClass("sr-only"));
  });

  it("hides the gutter and gridlines from assistive tech", () => {
    const { container } = render(<CalendarTimeGrid days={week} now={now} locale={locale} />);
    expect(container.querySelector(".calendar-time-grid-gutter")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll(".calendar-time-grid-hour")).toHaveLength(24);
  });
});

describe("CalendarTimeGrid: events", () => {
  it("lands an event in the day group of its LOCAL start date with a spoken time range", () => {
    // 23:30 local on the 11th: a UTC keyed bucket would file this under the 12th west of UTC.
    render(<CalendarTimeGrid days={week} now={now} locale={locale} timedEvents={[timed("Dentist", at(11, 23, 30))]} />);
    const friday = screen.getByRole("group", { name: FRIDAY });
    expect(within(friday).getByRole("button", { name: /^Dentist, 11:30\sPM to 12:30\sAM$/ })).toBeInTheDocument();
    expect(within(screen.getByRole("group", { name: "Saturday, September 12, 2026" })).queryByRole("button")).toBeNull();
  });

  it("writes the four layout numbers as custom properties and nothing else inline", () => {
    render(
      <CalendarTimeGrid
        days={week}
        now={now}
        locale={locale}
        timedEvents={["a", "b", "c", "d"].map((id) => timed(id, at(9, 14), at(9, 15)))}
      />
    );
    const slots = Array.from(document.querySelectorAll<HTMLElement>(".calendar-event-slot"));
    expect(slots).toHaveLength(4);
    slots.forEach((slot) => {
      expect(slot.style.getPropertyValue("--block-columns")).toBe("4");
      expect(slot.style.getPropertyValue("--block-start")).toBe("840");
      expect(slot.style.getPropertyValue("--block-length")).toBe("60");
      expect(slot.style.length).toBe(4);
    });
    expect(slots.map((slot) => slot.style.getPropertyValue("--block-column")).sort()).toEqual(["0", "1", "2", "3"]);
  });

  it("marks a block clipped at midnight", () => {
    render(
      <CalendarTimeGrid days={week} now={now} locale={locale} timedEvents={[timed("Late", at(11, 23), at(12, 1))]} />
    );
    expect(document.querySelector(".calendar-event-slot")).toHaveClass("calendar-event-slot--continues");
  });

  it("hands onEventClick the original event object", () => {
    const event = timed("Standup", at(9, 9), at(9, 9, 30), { tone: "info", subtitle: "Team" });
    const onEventClick = jest.fn();
    render(<CalendarTimeGrid days={week} now={now} locale={locale} timedEvents={[event]} onEventClick={onEventClick} />);
    fireEvent.click(screen.getByRole("button", { name: /^Standup/ }));
    expect(onEventClick).toHaveBeenCalledTimes(1);
    expect(onEventClick.mock.calls[0][0]).toBe(event);
  });

  it("renders the tone and muted state as classes, never as inline color", () => {
    render(
      <CalendarTimeGrid
        days={week}
        now={now}
        locale={locale}
        timedEvents={[timed("Closed", at(9, 9), at(9, 10), { tone: "danger", isMuted: true })]}
      />
    );
    const block = screen.getByRole("button", { name: /^Closed/ });
    expect(block).toHaveClass("calendar-event-block--danger", "calendar-event-block--muted");
    expect(block.getAttribute("style")).toBeNull();
  });

  it("fires onDayClick from a day header with the calendarValues shape", () => {
    const onDayClick = jest.fn();
    render(<CalendarTimeGrid days={week} now={now} locale={locale} onDayClick={onDayClick} />);
    fireEvent.click(screen.getByRole("button", { name: FRIDAY }));
    expect(onDayClick).toHaveBeenCalledWith(
      expect.objectContaining({ day: 11, month: 8, year: 2026, dayIdx: 5, yyyymmdd: expect.any(String) })
    );
  });
});

describe("CalendarTimeGrid: all day row", () => {
  const allDay = (id: string) => timed(id, at(11, 0), undefined, { allDay: true });

  it("shows two chips and a +N control, and expands in place without dropping any", () => {
    render(<CalendarTimeGrid days={week} now={now} locale={locale} timedEvents={["One", "Two", "Three", "Four"].map(allDay)} />);
    const group = screen.getByRole("group", { name: `All day, ${FRIDAY}` });
    expect(within(group).getAllByRole("listitem")).toHaveLength(2);
    const more = within(group).getByRole("button", { name: "+2 more" });
    expect(more).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(more);
    expect(within(group).getAllByRole("listitem")).toHaveLength(4);
    expect(within(group).getByRole("button", { name: "Show fewer" })).toHaveAttribute("aria-expanded", "true");
    expect(within(group).getByRole("button", { name: "Four, All day" })).toBeInTheDocument();
  });

  it("shows no +N control when two or fewer items fit", () => {
    render(<CalendarTimeGrid days={week} now={now} locale={locale} timedEvents={["One", "Two"].map(allDay)} />);
    expect(screen.queryByRole("button", { name: /more$/ })).toBeNull();
  });

  it("uses consumer labels", () => {
    render(
      <CalendarTimeGrid
        days={week}
        now={now}
        locale={locale}
        timedEvents={["One", "Two", "Three"].map(allDay)}
        labels={{ allDay: "Todo el día", moreEvents: (count) => `${count} más`, today: "Hoy", noEvents: "Sin eventos" }}
      />
    );
    expect(screen.getByRole("group", { name: `Todo el día, ${FRIDAY}` })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1 más" })).toBeInTheDocument();
    expect(screen.getByText("Hoy")).toHaveClass("sr-only");
    expect(screen.getAllByText("Sin eventos")).toHaveLength(6);
  });
});

describe("Calendar template: month view untouched, week and day views added", () => {
  it("renders the month grid and no time grid when view is omitted", () => {
    const { container } = render(<Calendar value={now} />);
    expect(container.querySelector(".calendar-view-month")).toBeInTheDocument();
    expect(container.querySelector(".calendar-time-grid")).toBeNull();
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("renders the week grid under a range heading that names the section", () => {
    render(<Calendar value={now} view="week" now={now} locale={locale} />);
    const heading = screen.getByRole("heading", { level: 2, name: "Sep 6 to 12, 2026" });
    const region = screen.getByRole("region", { name: "Sep 6 to 12, 2026" });
    expect(region).toHaveAttribute("aria-labelledby", heading.id);
    expect(dayGroups()).toHaveLength(7);
  });

  it("renders one column and the full weekday date in day view", () => {
    render(<Calendar value={now} view="day" now={now} locale={locale} />);
    expect(screen.getByRole("heading", { level: 2, name: FRIDAY })).toBeInTheDocument();
    expect(dayGroups()).toHaveLength(1);
    expect(document.querySelector(".calendar-time-grid")).toHaveClass("calendar-time-grid--day");
  });

  it("starts the week on Monday with weekStartsOn 1", () => {
    render(<Calendar value={now} view="week" now={now} locale={locale} weekStartsOn={1} />);
    expect(dayGroups()[0]).toHaveAccessibleName("Monday, September 7, 2026");
    expect(screen.getByRole("heading", { level: 2, name: "Sep 7 to 13, 2026" })).toBeInTheDocument();
  });

  it("fires onDateChange by seven days on next and previous in week view, and by one in day view", () => {
    const onDateChange = jest.fn();
    const { unmount } = render(<Calendar value={now} view="week" now={now} locale={locale} onDateChange={onDateChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(onDateChange).toHaveBeenLastCalledWith(new Date(2026, 8, 18));
    expect(screen.getByRole("heading", { level: 2, name: "Sep 13 to 19, 2026" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous" }));
    expect(onDateChange).toHaveBeenLastCalledWith(new Date(2026, 8, 4));
    unmount();
    render(<Calendar value={now} view="day" now={now} locale={locale} onDateChange={onDateChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(onDateChange).toHaveBeenLastCalledWith(new Date(2026, 8, 12));
  });

  it("fires onDateChange from the month view's own navigation too", () => {
    const onDateChange = jest.fn();
    render(<Calendar value={now} onDateChange={onDateChange} />);
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    expect(onDateChange).toHaveBeenLastCalledWith(new Date(2026, 9, 1));
  });

  it("follows a controlled date and does not move itself when the parent ignores navigation", () => {
    const onDateChange = jest.fn();
    const { rerender } = render(
      <Calendar value={now} view="week" now={now} locale={locale} date={now} onDateChange={onDateChange} />
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(onDateChange).toHaveBeenCalledWith(new Date(2026, 8, 18));
    // Controlled: the parent did not update `date`, so the grid stays put.
    expect(screen.getByRole("heading", { level: 2, name: "Sep 6 to 12, 2026" })).toBeInTheDocument();
    rerender(<Calendar value={now} view="week" now={now} locale={locale} date={new Date(2026, 11, 30)} />);
    expect(screen.getByRole("heading", { level: 2, name: "Dec 27, 2026 to Jan 2, 2027" })).toBeInTheDocument();
    expect(dayGroups()[6]).toHaveAccessibleName("Saturday, January 2, 2027");
  });

  it("spans a month boundary in the heading", () => {
    render(<Calendar value={now} view="week" now={now} locale={locale} date={new Date(2026, 8, 29)} />);
    expect(screen.getByRole("heading", { level: 2, name: "Sep 27 to Oct 3, 2026" })).toBeInTheDocument();
  });

  it("hideNavigation removes the refresh button and the navigation row, and the grid names itself", () => {
    const { container } = render(<Calendar value={now} view="week" now={now} locale={locale} hideNavigation />);
    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
    expect(container.querySelector(".btn-icon")).toBeNull();
    expect(screen.getByRole("region", { name: "Sep 6 to 12, 2026" })).not.toHaveAttribute("aria-labelledby");
  });

  it("drills from a week header into onDayClick", () => {
    const onDayClick = jest.fn();
    render(<Calendar value={now} view="week" now={now} locale={locale} onDayClick={onDayClick} />);
    fireEvent.click(screen.getByRole("button", { name: FRIDAY }));
    expect(onDayClick).toHaveBeenCalledWith(expect.objectContaining({ day: 11, month: 8, year: 2026 }));
  });

  it("renders month events as all day chips on their LOCAL day when timedEvents is absent", () => {
    render(
      <Calendar value={now} view="week" now={now} locale={locale} events={[{ date: "2026-09-11", details: "Launch" }]} />
    );
    const group = screen.getByRole("group", { name: `All day, ${FRIDAY}` });
    expect(within(group).getByRole("button", { name: "Launch, All day" })).toBeInTheDocument();
  });

  it("formats day names in the requested locale", () => {
    render(<Calendar value={now} view="week" now={now} locale="es" />);
    expect(screen.getByRole("button", { name: /viernes, 11 de septiembre de 2026/ })).toBeInTheDocument();
  });

  it("re-reads the clock once a minute when no now is injected, and only in a time grid", () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 8, 11, 8, 0).getTime());
    const { container } = render(<Calendar value={now} view="day" locale={locale} />);
    const minutesAt = () => (container.querySelector(".calendar-now-line") as HTMLElement).style.getPropertyValue("--now-minutes");
    expect(minutesAt()).toBe("480");
    // Advancing the fake timers also advances the fake clock, so the minute tick fires at 8:05.
    jest.setSystemTime(new Date(2026, 8, 11, 8, 4).getTime());
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(minutesAt()).toBe("485");
    jest.useRealTimers();
  });
});
