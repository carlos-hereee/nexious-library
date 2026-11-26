import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import PillTabStrip from "@nxs-molecules/navigation/PillTabStrip";
import PillNav from "@nxs-molecules/navigation/PillNav";

expect.extend(toHaveNoViolations);

// PillTabStrip and PillNav (2026-11 item 337, Phase 4): one pill look, two semantics. The strip is
// a roving tablist that swaps panels; the nav is links with aria-current that change the route
// (owner decision A12 keeps them apart). Pinned: roles, the one tab stop, the keys, the classes,
// the router link contract and that nav pills are never tabs.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

type Tab = "members" | "roles" | "invites";
const TABS: readonly Tab[] = ["members", "roles", "invites"];
const LABELS: Record<Tab, string> = { members: "Members", roles: "Roles", invites: "Invites" };

const Strip = ({ onSelect }: { onSelect?: (tab: Tab) => void }) => {
  const [active, setActive] = useState<Tab>("members");
  return (
    <>
      <PillTabStrip
        tabs={TABS}
        active={active}
        onSelect={(tab) => {
          setActive(tab);
          onSelect?.(tab);
        }}
        ariaLabel="Team"
        labelFor={(tab) => LABELS[tab]}
        tabId={(tab) => `team-tab-${tab}`}
        panelId={(tab) => `team-panel-${tab}`}
      />
      <div role="tabpanel" id={`team-panel-${active}`} aria-labelledby={`team-tab-${active}`}>
        Panel
      </div>
    </>
  );
};

describe("PillTabStrip", () => {
  it("renders a named tablist of pill tabs wired to their panels", () => {
    render(<Strip />);
    const list = screen.getByRole("tablist", { name: "Team" });
    expect(list).toHaveClass("nxs-pill-tabs");
    const members = screen.getByRole("tab", { name: "Members" });
    expect(members).toHaveAttribute("id", "team-tab-members");
    expect(members).toHaveAttribute("aria-controls", "team-panel-members");
    expect(members).toHaveAttribute("aria-selected", "true");
    expect(members).toHaveClass("nxs-pill-tab", "nxs-pill-tab-active");
    expect(screen.getAllByRole("tab").filter((tab) => tab.tabIndex === 0)).toEqual([members]);
  });

  it("moves focus and selection with the arrow keys, Home and End, wrapping at both ends", () => {
    const onSelect = jest.fn();
    render(<Strip onSelect={onSelect} />);
    const members = screen.getByRole("tab", { name: "Members" });
    members.focus();
    fireEvent.keyDown(members, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Roles" })).toHaveFocus();
    expect(screen.getByRole("tab", { name: "Roles" })).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "End" });
    expect(screen.getByRole("tab", { name: "Invites" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowRight" });
    expect(members).toHaveFocus();
    fireEvent.keyDown(members, { key: "ArrowLeft" });
    expect(screen.getByRole("tab", { name: "Invites" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Home" });
    expect(members).toHaveFocus();
    expect(onSelect.mock.calls.map(([tab]) => tab)).toEqual(["roles", "invites", "members", "invites", "members"]);
  });

  it("selects on click", () => {
    const onSelect = jest.fn();
    render(<Strip onSelect={onSelect} />);
    fireEvent.click(screen.getByRole("tab", { name: "Invites" }));
    expect(onSelect).toHaveBeenCalledWith("invites");
  });

  it("has no violations", async () => {
    const { container } = render(<Strip />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

// eslint-disable-next-line no-script-url
const UNSAFE_HREF = "javascript:alert(1)";

const ITEMS = [
  { id: "events", label: "Events", href: "/plugin/events", icon: <svg role="presentation" /> },
  { id: "community", label: "Community", href: "/plugin/community" },
  { id: "unsafe", label: "Unsafe", href: UNSAFE_HREF },
  { id: "nowhere", label: "Nowhere" },
];

describe("PillNav", () => {
  it("renders a named nav of pill links, aria-current on the current one, no tab roles", () => {
    render(<PillNav items={ITEMS} activeId="community" ariaLabel="Arena sections" />);
    const nav = screen.getByRole("navigation", { name: "Arena sections" });
    expect(nav).toHaveClass("nxs-pill-tabs", "nxs-pill-nav");
    expect(screen.queryByRole("tab")).toBeNull();
    expect(screen.queryByRole("tablist")).toBeNull();
    const links = screen.getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(["Events", "Community", "Unsafe"]);
    const community = screen.getByRole("link", { name: "Community" });
    expect(community).toHaveAttribute("aria-current", "page");
    expect(community).toHaveClass("nxs-pill-tab", "nxs-pill-tab-active");
    expect(screen.getByRole("link", { name: "Events" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Unsafe" })).toHaveAttribute("href", "#");
    expect(nav.querySelector(".nxs-pill-tab-icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders through the caller's router link with `to`", () => {
    const RouterLink = ({ to, children, className }: { to: string; children?: React.ReactNode; className?: string }) => (
      <a href={to} className={className} data-router="yes">
        {children}
      </a>
    );
    render(<PillNav items={ITEMS} activeId={null} ariaLabel="Sections" linkComponent={RouterLink} />);
    const events = screen.getByRole("link", { name: "Events" });
    expect(events).toHaveAttribute("data-router", "yes");
    expect(events).toHaveAttribute("href", "/plugin/events");
    expect(screen.getAllByRole("link").some((link) => link.hasAttribute("aria-current"))).toBe(false);
  });

  it("has no violations", async () => {
    const { container } = render(<PillNav items={ITEMS} activeId="events" ariaLabel="Arena sections" />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
