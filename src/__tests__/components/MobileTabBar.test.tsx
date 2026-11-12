import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import MobileTabBar from "@nxs-organism/navigation/MobileTabBar";
import MoreSheet from "@nxs-organism/navigation/MoreSheet";
import type { NavItem, NavSection } from "nxs-navigation";

expect.extend(toHaveNoViolations);

// MobileTabBar and MoreSheet (2026-11 item 337, Phase 4), ported from the client's compact
// viewport nav. Pinned: the nav landmark around ONE tablist with More outside it, the tab stop
// with nothing selected, the keys, the height property, the pings slot; and the sheet's dialog
// contract (named, focus in and back, Escape, the scrim, scroll lock, close then select).

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

type Ping = { count: number };

const BAR: NavItem[] = [
  { id: "home", label: "Home", icon: <svg role="presentation" /> },
  { id: "calendar", label: "Calendar" },
  { id: "community", label: "Community" },
  { id: "store", label: "Store" },
];

const SHEET: NavSection[] = [
  { id: "operate", label: "Operate", items: [{ id: "orders", label: "Orders" }, { id: "pages", label: "Pages" }] },
  { id: "setup", label: null, items: [{ id: "team", label: "Team" }] },
  { id: "empty", label: "Empty", items: [] },
];

const renderPing = (ping: Ping) => (
  <>
    <span className="test-ping" aria-hidden="true">
      {ping.count}
    </span>
    <span className="sr-only">{`${ping.count} unread`}</span>
  </>
);

// The two pieces as a dashboard wires them: More opens the sheet, a sheet item selects.
const CompactNav = ({ initial = "home" as string | null, onSelect = (() => {}) as (id: string) => void }) => {
  const [active, setActive] = useState<string | null>(initial);
  const [isOpen, setIsOpen] = useState(false);
  const select = (id: string) => {
    setActive(id);
    onSelect(id);
  };
  const isInSheet = SHEET.some((section) => section.items.some((item) => item.id === active));
  return (
    <>
      <div role="tabpanel" id="dashboard-panel" aria-label="Panel">
        Body
      </div>
      <MobileTabBar<Ping>
        tabs={BAR}
        activeId={active}
        onSelect={select}
        ariaLabel="Dashboard"
        panelId="dashboard-panel"
        itemElementId={(id) => `dashboard-tab-${id}`}
        pings={{ calendar: { count: 2 } }}
        renderPing={renderPing}
        more={{
          label: "More",
          isOpen,
          isSelected: isInSheet,
          sheetId: "more-sheet",
          onToggle: () => setIsOpen((open) => !open),
          ping: <span className="test-more-ping" aria-hidden="true" />,
          pingLabel: "Something inside needs you",
        }}
      />
      <MoreSheet<Ping>
        id="more-sheet"
        isOpen={isOpen}
        title="More"
        closeLabel="Close"
        sections={SHEET}
        activeId={active}
        onSelect={select}
        onClose={() => setIsOpen(false)}
        pings={{ team: { count: 1 } }}
        renderPing={renderPing}
        footer={<p>Create an app</p>}
      />
    </>
  );
};

