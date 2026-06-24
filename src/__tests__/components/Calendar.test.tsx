import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Calendar from "@nxs-template/Calendar";

describe("Calendar event grouping", () => {
  // Noon-local seed so the active month is unambiguously June 2026 in any timezone.
  const seed = new Date("2026-06-15T12:00:00");

  it("merges two events on the same (first) grouped date into a single ping of 2", () => {
    render(
      <Calendar
        value={seed}
        events={[
          { date: "2026-06-18" },
          { date: "2026-06-18" },
          { date: "2026-06-22" },
        ]}
      />
    );

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
