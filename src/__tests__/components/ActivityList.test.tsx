import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ActivityList from "@nxs-molecules/card/ActivityList";
import StatusPill from "@nxs-molecules/card/StatusPill";
import DiscountNote from "@nxs-molecules/card/DiscountNote";
import type { ActivityListItem } from "nxs-card";

expect.extend(toHaveNoViolations);

// ActivityList, StatusPill and DiscountNote (2026-11 item 337, Phase 5 repair), ported from the
// client's dashboard ActivityList.tsx and the orders OrderStatusPill.tsx and
// OrderMemberDiscountNote.tsx. Pinned: links through linkComponent with `to` or a safeUrl anchor,
// plain text without an href, the caller's timestamp formatter and limit, the pill's word and
// tone, the discount line, and jest-axe.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

const RouterLink = ({ to, className, children }: { to: string; className?: string; children?: React.ReactNode }) => (
  <a data-router-to={to} href={to} className={className}>
    {children}
  </a>
);

const items: ActivityListItem[] = [
  { id: "o1", title: "New order #1042", description: "Two items", href: "/orders/1042", timestamp: "2026-11-10T12:00:00Z", type: "order" },
  { id: "b1", title: "Booking confirmed", timestamp: "2026-11-09T12:00:00Z", icon: <span>*</span> },
  // eslint-disable-next-line no-script-url
  { id: "n1", title: "Notice", href: "javascript:alert(1)" },
];

describe("ActivityList", () => {
  it("renders a row per item with the caller's timestamp text", () => {
    render(<ActivityList items={items} formatTimestamp={(value) => `day ${value.slice(8, 10)}`} ariaLabel="Recent activity" />);
    expect(screen.getByRole("list", { name: "Recent activity" })).toHaveClass("nxs-activity-list");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getAllByRole("listitem")[0]).toHaveAttribute("data-activity-type", "order");
    expect(screen.getByText("day 10")).toHaveClass("nxs-activity-list-when");
    expect(screen.getByText("Two items")).toHaveClass("nxs-activity-list-meta");
  });

  it("links an item with an href, prints one without as text, and neutralizes a bad href", () => {
    render(<ActivityList items={items} formatTimestamp={() => ""} />);
    expect(screen.getByRole("link", { name: "New order #1042" })).toHaveAttribute("href", "/orders/1042");
    expect(screen.getByText("Booking confirmed").tagName).toBe("P");
    expect(screen.getByRole("link", { name: "Notice" })).toHaveAttribute("href", "#");
    expect(document.querySelector(".nxs-activity-list-when")).toBeNull();
  });

  it("routes through linkComponent with `to`, and the link is a focusable tab stop", () => {
    render(<ActivityList items={items.slice(0, 1)} formatTimestamp={() => ""} linkComponent={RouterLink} />);
    const link = screen.getByRole("link", { name: "New order #1042" });
    expect(link).toHaveAttribute("data-router-to", "/orders/1042");
    link.focus();
    expect(link).toHaveFocus();
  });

  it("shows only the first `limit` items", () => {
    render(<ActivityList items={items} formatTimestamp={() => ""} limit={2} />);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("has no axe violations", async () => {
    const { container } = render(<ActivityList items={items} formatTimestamp={() => "Nov 10"} />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("StatusPill", () => {
  it("renders the word with its tone and size, the glyph hidden from speech", () => {
    render(<StatusPill label="Shipped" tone="success" size="medium" icon={<span>v</span>} className="orders-pill" />);
    const pill = screen.getByText("Shipped").parentElement;
    expect(pill).toHaveClass("nxs-status-pill", "nxs-status-pill-success", "nxs-status-pill-medium", "orders-pill");
    expect(pill?.querySelector(".nxs-status-pill-icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("defaults to the neutral tone and the small size", () => {
    render(<StatusPill label="Pending" />);
    expect(screen.getByText("Pending").parentElement).toHaveClass("nxs-status-pill-neutral", "nxs-status-pill-small");
  });

  it("has no axe violations", async () => {
    const { container } = render(<StatusPill label="Refunded" tone="danger" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("DiscountNote", () => {
  it("renders the label and the amount", () => {
    render(<DiscountNote label="Member discount (20% off)" amount="-$4.00" className="board" />);
    expect(screen.getByText("-$4.00")).toHaveClass("nxs-discount-note-amount");
    expect(screen.getByText("-$4.00").parentElement).toHaveClass("nxs-discount-note", "board");
  });

  it("has no axe violations", async () => {
    const { container } = render(<DiscountNote label="Member discount" amount="-$1.00" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
