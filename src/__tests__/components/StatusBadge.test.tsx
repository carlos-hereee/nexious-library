import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import StatusBadge from "@nxs-molecules/card/StatusBadge";

expect.extend(toHaveNoViolations);

// StatusBadge (2026-11 item 337, Phase 5 repair 3), ported from the client's
// components/app/StatusBadge.tsx onto StatusPill. Pinned: the word and glyph, the tier hook class
// and its sanitizing, the medium default, the tooltip, the render nothing guard, and jest-axe.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

describe("StatusBadge", () => {
  it("renders the word on a StatusPill with the tier hook class and the glyph hidden from speech", () => {
    render(<StatusBadge label="Legend" tier="legend" glyph="*" title="Your platform standing" className="header-pill" />);
    const badge = screen.getByText("Legend").parentElement;
    expect(badge).toHaveClass("nxs-status-pill", "nxs-status-badge", "nxs-status-badge-legend", "header-pill");
    expect(badge).toHaveAttribute("title", "Your platform standing");
    expect(badge?.querySelector(".nxs-status-pill-icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("defaults to the medium size and the neutral pill, and takes the small size", () => {
    const { rerender } = render(<StatusBadge label="Partner" />);
    expect(screen.getByText("Partner").parentElement).toHaveClass("nxs-status-pill-medium", "nxs-status-pill-neutral");
    rerender(<StatusBadge label="Partner" size="small" />);
    expect(screen.getByText("Partner").parentElement).toHaveClass("nxs-status-pill-small");
  });

  it("reduces a tier to a safe class token and drops one with nothing left", () => {
    const { rerender } = render(<StatusBadge label="Owner" tier="Owner Tier!" />);
    expect(screen.getByText("Owner").parentElement).toHaveClass("nxs-status-badge-ownertier");
    rerender(<StatusBadge label="Owner" tier="!!" />);
    expect(screen.getByText("Owner").parentElement?.className).toBe(
      "nxs-status-pill nxs-status-pill-neutral nxs-status-pill-medium nxs-status-badge"
    );
  });

  it("renders nothing without a word, so a raw key never reaches the screen", () => {
    const { container, rerender } = render(<StatusBadge label={null} tier="legend" />);
    expect(container).toBeEmptyDOMElement();
    rerender(<StatusBadge label="" tier="legend" />);
    expect(container).toBeEmptyDOMElement();
  });

  it("has no axe violations", async () => {
    const { container } = render(<StatusBadge label="Champion" tier="champion" glyph="*" title="Standing" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
