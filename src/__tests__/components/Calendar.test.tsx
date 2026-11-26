import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Calendar from "@nxs-template/Calendar";

describe("Calendar event grouping", () => {
  // Noon-local seed so the active month is unambiguously June 2026 in any timezone.
  const seed = new Date("2026-06-15T12:00:00");

  it("merges two events on the same (first) grouped date into a single ping of 2", () => {
    render(<Calendar value={seed} events={[{ date: "2026-06-18" }, { date: "2026-06-18" }, { date: "2026-06-22" }]} />);

    // The first grouped date is the regression surface: for the second matching
    // event findIndex returns 0, and the old `idx <= 0` guard forked a duplicate
    // group, leaving that day rendering a ping of 1 instead of 2. CalendarTile
    // exposes the count in its title ("<date> has <ping> events").
    expect(screen.getByTitle(/has 2 events/)).toBeInTheDocument();
    expect(screen.getAllByTitle(/has 2 events/)).toHaveLength(1);

    // The unrelated single-event day must still read as exactly one.
    expect(screen.getByTitle(/has 1 events/)).toBeInTheDocument();
  });
});

describe("Calendar month grid cells", () => {
  // June 2026 starts on a Monday and ends on a Tuesday, so its grid holds padding cells on both
  // sides of the month.
  const seed = new Date("2026-06-15T12:00:00");

  it("renders padding cells as inert, hidden spans rather than unnamed buttons", () => {
    const { container } = render(<Calendar value={seed} />);
    const padding = container.querySelectorAll(".btn-calendar-tile--padding");
    expect(padding.length).toBeGreaterThan(0);
    padding.forEach((cell) => {
      expect(cell.tagName).toBe("SPAN");
      expect(cell).toHaveAttribute("aria-hidden", "true");
    });
    // Every tile a reader can reach is a named day: 30 June days, and no button without text.
    const dayButtons = container.querySelectorAll(".calendar-view-month button");
    expect(dayButtons).toHaveLength(30);
    dayButtons.forEach((button) => expect(button.textContent).not.toBe(""));
  });

  it("titles each tile through the labels prop", () => {
    render(
      <Calendar
        value={seed}
        events={[{ date: "2026-06-18" }]}
        labels={{ tileEvents: (date, count) => `${date} tiene ${count} eventos`, tileNoEvents: "sin eventos" }}
      />
    );
    expect(screen.getByTitle(/tiene 1 eventos/)).toBeInTheDocument();
    expect(screen.getAllByTitle("sin eventos")).toHaveLength(29);
    expect(screen.queryByTitle(/has \d+ events|no events today/)).toBeNull();
  });
});

