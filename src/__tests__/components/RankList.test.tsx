import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import RankList from "@nxs-molecules/card/RankList";
import BarChart from "@nxs-molecules/card/BarChart";
import type { BarChartPoint } from "nxs-card";

expect.extend(toHaveNoViolations);

// RankList and BarChart (2026-11 item 337, Phase 5 repair), ported from the client's analytics
// AnalyticsRankList.tsx and AnalyticsBarChart.tsx. Pinned: the rows and empty label, the per bar
// ticks up to maxTickLabels, the range fallback and its text equivalent table, the caller
// formatters, and jest-axe. Neither component formats a value of its own.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

const buildPoints = (count: number): BarChartPoint[] =>
  Array.from({ length: count }, (_, index) => ({ id: `2026-11-${String(index + 1).padStart(2, "0")}`, label: `11/${index + 1}`, value: index * 2 }));

describe("RankList", () => {
  it("renders one row per entry with its label, meta and caller formatted value", () => {
    render(
      <RankList
        ariaLabel="Top pages"
        emptyLabel="Nothing yet"
        rows={[
          { id: "home", label: "Home", meta: "Landing", value: "1,204" },
          { id: "store", label: "Store", value: "$42.00" },
        ]}
      />
    );
    const list = screen.getByRole("list", { name: "Top pages" });
    expect(list).toHaveClass("nxs-rank-list");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("Landing")).toHaveClass("nxs-rank-list-meta");
    expect(screen.getByText("$42.00")).toHaveClass("nxs-rank-list-value");
  });

  it("shows the empty label instead of a list when there are no rows", () => {
    render(<RankList rows={[]} emptyLabel="Nothing yet" />);
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByText("Nothing yet")).toHaveClass("nxs-rank-list-empty");
  });

  it("has no axe violations", async () => {
    const { container } = render(<RankList rows={[{ id: "a", label: "A", value: "1" }]} emptyLabel="None" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("BarChart", () => {
  it("names the bars as one image and gives every bar a tick with its value and label", () => {
    render(<BarChart points={buildPoints(3)} ariaLabel="Visits per day" formatTick={(value) => `${value}v`} />);
    expect(screen.getByRole("img", { name: "Visits per day" })).toHaveClass("nxs-bar-chart-plot");
    expect(document.querySelectorAll(".nxs-bar-chart-bar")).toHaveLength(3);
    expect(document.querySelectorAll(".nxs-bar-chart-tick")).toHaveLength(3);
    expect(screen.getByText("4v")).toHaveClass("nxs-bar-chart-tick-value");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("uses the caller's tooltip formatter, or the id and formatted value by default", () => {
    const { container, rerender } = render(<BarChart points={buildPoints(1)} ariaLabel="Sales" formatValue={(value) => `$${value}`} />);
    expect(container.querySelector("title")).toHaveTextContent("2026-11-01: $0");
    rerender(<BarChart points={buildPoints(1)} ariaLabel="Sales" formatTooltip={(point) => `Day ${point.label}`} />);
    expect(container.querySelector("title")).toHaveTextContent("Day 11/1");
  });

  it("collapses the axis to a range past maxTickLabels and adds a text equivalent table", () => {
    render(<BarChart points={buildPoints(12)} ariaLabel="Visits per day" formatValue={(value) => `${value} visits`} />);
    expect(document.querySelector(".nxs-bar-chart-axis")).toBeNull();
    const range = document.querySelector(".nxs-bar-chart-range");
    expect(range).toHaveTextContent("11/1");
    expect(range).toHaveTextContent("11/12");
    const table = screen.getByRole("table", { name: "Visits per day" });
    expect(table.parentElement).toHaveClass("sr-only");
    expect(screen.getByRole("rowheader", { name: "11/12" })).toBeInTheDocument();
    expect(screen.getByText("22 visits")).toBeInTheDocument();
  });

  it("honors a smaller maxTickLabels", () => {
    render(<BarChart points={buildPoints(4)} ariaLabel="Visits" maxTickLabels={3} />);
    expect(screen.getByRole("table", { name: "Visits" })).toBeInTheDocument();
  });

  it("has no axe violations with ticks or with the range fallback", async () => {
    const ticks = render(<BarChart points={buildPoints(3)} ariaLabel="Visits" />);
    expect(await axe(ticks.container, AXE_OPTIONS)).toHaveNoViolations();
    const range = render(<BarChart points={buildPoints(14)} ariaLabel="Visits over the window" />);
    expect(await axe(range.container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
