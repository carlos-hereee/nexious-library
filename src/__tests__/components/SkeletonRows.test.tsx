import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import SkeletonRows from "@nxs-molecules/errors/SkeletonRows";
import type { SkeletonRowsColumn } from "nxs-errors";

expect.extend(toHaveNoViolations);

// SkeletonRows (2026-11 item 337, Phase 5 repair 3), ported from the client's orders
// OrdersSkeleton.tsx. Pinned: the column shapes and tracks, the row count and its clamp, the
// aria-hidden block with no live region of its own beside the caller's, and jest-axe.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

const orderColumns: SkeletonRowsColumn[] = [
  { width: "5rem" },
  { width: "1fr" },
  { width: "1fr" },
  { width: "6rem", shape: "pill" },
  { width: "4rem" },
];

describe("SkeletonRows", () => {
  it("draws each row with one cell per column, in the column's shape", () => {
    const { container } = render(<SkeletonRows columns={orderColumns} count={5} className="orders-skeleton" />);
    const rows = container.querySelectorAll(".nxs-skeleton-row");
    expect(rows).toHaveLength(5);
    expect(rows[0].querySelectorAll(".nxs-skeleton-cell")).toHaveLength(5);
    expect(rows[0].children[3]).toHaveClass("skeleton-bar", "nxs-skeleton-cell-pill");
    expect(rows[0].children[0]).toHaveClass("nxs-skeleton-cell-bar");
    expect(container.firstChild).toHaveClass("nxs-skeleton-rows", "orders-skeleton");
  });

  it("hands the column tracks to the stylesheet through a custom property", () => {
    const { container } = render(<SkeletonRows columns={orderColumns} />);
    const wrapper = container.querySelector(".nxs-skeleton-rows");
    expect(wrapper).toHaveStyle({ "--nxs-skeleton-columns": "5rem 1fr 1fr 6rem 4rem" });
  });

  it("defaults to three rows, clamps to one, and draws one column when given none", () => {
    const { container, rerender } = render(<SkeletonRows columns={orderColumns} />);
    expect(container.querySelectorAll(".nxs-skeleton-row")).toHaveLength(3);
    rerender(<SkeletonRows columns={[]} count={0} />);
    expect(container.querySelectorAll(".nxs-skeleton-row")).toHaveLength(1);
    expect(container.querySelectorAll(".nxs-skeleton-cell")).toHaveLength(1);
  });

  it("is hidden from assistive technology and announces nothing itself, leaving the caller's region", () => {
    const { container } = render(
      <div>
        <p role="status">Loading orders</p>
        <SkeletonRows columns={orderColumns} />
      </div>
    );
    expect(screen.getAllByRole("status")).toHaveLength(1);
    expect(container.querySelector(".nxs-skeleton-rows")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector(".nxs-skeleton-rows [tabindex]")).toBeNull();
  });

  it("has no axe violations beside the caller's live region", async () => {
    const { container } = render(
      <div>
        <p role="status">Loading orders</p>
        <SkeletonRows columns={orderColumns} count={2} />
      </div>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
