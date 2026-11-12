import { forwardRef, useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import SectionedRail from "@nxs-organism/navigation/SectionedRail";
import type { NavItem, NavSection, SectionedRailProps } from "nxs-navigation";

expect.extend(toHaveNoViolations);

// SectionedRail (2026-11 item 337, Phase 4), ported from the client's OwnerRail. Pinned here: one
// tablist across every section with the overlines as plain paragraphs in it, the roving tab stop
// and its focusId fallback for a rail with nothing selected, arrow, Home and End keys, the caller's
// onKeyDown taking a key over, the pings slot, and the nav semantics with aria-current and the
// caller's router link.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

type Ping = { count: number };

const SECTIONS: NavSection[] = [
  {
    id: "overview",
    label: "Overview",
    items: [
      { id: "home", label: "Home", icon: <svg role="presentation" />, href: "/home" },
      { id: "notifications", label: "Notifications", href: "/notifications" },
    ],
  },
  { id: "empty", label: "Nothing here", items: [] },
  {
    id: "operate",
    label: "Operate",
    items: [
      { id: "calendar", label: "Calendar", href: "/calendar" },
      { id: "orders", label: "Orders", href: "/orders" },
    ],
  },
  { id: "unlabelled", label: null, items: [{ id: "team", label: "Team", href: "/team" }] },
];

// eslint-disable-next-line no-script-url
const UNSAFE_HREF = "javascript:alert(1)";

const TAB_ORDER = ["Home", "Notifications", "Calendar", "Orders", "Team"];

// A stateful host, because the rail is controlled: arrows select through onSelect and the host
// feeds the selection back, as the client's dashboards do.
const ControlledRail = (props: Partial<SectionedRailProps<Ping>> & { initial?: string | null }) => {
  const { initial = "home", onSelect, ...rest } = props;
  const [active, setActive] = useState<string | null>(initial);
  return (
    <SectionedRail<Ping>
      sections={SECTIONS}
      ariaLabel="Dashboard"
      activeId={active}
      panelId="owner-panel"
      itemElementId={(id) => `dashboard-tab-${id}`}
      onSelect={(id) => {
        setActive(id);
        onSelect?.(id);
      }}
      {...rest}
    />
  );
};

describe("SectionedRail as a tablist", () => {
  it("renders every section into ONE vertical tablist, overlines as paragraphs between the tabs", () => {
    const { container } = render(<ControlledRail />);
    const lists = screen.getAllByRole("tablist");
    expect(lists).toHaveLength(1);
    const list = lists[0] as HTMLElement;
    expect(list).toHaveAttribute("aria-orientation", "vertical");
    expect(list).toHaveAccessibleName("Dashboard");
    expect(Array.from(list.children).map((child) => `${child.tagName}:${child.textContent}`)).toEqual([
      "P:Overview",
      "BUTTON:Home",
      "BUTTON:Notifications",
      "P:Operate",
      "BUTTON:Calendar",
      "BUTTON:Orders",
      "BUTTON:Team",
    ]);
    // The empty section is dropped whole, overline included, and the null label draws none.
    expect(container.textContent).not.toContain("Nothing here");
    expect(container.querySelectorAll(".nxs-rail-overline")).toHaveLength(2);
  });

  it("wires each tab to the panel and to its element id, with one tab stop on the active tab", () => {
    render(<ControlledRail initial="calendar" />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent)).toEqual(TAB_ORDER);
    const calendar = screen.getByRole("tab", { name: "Calendar" });
    expect(calendar).toHaveAttribute("id", "dashboard-tab-calendar");
    expect(calendar).toHaveAttribute("aria-controls", "owner-panel");
    expect(calendar).toHaveAttribute("aria-selected", "true");
    expect(calendar).toHaveClass("nxs-rail-item", "nxs-rail-item-active");
    expect(tabs.filter((tab) => tab.tabIndex === 0)).toEqual([calendar]);
    expect(screen.getByRole("tab", { name: "Home" })).toHaveAttribute("aria-selected", "false");
  });

  it("ignores href in tablist semantics: every item is a button tab", () => {
    const { container } = render(<ControlledRail />);
    expect(container.querySelector("a")).toBeNull();
  });

  it("with no active item gives the first tab the stop, and focusId moves it", () => {
    const { unmount } = render(<ControlledRail initial={null} />);
    let tabs = screen.getAllByRole("tab");
    expect(tabs.filter((tab) => tab.getAttribute("aria-selected") === "true")).toEqual([]);
    expect(tabs.filter((tab) => tab.tabIndex === 0).map((tab) => tab.textContent)).toEqual(["Home"]);
    unmount();

    render(<ControlledRail initial={null} focusId="orders" />);
    tabs = screen.getAllByRole("tab");
    expect(tabs.filter((tab) => tab.tabIndex === 0).map((tab) => tab.textContent)).toEqual(["Orders"]);
  });

  it("ignores a focusId that names no rendered item", () => {
    render(<ControlledRail initial="calendar" focusId="gone" />);
    expect(screen.getAllByRole("tab").filter((tab) => tab.tabIndex === 0).map((tab) => tab.textContent)).toEqual([
      "Calendar",
    ]);
  });

  it("walks the whole rail across sections with the arrow keys, wrapping, and selects as it goes", () => {
    const onSelect = jest.fn();
    render(<ControlledRail onSelect={onSelect} />);
    const home = screen.getByRole("tab", { name: "Home" });
    home.focus();

    fireEvent.keyDown(home, { key: "ArrowDown" });
    expect(screen.getByRole("tab", { name: "Notifications" })).toHaveFocus();
    // Crossing an overline: the paragraph is not a stop.
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowDown" });
    const calendar = screen.getByRole("tab", { name: "Calendar" });
    expect(calendar).toHaveFocus();
    expect(calendar).toHaveAttribute("aria-selected", "true");
    expect(calendar.tabIndex).toBe(0);

    fireEvent.keyDown(calendar, { key: "ArrowRight" });
    expect(screen.getByRole("tab", { name: "Orders" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "End" });
    expect(screen.getByRole("tab", { name: "Team" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowDown" });
    expect(home).toHaveFocus();
    fireEvent.keyDown(home, { key: "ArrowUp" });
    expect(screen.getByRole("tab", { name: "Team" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Home" });
    expect(home).toHaveFocus();
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual(["notifications", "calendar", "orders", "team", "home", "team", "home"]);
  });

  it("walks from the focused tab when nothing is selected", () => {
    const onSelect = jest.fn();
    render(<ControlledRail initial={null} focusId="orders" onSelect={onSelect} />);
    const orders = screen.getByRole("tab", { name: "Orders" });
    orders.focus();
    fireEvent.keyDown(orders, { key: "ArrowDown" });
    expect(onSelect).toHaveBeenCalledWith("team");
    expect(screen.getByRole("tab", { name: "Team" })).toHaveFocus();
  });

  it("leaves other keys alone and lets the caller take a key over with preventDefault", () => {
    const onSelect = jest.fn();
    const onKeyDown = jest.fn((event: React.KeyboardEvent<HTMLElement>, item: NavItem) => {
      if (event.key === "ArrowDown" && item.id === "home") event.preventDefault();
    });
    render(<ControlledRail onSelect={onSelect} onKeyDown={onKeyDown} />);
    const home = screen.getByRole("tab", { name: "Home" });
    home.focus();
    fireEvent.keyDown(home, { key: "a" });
    fireEvent.keyDown(home, { key: "ArrowDown" });
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onKeyDown.mock.calls[1]?.[1]).toMatchObject({ id: "home" });
    expect(onSelect).not.toHaveBeenCalled();
    expect(home).toHaveFocus();
  });

  it("selects on click, calling the item's own onSelect before the rail's", () => {
    const calls: string[] = [];
    const sections: NavSection[] = [
      { id: "only", label: "Only", items: [{ id: "a", label: "Alpha", onSelect: () => calls.push("item") }] },
    ];
    render(<SectionedRail sections={sections} ariaLabel="Rail" onSelect={() => calls.push("rail")} />);
    fireEvent.click(screen.getByRole("tab", { name: "Alpha" }));
    expect(calls).toEqual(["item", "rail"]);
  });

  it("renders a ping only for items that have one, inside the tab after its label", () => {
    render(
      <ControlledRail
        pings={{ orders: { count: 3 } }}
        renderPing={(ping) => (
          <>
            <span className="test-ping" aria-hidden="true">
              {ping.count}
            </span>
            <span className="sr-only">{`${ping.count} need action`}</span>
          </>
        )}
      />
    );
    const orders = screen.getByRole("tab", { name: "Orders 3 need action" });
    expect(orders.lastElementChild).toHaveClass("sr-only");
    expect(document.querySelectorAll(".test-ping")).toHaveLength(1);
  });

  it("renders the footer under the list and the icon hidden from assistive technology", () => {
    const { container } = render(<ControlledRail footer={<p>Create an app</p>} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("nxs-rail");
    expect(root.lastElementChild).toHaveClass("nxs-rail-footer");
    expect(root.querySelector(".nxs-rail-icon")).toHaveAttribute("aria-hidden", "true");
  });

  // With the tabpanel present, as in a real dashboard: aria-controls must name an element.
  it("has no violations, selected and with nothing selected", async () => {
    const panel = (
      <div role="tabpanel" id="owner-panel" aria-label="Panel">
        Body
      </div>
    );
    const { container, unmount } = render(
      <>
        <ControlledRail footer={<p>Footer</p>} />
        {panel}
      </>
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
    unmount();
    const empty = render(
      <>
        <ControlledRail initial={null} />
        {panel}
      </>
    );
    expect(await axe(empty.container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("SectionedRail as navigation", () => {
  it("renders a nav landmark of links with aria-current on the current one, each its own tab stop", () => {
    render(<SectionedRail sections={SECTIONS} semantics="nav" ariaLabel="Plugin sections" activeId="orders" />);
    const nav = screen.getByRole("navigation", { name: "Plugin sections" });
    expect(screen.queryByRole("tablist")).toBeNull();
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.textContent)).toEqual(TAB_ORDER);
    const orders = within(nav).getByRole("link", { name: "Orders" });
    expect(orders).toHaveAttribute("aria-current", "page");
    expect(orders).toHaveAttribute("href", "/orders");
    expect(orders).toHaveClass("nxs-rail-item-active");
    expect(links.filter((link) => link.hasAttribute("aria-current"))).toEqual([orders]);
    expect(links.every((link) => !link.hasAttribute("tabindex"))).toBe(true);
  });

  it("does not answer the arrow keys in nav semantics", () => {
    const onSelect = jest.fn();
    render(<SectionedRail sections={SECTIONS} semantics="nav" ariaLabel="Rail" activeId="home" onSelect={onSelect} />);
    const home = screen.getByRole("link", { name: "Home" });
    fireEvent.keyDown(home, { key: "ArrowDown" });
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("renders items through the caller's router link with `to`, neutralizing unsafe hrefs", () => {
    const RouterLink = forwardRef<HTMLAnchorElement, { to: string; children?: React.ReactNode }>(
      ({ to, children, ...rest }, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <a ref={ref} href={to} data-router="yes" {...rest}>
          {children}
        </a>
      )
    );
    RouterLink.displayName = "RouterLink";
    const sections: NavSection[] = [
      {
        id: "s",
        label: "Links",
        items: [
          { id: "safe", label: "Safe", href: "/safe" },
          { id: "unsafe", label: "Unsafe", href: UNSAFE_HREF },
          { id: "action", label: "Action" },
        ],
      },
    ];
    render(
      <SectionedRail sections={sections} semantics="nav" ariaLabel="Rail" activeId="safe" linkComponent={RouterLink} />
    );
    const safe = screen.getByRole("link", { name: "Safe" });
    expect(safe).toHaveAttribute("data-router", "yes");
    expect(safe).toHaveAttribute("href", "/safe");
    expect(safe).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Unsafe" })).toHaveAttribute("href", "#");
    // An item with no destination is a button, still able to carry the current state.
    expect(screen.getByRole("button", { name: "Action" })).toHaveAttribute("type", "button");
  });

  it("has no violations", async () => {
    const { container } = render(
      <SectionedRail sections={SECTIONS} semantics="nav" ariaLabel="Plugin sections" activeId="home" />
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