describe("MobileTabBar", () => {
  afterEach(() => document.documentElement.style.removeProperty("--nxs-tabbar-height"));

  it("renders a nav landmark holding one tablist, with More outside the tablist", () => {
    render(<CompactNav />);
    const nav = screen.getByRole("navigation", { name: "Dashboard" });
    const list = within(nav).getByRole("tablist", { name: "Dashboard" });
    expect(within(list).getAllByRole("tab").map((tab) => tab.textContent)).toEqual([
      "Home",
      "Calendar22 unread",
      "Community",
      "Store",
    ]);
    const more = within(nav).getByRole("button", { name: "More Something inside needs you" });
    expect(list.contains(more)).toBe(false);
    expect(more).toHaveAttribute("aria-haspopup", "dialog");
    expect(more).toHaveAttribute("aria-expanded", "false");
    expect(more).toHaveAttribute("aria-controls", "more-sheet");
    expect(more).not.toHaveClass("nxs-tabbar-item-active");
  });

  it("wires each tab to the panel, one tab stop, and the ping only where there is one", () => {
    render(<CompactNav />);
    const home = screen.getByRole("tab", { name: "Home" });
    expect(home).toHaveAttribute("id", "dashboard-tab-home");
    expect(home).toHaveAttribute("aria-controls", "dashboard-panel");
    expect(home).toHaveClass("nxs-tabbar-item", "nxs-tabbar-item-active");
    expect(screen.getAllByRole("tab").filter((tab) => tab.tabIndex === 0)).toEqual([home]);
    expect(screen.getByRole("tab", { name: "Calendar 2 unread" })).toBeInTheDocument();
    expect(document.querySelectorAll(".nxs-tabbar .test-ping")).toHaveLength(1);
  });

  it("with the selection in the sheet gives the first tab the stop and More its active look", () => {
    render(<CompactNav initial="orders" />);
    const tabs = screen.getAllByRole("tab");
    expect(tabs.filter((tab) => tab.getAttribute("aria-selected") === "true")).toEqual([]);
    expect(tabs.filter((tab) => tab.tabIndex === 0).map((tab) => tab.textContent)).toEqual(["Home"]);
    expect(screen.getByRole("button", { name: /More/ })).toHaveClass("nxs-tabbar-item-active");
  });

  it("walks the tabs with the arrow keys and never lands on More", () => {
    const onSelect = jest.fn();
    render(<CompactNav onSelect={onSelect} />);
    const home = screen.getByRole("tab", { name: "Home" });
    home.focus();
    fireEvent.keyDown(home, { key: "ArrowLeft" });
    expect(screen.getByRole("tab", { name: "Store" })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "ArrowRight" });
    expect(home).toHaveFocus();
    fireEvent.keyDown(home, { key: "End" });
    expect(screen.getByRole("tab", { name: "Store" })).toHaveFocus();
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual(["store", "home", "store"]);
  });

  it("publishes its height on the root while mounted, under a caller's property name too", () => {
    const { unmount } = render(<MobileTabBar tabs={BAR} ariaLabel="Bar" />);
    expect(document.documentElement.style.getPropertyValue("--nxs-tabbar-height")).toBe("0px");
    unmount();
    expect(document.documentElement.style.getPropertyValue("--nxs-tabbar-height")).toBe("");
    const custom = render(<MobileTabBar tabs={BAR} ariaLabel="Bar" heightProperty="--cu-tabbar-height" />);
    expect(document.documentElement.style.getPropertyValue("--cu-tabbar-height")).toBe("0px");
    custom.unmount();
    expect(document.documentElement.style.getPropertyValue("--cu-tabbar-height")).toBe("");
  });

  it("has no violations", async () => {
    const { container } = render(<CompactNav />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("MoreSheet", () => {
  it("renders nothing while closed", () => {
    render(<CompactNav />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens as a named modal dialog with focus inside it and the page locked", () => {
    render(<CompactNav />);
    fireEvent.click(screen.getByRole("button", { name: /More/ }));
    const dialog = screen.getByRole("dialog", { name: "More" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("id", "more-sheet");
    expect(screen.getByRole("button", { name: /More/ })).toHaveAttribute("aria-expanded", "true");
    // Focus moves INTO the sheet. A browser lands it on the close button; jsdom lays nothing out,
    // so useFocusTrap finds no visible control and focuses the sheet itself, which is its fallback.
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("draws overlines only for labelled sections, drops empty ones, and pings where there is one", () => {
    render(<CompactNav />);
    fireEvent.click(screen.getByRole("button", { name: /More/ }));
    const dialog = screen.getByRole("dialog");
    expect(Array.from(dialog.querySelectorAll(".nxs-more-overline")).map((node) => node.textContent)).toEqual([
      "Operate",
    ]);
    expect(dialog.querySelectorAll(".nxs-more-section")).toHaveLength(2);
    expect(within(dialog).getByRole("button", { name: "Team 1 unread" })).toBeInTheDocument();
    expect(within(dialog).getByText("Create an app").parentElement).toHaveClass("nxs-more-footer");
  });

  it("closes first, then selects, and marks the chosen item current next time", () => {
    const onSelect = jest.fn();
    render(<CompactNav onSelect={onSelect} />);
    const more = screen.getByRole("button", { name: /More/ });
    more.focus();
    fireEvent.click(more);
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Orders" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(onSelect).toHaveBeenCalledWith("orders");
    expect(more).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
    fireEvent.click(more);
    expect(within(screen.getByRole("dialog")).getByRole("button", { name: "Orders" })).toHaveAttribute(
      "aria-current",
      "page"
    );
  });

  it("closes on Escape and on a press of the scrim, not on a press inside the sheet", () => {
    render(<CompactNav />);
    const more = screen.getByRole("button", { name: /More/ });
    fireEvent.click(more);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).toBeNull();

    fireEvent.click(more);
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(document.querySelector(".nxs-more-scrim") as HTMLElement);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes from its close button", () => {
    render(<CompactNav />);
    fireEvent.click(screen.getByRole("button", { name: /More/ }));
    fireEvent.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("has no violations while open", async () => {
    render(<CompactNav initial="orders" />);
    fireEvent.click(screen.getByRole("button", { name: /More/ }));
    expect(await axe(document.body, AXE_OPTIONS)).toHaveNoViolations();
  });
});
