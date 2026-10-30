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
