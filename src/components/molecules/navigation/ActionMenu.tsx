// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/action-menu/README.md
// The shared dropdown menu, ported from nexious-client's components/menu/ActionMenu.tsx (2026-11
// item 337, Phase 5). It owns the menu button mechanics (open, outside click and Escape close, the
// arrow walk, focus back to the trigger) and nothing else: the entries, their labels and what they
// do arrive from the caller. The client rendered study-ws-menu-* classes, a plugin's name on a
// shared menu; the port renders nxs-menu-* instead.
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { ActionMenuEntry, ActionMenuProps } from "nxs-navigation";
import { safeUrl } from "@nxs-utils/data/safeUrl";
import { buildNxsButtonClass } from "../../../@types/Variant";

const DEFAULT_TRIGGER_CLASS = buildNxsButtonClass({ variant: "secondary", className: "nxs-menu-trigger" });

// itemRefs is indexed by entry position and holds nulls for unmounted rows, so the open effect and
// the arrow walker both route through this one predicate. A disabled entry stays in the walk on
// purpose: it carries aria-disabled rather than the native attribute, so it is still focusable and
// therefore still announced, which is the only way a screen reader user learns it exists.
const isItemFocusable = (node: HTMLElement | null): node is HTMLElement => Boolean(node);

const itemClass = (entry: ActionMenuEntry): string =>
  entry.isDanger ? "nxs-menu-item nxs-menu-item-danger" : "nxs-menu-item";

/**
 * Component: ActionMenu
 *
 * A trigger button and, while open, a `role="menu"` panel. An entry with an `href` renders an
 * anchor that opens in a new tab; any other entry, and a disabled linked entry, renders a button.
 */
const ActionMenu = ({ label, trigger, triggerClassName, entries, align = "end", className }: ActionMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  // HTMLElement, not HTMLButtonElement: an entry with an `href` renders an anchor.
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && event.target instanceof Node && !rootRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) itemRefs.current.find(isItemFocusable)?.focus();
  }, [isOpen]);

  const close = (shouldReturnFocus: boolean) => {
    setIsOpen(false);
    if (shouldReturnFocus) triggerRef.current?.focus();
  };

  const onMenuKeyDown = (event: KeyboardEvent) => {
    const items = itemRefs.current.filter(isItemFocusable);
    const current = items.findIndex((item) => item === document.activeElement);
    const targets: Record<string, HTMLElement | undefined> = {
      ArrowDown: items[(current + 1) % items.length],
      ArrowUp: items[(current - 1 + items.length) % items.length],
      Home: items[0],
      End: items[items.length - 1],
    };
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    // Tab leaves the menu, as the menu button pattern expects; the panel closes behind it so it
    // never sits open over content the reader has moved on to.
    if (event.key === "Tab") {
      setIsOpen(false);
      return;
    }
    const target = targets[event.key];
    if (!target) return;
    event.preventDefault();
    target.focus();
  };

  const setItemRef = (index: number) => (node: HTMLElement | null) => {
    itemRefs.current[index] = node;
  };

  const renderEntry = (entry: ActionMenuEntry, index: number) => {
    // A disabled linked entry falls through to the button branch: aria-disabled does not stop an
    // anchor from navigating, so an unavailable link renders as a button whose handler refuses.
    if (entry.href && !entry.isDisabled) {
      return (
        <a
          key={entry.id}
          role="menuitem"
          href={safeUrl(entry.href)}
          target="_blank"
          rel="noreferrer"
          ref={setItemRef(index)}
          className={itemClass(entry)}
          // No preventDefault: the browser's own navigation is the action.
          onClick={() => close(false)}
          onKeyDown={onMenuKeyDown}
        >
          {entry.label}
        </a>
      );
    }
    return (
      <button
        key={entry.id}
        type="button"
        role="menuitem"
        ref={setItemRef(index)}
        className={itemClass(entry)}
        // aria-disabled, not the native attribute: a natively disabled button cannot take focus,
        // and inside role="menu" a screen reader is in focus mode, so an entry it cannot focus is
        // an entry it never announces. The cost is that the handler has to refuse the click.
        aria-disabled={entry.isDisabled || undefined}
        title={entry.isDisabled ? entry.hint : undefined}
        onClick={() => {
          if (entry.isDisabled) return;
          // Close and hand focus back to the trigger BEFORE acting (the APG menu button pattern),
          // so a modal the entry opens records the trigger as its opener and returns focus there.
          close(true);
          entry.onSelect?.();
        }}
        onKeyDown={onMenuKeyDown}
      >
        {entry.label}
      </button>
    );
  };

  const panelClass = align === "start" ? "nxs-menu-panel nxs-menu-panel-start" : "nxs-menu-panel";

  return (
    <div className={className ? `nxs-menu ${className}` : "nxs-menu"} ref={rootRef}>
      <button
        type="button"
        ref={triggerRef}
        className={triggerClassName ?? DEFAULT_TRIGGER_CLASS}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? close(true) : setIsOpen(true))}
      >
        {trigger ?? (
          <span aria-hidden="true" className="nxs-menu-glyph">
            ⋯
          </span>
        )}
      </button>
      {isOpen && (
        <div className={panelClass} role="menu" aria-label={label}>
          {entries.map(renderEntry)}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;
