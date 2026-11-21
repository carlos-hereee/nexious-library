import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ProgressRing, { boundPercent, ringDashArray } from "@nxs-molecules/card/ProgressRing";
import type { ProgressRingSize } from "nxs-card";

expect.extend(toHaveNoViolations);

// ProgressRing (2026-11 item 387, Phase 1), lifted from the client's Study StudyProgressRing.
// Pinned: the clamp and the rounding, the one image name that speaks the label and the value, the
// value as HTML outside the viewBox, each size class, the hero caption (the label by default, the
// caller's children when given, never on small or large), the dasharray math and jest-axe in both
// themes. Contrast is not measurable in jsdom; contrast.test.ts measures the arc tokens.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };
const RADIUS = 15.5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZES: ProgressRingSize[] = ["small", "large", "hero"];

const arcOf = (container: HTMLElement) => container.querySelector(".nxs-progress-ring-arc") as SVGCircleElement;

describe("ProgressRing", () => {
  it("clamps the value to 0 to 100 and rounds it", () => {
    expect(boundPercent(-20)).toBe(0);
    expect(boundPercent(140)).toBe(100);
    expect(boundPercent(42.4)).toBe(42);
    expect(boundPercent(42.5)).toBe(43);
    expect(boundPercent(Number.NaN)).toBe(0);
    render(<ProgressRing value={140} label="Course ready" />);
    expect(screen.getByRole("img", { name: "Course ready: 100%" })).toBeInTheDocument();
  });

  it("names one image with the label and the rounded value, and hides the svg and the printed text", () => {
    const { container } = render(<ProgressRing value={66.6} label="Course ready" />);
    const ring = screen.getByRole("img", { name: "Course ready: 67%" });
    expect(ring).toHaveClass("nxs-progress-ring", "nxs-progress-ring-small");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    const value = container.querySelector(".nxs-progress-ring-value");
    expect(value).toHaveAttribute("aria-hidden", "true");
    expect(value).toHaveTextContent(/^67%$/);
    // The value is HTML beside the svg, never svg text inside the viewBox.
    expect(container.querySelector("svg text")).toBeNull();
    expect(value?.closest("svg")).toBeNull();
  });

  it("prints and speaks the caller's valueText in place of the percent", () => {
    const { container } = render(<ProgressRing value={60} label="Weekly goal" valueText="3 of 5" />);
    expect(screen.getByRole("img", { name: "Weekly goal: 3 of 5" })).toBeInTheDocument();
    expect(container.querySelector(".nxs-progress-ring-value")).toHaveTextContent(/^3 of 5$/);
    // The arc still draws the percent.
    expect(arcOf(container)).toHaveAttribute("stroke-dasharray", ringDashArray(60));
  });

  it.each(SIZES)("renders the %s size class", (size) => {
    render(<ProgressRing value={10} label="Ready" size={size} />);
    expect(screen.getByRole("img")).toHaveClass("nxs-progress-ring", `nxs-progress-ring-${size}`);
  });

  it("shows the label as the hero caption when no children are given", () => {
    const { container } = render(<ProgressRing value={80} label="Course ready" size="hero" />);
    expect(container.querySelector(".nxs-progress-ring-caption")).toHaveTextContent(/^Course ready$/);
    expect(container.querySelector(".nxs-progress-ring-value")).toHaveTextContent("80%Course ready");
  });

  it("shows children inside the hero ring in place of the label caption", () => {
    const { container } = render(
      <ProgressRing value={60} label="Weekly goal" size="hero">
        <span data-testid="inside">applications</span>
      </ProgressRing>
    );
    const caption = container.querySelector(".nxs-progress-ring-caption");
    expect(caption).toContainElement(screen.getByTestId("inside"));
    expect(caption).not.toHaveTextContent("Weekly goal");
    expect(screen.getByRole("img", { name: "Weekly goal: 60%" })).toBeInTheDocument();
  });

  it.each<ProgressRingSize>(["small", "large"])("never renders a caption or children on the %s size", (size) => {
    const { container } = render(
      <ProgressRing value={60} label="Weekly goal" size={size}>
        <span>applications</span>
      </ProgressRing>
    );
    expect(container.querySelector(".nxs-progress-ring-caption")).toBeNull();
    expect(screen.queryByText("applications")).toBeNull();
  });

  it("draws the arc as dasharray attributes from 12 o'clock, empty at 0 and full at 100", () => {
    expect(ringDashArray(0)).toBe(`0 ${CIRCUMFERENCE}`);
    expect(ringDashArray(100)).toBe(`${CIRCUMFERENCE} 0`);
    expect(ringDashArray(25)).toBe(`${CIRCUMFERENCE / 4} ${(CIRCUMFERENCE * 3) / 4}`);
    const { container } = render(<ProgressRing value={50} label="Ready" />);
    const arc = arcOf(container);
    expect(arc).toHaveAttribute("stroke-dasharray", `${CIRCUMFERENCE / 2} ${CIRCUMFERENCE / 2}`);
    expect(arc).toHaveAttribute("transform", "rotate(-90 18 18)");
    expect(arc).not.toHaveAttribute("style");
  });

  it("appends className and lets classNames.root replace the base class", () => {
    const { rerender } = render(<ProgressRing value={5} label="Ready" className="extra" />);
    expect(screen.getByRole("img")).toHaveClass("nxs-progress-ring", "extra");
    rerender(<ProgressRing value={5} label="Ready" classNames={{ root: "custom-ring" }} />);
    const ring = screen.getByRole("img");
    expect(ring).toHaveClass("custom-ring", "nxs-progress-ring-small");
    expect(ring).not.toHaveClass("nxs-progress-ring");
  });

  it.each(["light", "dark"])("has no axe violations in the %s theme", async (theme) => {
    const { container } = render(
      <div className={theme === "dark" ? "dark-mode" : undefined}>
        <ProgressRing value={0} label="Course ready" />
        <ProgressRing value={50} label="Course ready" size="large" />
        <ProgressRing value={100} label="Course ready" size="hero" />
        <ProgressRing value={60} label="Weekly goal" size="hero">
          <span>applications</span>
        </ProgressRing>
      </div>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
