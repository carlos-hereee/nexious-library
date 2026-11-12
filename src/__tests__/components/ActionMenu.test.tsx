import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import ActionMenu from "@nxs-molecules/navigation/ActionMenu";
import type { ActionMenuEntry } from "nxs-navigation";

expect.extend(toHaveNoViolations);

// ActionMenu (2026-11 item 337, Phase 5), ported from the client's components/menu/ActionMenu.tsx.
// Pinned: the menu button wiring, focus on open and back on close, the arrow walk, a disabled entry
// that stays focusable and refuses, a link entry through safeUrl, and the nxs-menu classes.

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

const buildEntries = (onEdit = jest.fn(), onRemove = jest.fn()): ActionMenuEntry[] => [
  { id: "edit", label: "Edit", onSelect: onEdit },
  { id: "docs", label: "Open docs", href: "https://example.com/docs" },
  { id: "archive", label: "Archive", isDisabled: true, hint: "Archived items cannot move", onSelect: jest.fn() },
  { id: "remove", label: "Remove", isDanger: true, onSelect: onRemove },
];

const openMenu = () => {
  const trigger = screen.getByRole("button", { name: "Barber actions" });
  fireEvent.click(trigger);
  return trigger;
};

describe("ActionMenu", () => {
  it("renders a collapsed menu button with the nxs classes and the default glyph", () => {
    const { container } = render(<ActionMenu label="Barber actions" entries={buildEntries()} />);
    const trigger = screen.getByRole("button", { name: "Barber actions" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveClass("nxs-btn", "nxs-btn-secondary", "nxs-menu-trigger");
    expect(container.firstElementChild).toHaveClass("nxs-menu");
    expect(container.querySelector(".nxs-menu-glyph")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens on click, focuses the first entry and names the menu", () => {
    render(<ActionMenu label="Barber actions" entries={buildEntries()} />);
    const trigger = openMenu();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu", { name: "Barber actions" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });

  it("walks the entries with the arrows, Home and End, wrapping at both ends", () => {
    render(<ActionMenu label="Barber actions" entries={buildEntries()} />);
    openMenu();
    const items = screen.getAllByRole("menuitem");
    fireEvent.keyDown(items[0], { key: "ArrowDown" });
    expect(items[1]).toHaveFocus();
    fireEvent.keyDown(items[1], { key: "End" });
    expect(items[3]).toHaveFocus();
    fireEvent.keyDown(items[3], { key: "ArrowDown" });
    expect(items[0]).toHaveFocus();
    fireEvent.keyDown(items[0], { key: "ArrowUp" });
    expect(items[3]).toHaveFocus();
    fireEvent.keyDown(items[3], { key: "Home" });
    expect(items[0]).toHaveFocus();
  });

  it("closes on Escape and returns focus to the trigger", () => {
    render(<ActionMenu label="Barber actions" entries={buildEntries()} />);
    const trigger = openMenu();
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Edit" }), { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes when Tab leaves the menu", () => {
    render(<ActionMenu label="Barber actions" entries={buildEntries()} />);
    openMenu();
    fireEvent.keyDown(screen.getByRole("menuitem", { name: "Edit" }), { key: "Tab" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on an outside press", () => {
    render(
      <>
        <ActionMenu label="Barber actions" entries={buildEntries()} />
        <p>Outside</p>
      </>
    );
    openMenu();
    fireEvent.mouseDown(screen.getByText("Outside"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes and returns focus to the trigger before running the chosen entry", () => {
    let isTriggerFocusedOnSelect = false;
    const onEdit = jest.fn(() => {
      isTriggerFocusedOnSelect = document.activeElement === screen.getByRole("button", { name: "Barber actions" });
    });
    render(<ActionMenu label="Barber actions" entries={buildEntries(onEdit)} />);
    openMenu();
    fireEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(isTriggerFocusedOnSelect).toBe(true);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("keeps a disabled entry focusable and announced, and refuses its click", () => {
    const onArchive = jest.fn();
    const entries = buildEntries().map((entry) => (entry.id === "archive" ? { ...entry, onSelect: onArchive } : entry));
    render(<ActionMenu label="Barber actions" entries={entries} />);
    openMenu();
    const archive = screen.getByRole("menuitem", { name: "Archive" });
    expect(archive).toHaveAttribute("aria-disabled", "true");
    expect(archive).not.toBeDisabled();
    expect(archive).toHaveAttribute("title", "Archived items cannot move");
    fireEvent.click(archive);
    expect(onArchive).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders a link entry as an anchor in a new tab, and a disabled link as a button", () => {
    const entries: ActionMenuEntry[] = [
      { id: "docs", label: "Open docs", href: "https://example.com/docs" },
      // eslint-disable-next-line no-script-url -- the safeUrl guard is what this asserts
      { id: "bad", label: "Bad link", href: "javascript:alert(1)" },
      { id: "off", label: "Unavailable link", href: "https://example.com/off", isDisabled: true },
    ];
    render(<ActionMenu label="Barber actions" entries={entries} />);
    openMenu();
    const docs = screen.getByRole("menuitem", { name: "Open docs" });
    expect(docs.tagName).toBe("A");
    expect(docs).toHaveAttribute("href", "https://example.com/docs");
    expect(docs).toHaveAttribute("target", "_blank");
    // eslint-disable-next-line no-script-url -- the safeUrl guard is what this asserts
    expect(screen.getByRole("menuitem", { name: "Bad link" })).not.toHaveAttribute("href", "javascript:alert(1)");
    expect(screen.getByRole("menuitem", { name: "Unavailable link" }).tagName).toBe("BUTTON");
  });

  it("marks a danger entry, aligns to the start edge and honors a caller trigger class", () => {
    render(<ActionMenu label="Barber actions" entries={buildEntries()} align="start" triggerClassName="my-trigger" />);
    const trigger = openMenu();
    expect(trigger).toHaveAttribute("class", "my-trigger");
    expect(screen.getByRole("menuitem", { name: "Remove" })).toHaveClass("nxs-menu-item", "nxs-menu-item-danger");
    expect(screen.getByRole("menu")).toHaveClass("nxs-menu-panel", "nxs-menu-panel-start");
  });

  it("has no axe violations closed and open", async () => {
    const { container } = render(<ActionMenu label="Barber actions" entries={buildEntries()} />);
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
    openMenu();
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});
