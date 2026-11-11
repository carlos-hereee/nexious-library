import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
