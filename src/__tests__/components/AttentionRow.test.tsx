import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import AttentionRow from "@nxs-molecules/card/AttentionRow";
import AnnouncementCard from "@nxs-molecules/card/AnnouncementCard";

expect.extend(toHaveNoViolations);

// AttentionRow and AnnouncementCard (2026-11 item 337, Phase 5 repair), ported from the client's
// dashboard AttentionRow.tsx and feed/AnnouncementCard.tsx. Pinned: the severity led accessible
// name and its override, linkComponent receiving `to`, safeUrl on every href, the dismiss controls
// as separate tab stops, the one press dismiss, and jest-axe.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

type RouterLinkProps = { to: string; className?: string; "aria-label"?: string; children?: React.ReactNode };
const RouterLink = ({ to, className, "aria-label": ariaLabel, children }: RouterLinkProps) => (
  <a data-router-to={to} href={to} className={className} aria-label={ariaLabel}>
    {children}
  </a>
);

const rowProps = {
  title: "Connect Stripe for Iron Forge",
  detail: "Its store is live but cannot take payments yet",
  severityLabel: "Revenue blocked",
  actionLabel: "Connect Stripe",
  href: "/dashboard/store",
};

describe("AttentionRow", () => {
  it("leads the link's accessible name with the severity word and keeps the title visible", () => {
    render(
      <ul>
        <AttentionRow {...rowProps} lead={<span>!</span>} leadClassName="tone-danger" />
      </ul>
    );
    const link = screen.getByRole("link", {
      name: "Revenue blocked. Connect Stripe: Connect Stripe for Iron Forge. Its store is live but cannot take payments yet",
    });
    expect(link).toHaveClass("nxs-list-row-link");
    expect(link).toHaveAttribute("href", "/dashboard/store");
    expect(screen.getByRole("listitem")).toHaveClass("nxs-list-row", "nxs-attention-row");
    expect(document.querySelector(".nxs-attention-row-lead")).toHaveClass("tone-danger");
  });

  it("takes an ariaLabel override and routes through linkComponent with `to`", () => {
    render(
      <ul>
        <AttentionRow {...rowProps} ariaLabel="Custom name" linkComponent={RouterLink} />
      </ul>
    );
    expect(screen.getByRole("link", { name: "Custom name" })).toHaveAttribute("data-router-to", "/dashboard/store");
  });

  it("neutralizes a dangerous href", () => {
    // eslint-disable-next-line no-script-url
    render(<AttentionRow {...rowProps} as="div" href="javascript:alert(1)" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "#");
  });

  it("renders the dismiss control only with a label, as a second tab stop that fires onDismiss", () => {
    const onDismiss = jest.fn();
    const { rerender } = render(
      <ul>
        <AttentionRow {...rowProps} onDismiss={onDismiss} />
      </ul>
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    rerender(
      <ul>
        <AttentionRow {...rowProps} onDismiss={onDismiss} dismissLabel="Dismiss notification" />
      </ul>
    );
    const link = screen.getByRole("link");
    const dismiss = screen.getByRole("button", { name: "Dismiss notification" });
    expect(link).not.toContainElement(dismiss);
    link.focus();
    expect(link).toHaveFocus();
    dismiss.focus();
    expect(dismiss).toHaveFocus();
    expect(dismiss.tabIndex).toBe(0);
    fireEvent.click(dismiss);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <ul>
        <AttentionRow {...rowProps} onDismiss={() => {}} dismissLabel="Dismiss notification" />
      </ul>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("AnnouncementCard", () => {
  it("renders the badge, the body and a new tab link through safeUrl", () => {
    render(
      <AnnouncementCard
        badgeLabel="Platform update"
        body="The store now takes tips."
        link={{ href: "https://example.com/notes", label: "Read the notes", newTabHint: "(opens in a new tab)" }}
      />
    );
    expect(screen.getByRole("article")).toHaveClass("nxs-card", "nxs-announcement-card");
    expect(screen.getByText("Platform update")).toHaveClass("nxs-announcement-badge");
    const link = screen.getByRole("link", { name: "Read the notes (opens in a new tab)" });
    expect(link).toHaveAttribute("href", "https://example.com/notes");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("dismisses once: the control disables itself after the first press", () => {
    const onDismiss = jest.fn();
    render(<AnnouncementCard badgeLabel="Platform update" body="Body" onDismiss={onDismiss} dismissLabel="Dismiss update" />);
    const dismiss = screen.getByRole("button", { name: "Dismiss update" });
    dismiss.focus();
    expect(dismiss).toHaveFocus();
    fireEvent.click(dismiss);
    fireEvent.click(dismiss);
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(dismiss).toBeDisabled();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <AnnouncementCard
        badgeLabel="Platform update"
        body="Body"
        onDismiss={() => {}}
        dismissLabel="Dismiss update"
        link={{ href: "https://example.com", label: "Read more" }}
      />
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