describe("Calendar month heading level", () => {
  const seed = new Date("2026-06-15T12:00:00");

  it("keeps the month heading an h1 when no level is given, so every existing caller is unchanged", () => {
    render(<Calendar value={seed} />);
    expect(screen.getByRole("heading", { level: 1, name: "June 2026" })).toBeInTheDocument();
  });

  it("renders the month heading at the level a page asks for, leaving the page its one h1", () => {
    render(
      <>
        <h1>Book a call</h1>
        <Calendar value={seed} headingLevel={2} />
      </>
    );
    expect(screen.getByRole("heading", { level: 2, name: "June 2026" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});

describe("Calendar month touch up (2026-11-11)", () => {
  const seed = new Date("2026-06-15T12:00:00");

  it("names the icon only month buttons, and lets a consumer localize the names", () => {
    const { rerender } = render(<Calendar value={seed} />);
    ["Today", "First month of the year", "Previous month", "Next month", "Last month of the year"].forEach((name) =>
      expect(screen.getByRole("button", { name })).toBeInTheDocument()
    );
    rerender(<Calendar value={seed} labels={{ today: "Hoy", previousMonth: "Mes anterior" }} />);
    expect(screen.getByRole("button", { name: "Hoy" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mes anterior" })).toBeInTheDocument();
  });

  it("jumps Last month of the year to December of the same year", () => {
    const onDateChange = jest.fn();
    render(<Calendar value={seed} onDateChange={onDateChange} />);
    screen.getByRole("button", { name: "Last month of the year" }).click();
    const landed: Date = onDateChange.mock.calls[onDateChange.mock.calls.length - 1][0];
    expect(landed.getFullYear()).toBe(2026);
    expect(landed.getMonth()).toBe(11);
  });

  it("shows a two digit event count as one badge, hidden from assistive tech", () => {
    const events = Array.from({ length: 12 }, () => ({ date: "2026-06-18" }));
    const { container } = render(<Calendar value={seed} events={events} />);
    const badges = container.querySelectorAll(".calendar-tile-count");
    expect(badges).toHaveLength(1);
    expect(badges[0]).toHaveTextContent("12");
    expect(badges[0]).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByTitle(/has 12 events/)).toBeInTheDocument();
  });

  it("prints three letter weekdays and keeps the full name for screen readers", () => {
    const { container } = render(<Calendar value={seed} />);
    const first = container.querySelector(".calendar-week .day") as HTMLElement;
    expect(first.querySelector('[aria-hidden="true"]')).toHaveTextContent("Sun");
    expect(first.querySelector(".sr-only")).toHaveTextContent("Sunday");
  });
});

describe("Calendar built in view switch and year view", () => {
  const now = new Date("2026-09-11T14:30:00");
  const timedEvents = [
    { id: "a", title: "Sep one", start: new Date("2026-09-08T09:00:00") },
    { id: "b", title: "Sep two", start: new Date("2026-09-10T10:00:00") },
    { id: "c", title: "Mar one", start: new Date("2026-03-02T10:00:00") },
  ];

  it("renders no switch without views, so existing callers are unchanged", () => {
    render(<Calendar value={now} now={now} />);
    expect(screen.queryByRole("group", { name: "Calendar view" })).toBeNull();
  });

  it("lists the views in day, week, month, year order and marks the current one", () => {
    render(<Calendar value={now} now={now} view="month" views={["year", "month", "week"]} />);
    const group = screen.getByRole("group", { name: "Calendar view" });
    const options = Array.from(group.querySelectorAll("button")).map((button) => button.textContent);
    expect(options).toEqual(["Week", "Month", "Year"]);
    expect(screen.getByRole("button", { name: "Month" })).toHaveAttribute("aria-pressed", "true");
  });

  it("moves between views on its own and reports each change", () => {
    const onViewChange = jest.fn();
    const { container } = render(
      <Calendar value={now} now={now} locale="en-US" views={["week", "month", "year"]} onViewChange={onViewChange} timedEvents={timedEvents} />
    );
    fireEvent.click(screen.getByRole("button", { name: "Week" }));
    expect(onViewChange).toHaveBeenLastCalledWith("week");
    expect(container.querySelector(".calendar-time-grid")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Year" }));
    expect(onViewChange).toHaveBeenLastCalledWith("year");
    expect(container.querySelectorAll(".calendar-year-month")).toHaveLength(12);
  });

  it("names each month with its year and event count, and opens it in the month view", () => {
    const onViewChange = jest.fn();
    const { container } = render(
      <Calendar value={now} now={now} locale="en-US" view="year" views={["month", "year"]} onViewChange={onViewChange} timedEvents={timedEvents} />
    );
    expect(screen.getByRole("heading", { level: 2, name: "2026" })).toBeInTheDocument();
    const september = screen.getByRole("button", { name: "September 2026, 2 events" });
    expect(september).toHaveAttribute("aria-current", "date");
    expect(screen.getByRole("button", { name: "March 2026, 1 event" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "January 2026, No events" })).toBeInTheDocument();
    fireEvent.click(september);
    expect(onViewChange).toHaveBeenLastCalledWith("month");
    expect(container.querySelector(".calendar-view-month")).toBeInTheDocument();
  });

  it("steps the year view by a whole year", () => {
    const onDateChange = jest.fn();
    render(<Calendar value={now} now={now} locale="en-US" view="year" onDateChange={onDateChange} />);
    fireEvent.click(screen.getByRole("button", { name: "Next year" }));
    expect((onDateChange.mock.calls[0][0] as Date).getFullYear()).toBe(2027);
  });
});

describe("Calendar month counts land on the wire date's local day", () => {
  it("puts a 2026-06-18 event on the 18th, not the 17th west of UTC", () => {
    const { container } = render(<Calendar value={new Date("2026-06-15T12:00:00")} events={[{ date: "2026-06-18" }, { date: "2026-06-18" }]} />);
    const tiles = Array.from(container.querySelectorAll(".calendar-view-month button"));
    const withCount = tiles.filter((tile) => tile.querySelector(".calendar-tile-count"));
    expect(withCount).toHaveLength(1);
    expect(withCount[0].firstChild?.textContent).toBe("18");
  });
});
