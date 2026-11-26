// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/mobile-tab-bar/README.md
// The bottom tab bar a compact viewport renders instead of a rail, ported from nexious-client's
// components/menu/MobileTabBar.tsx (2026-11 item 337, Phase 4). Which tabs sit in the bar and which
// go to the sheet stays the caller's decision (the client's splitMobileNav), so the bar and the
// sheet read one split and cannot disagree about where a tab lives.
//
// More sits OUTSIDE the tablist element on purpose: the roving keys index the [role="tab"]
// descendants of the tablist, so a More button inside it would be landed on by the arrows as if it
// were a tab. The tablist is display: contents so its tabs and More share the bar's grid.
import { useLayoutEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import type { MobileTabBarProps, NavItem } from "nxs-navigation";
import { handleRovingKeyDown, resolveTabStop } from "@nxs-utils/navigation/rovingTabs";
import { renderNavPing } from "@nxs-utils/navigation/navPing";

// The client publishes --cu-tabbar-height and passes that name in; the library default carries
// its own prefix so a standalone consumer never collides with a client token.
const DEFAULT_HEIGHT_PROPERTY = "--nxs-tabbar-height";

/**
 * Component: MobileTabBar
 *
 * A nav landmark holding one tablist of icon and label tabs with a roving tab stop (`focusId`,
 * then `activeId`, then the first tab) and, when `more` is given, a More button that toggles the
 * sheet. While mounted it publishes its height on the document root under `heightProperty`, so
 * fixed elements outside the bar can clear it, and removes the property on unmount.
 */
const MobileTabBar = <TPing,>(props: MobileTabBarProps<TPing>) => {
  const { tabs, activeId, focusId, onSelect, onKeyDown, itemElementId, panelId, more, ariaLabel } = props;
  const { heightProperty = DEFAULT_HEIGHT_PROPERTY, className, pings, renderPing } = props;
  const rootRef = useRef<HTMLElement | null>(null);
  const ids = tabs.map((tab) => tab.id);
  const tabStop = resolveTabStop(ids, focusId, activeId);

  useLayoutEffect(() => {
    const node = rootRef.current;
    const root = document.documentElement;
    if (!node) return undefined;
    const publish = () => root.style.setProperty(heightProperty, `${node.getBoundingClientRect().height}px`);
    publish();
    // The height moves with the font size and the safe area (a rotation), so it is re-measured on
    // resize rather than assumed.
    window.addEventListener("resize", publish);
    return () => {
      window.removeEventListener("resize", publish);
      root.style.removeProperty(heightProperty);
    };
  }, [heightProperty]);

  const selectItem = (item: NavItem) => {
    item.onSelect?.();
    onSelect?.(item.id);
  };
  const selectById = (id: string) => {
    const item = tabs.find((candidate) => candidate.id === id);
    if (item) selectItem(item);
  };
  const handleTabKeyDown = (event: KeyboardEvent<HTMLElement>, item: NavItem) => {
    onKeyDown?.(event, item);
    if (event.defaultPrevented) return;
    handleRovingKeyDown(event, ids, selectById);
  };

  return (
    <nav ref={rootRef} className={className ? `nxs-tabbar ${className}` : "nxs-tabbar"} aria-label={ariaLabel}>
      <div role="tablist" aria-label={ariaLabel} className="nxs-tabbar-tabs">
        {tabs.map((tab) => {
          const isActive = activeId === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={itemElementId?.(tab.id)}
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={tabStop === tab.id ? 0 : -1}
              className={isActive ? "nxs-tabbar-item nxs-tabbar-item-active" : "nxs-tabbar-item"}
              onKeyDown={(event) => handleTabKeyDown(event, tab)}
              onClick={() => selectItem(tab)}
            >
              <span className="nxs-tabbar-icon" aria-hidden="true">
                {tab.icon}
              </span>
              <span className="nxs-tabbar-label">{tab.label}</span>
              {renderNavPing({ pings, renderPing }, tab)}
            </button>
          );
        })}
      </div>
      {more ? (
        <button
          type="button"
          className={
            more.isSelected
              ? "nxs-tabbar-item nxs-tabbar-more nxs-tabbar-item-active"
              : "nxs-tabbar-item nxs-tabbar-more"
          }
          aria-haspopup="dialog"
          aria-expanded={more.isOpen}
          aria-controls={more.sheetId}
          onClick={more.onToggle}
        >
          <span className="nxs-tabbar-icon" aria-hidden="true">
            {more.icon}
          </span>
          <span className="nxs-tabbar-label">{more.label}</span>
          {/* ONE summary badge for every hidden item that needs attention, with a hidden phrase
              saying the work is inside the sheet rather than on this button. */}
          {more.ping ? (
            <>
              {more.ping}
              {more.pingLabel ? <span className="sr-only">{more.pingLabel}</span> : null}
            </>
          ) : null}
        </button>
      ) : null}
    </nav>
  );
};

export default MobileTabBar;
