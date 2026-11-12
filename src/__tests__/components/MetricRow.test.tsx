import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import MetricRow from "@nxs-molecules/card/MetricRow";
import type { MetricRowEntry } from "nxs-card";

expect.extend(toHaveNoViolations);

// MetricRow (2026-11 item 337, Phase 5), ported from the client's features/dashboard/components/
// MetricRow.tsx and its cu-stat primitives. Pinned: each tile's label, value, toned delta with its
// spoken direction, hint and empty text, the scroll variant, the trailing cell, the optional group
// name, and jest-axe. The component formats nothing: every value arrives as the caller wrote it.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

const entries: MetricRowEntry[] = [
  { id: "sales", label: "Store sales", value: "$1,240.00", delta: "+12%", trend: "up", trendLabel: "Up" },
  { id: "members", label: "Members", value: "38", delta: "-3%", trend: "down", hint: "Across every app" },
  { id: "views", label: "Page views", emptyText: "Not available yet", hint: "never shown without a value" },
  { id: "tickets", label: "Tickets", value: 0, delta: "0%" },
];

describe("MetricRow", () => {
  it("renders one nxs-stat tile per entry with the caller's text", () => {
    const { container } = render(<MetricRow entries={entries} />);
    const band = container.firstElementChild;
    expect(band).toHaveClass("nxs-metric-row");
    expect(band).not.toHaveAttribute("role");
    const tiles = container.querySelectorAll(".nxs-stat");
    expect(tiles).toHaveLength(4);
    expect(tiles[0]).toHaveAttribute("data-metric", "sales");
    expect(screen.getByText("Store sales")).toHaveClass("nxs-stat-label");
    expect(screen.getByText("$1,240.00")).toHaveClass("nxs-stat-value");
    expect(screen.getByText("Across every app")).toHaveClass("nxs-stat-hint");
  });

  it("tones the delta by trend and speaks the direction before it", () => {
    const { container } = render(<MetricRow entries={entries} />);
    const deltas = container.querySelectorAll(".nxs-stat-delta");
    expect(deltas[0]).toHaveClass("nxs-stat-delta-up");
    expect(deltas[0]).toHaveTextContent("Up +12%");
    expect(deltas[0].querySelector(".sr-only")).toHaveTextContent("Up");
    expect(deltas[1]).toHaveClass("nxs-stat-delta-down");
    expect(deltas[2]).toHaveAttribute("class", "nxs-stat-delta");
  });

  it("shows the empty text and nothing else when a value is absent, and renders a zero", () => {
    render(<MetricRow entries={entries} />);
    expect(screen.getByText("Not available yet")).toHaveClass("nxs-stat-hint", "nxs-stat-empty");
    expect(screen.queryByText("never shown without a value")).not.toBeInTheDocument();
    expect(screen.getByText("0")).toHaveClass("nxs-stat-value");
  });

  it("names the band as a group, scrolls on request and keeps a trailing cell in the band", () => {
    render(
      <MetricRow
        entries={entries.slice(0, 1)}
        ariaLabel="This month"
        isScrollable
        className="owner-band"
        trailing={<div className="nxs-stat">Server up</div>}
      />
    );
    const group = screen.getByRole("group", { name: "This month" });
    expect(group).toHaveClass("nxs-metric-row", "nxs-metric-row-scroll", "owner-band");
    expect(group).toContainElement(screen.getByText("Server up"));
  });

  it("has no axe violations", async () => {
    const { container } = render(<MetricRow entries={entries} ariaLabel="This month" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
