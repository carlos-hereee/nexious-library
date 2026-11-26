// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/pill-nav/README.md
// A strip of pill LINKS, ported from nexious-client's features/plugin-modules/components/
// PluginTabNav.tsx (2026-11 item 337, Phase 4, owner decision A12). It is navigation, not a
// tablist: each pill changes the route, so it carries aria-current="page" and every pill is its
// own tab stop. Panel swaps belong to PillTabStrip. Which items show (the client's owner only and
// embedded filters, its minimum entry count) stays with the caller.
import type { PillNavProps } from "nxs-navigation";
import { safeUrl } from "@nxs-utils/data/safeUrl";

/**
 * Component: PillNav
 *
 * A nav landmark of pills. The current item is decided once by the caller (`activeId`) and drives
 * both the active class and `aria-current`, so the color and the announcement cannot disagree.
 * Items render through `linkComponent` (which receives `to`) or a plain `a`.
 */
const PillNav = ({ items, activeId, ariaLabel, linkComponent: LinkComponent, className }: PillNavProps) => (
  <nav className={className ? `nxs-pill-tabs nxs-pill-nav ${className}` : "nxs-pill-tabs nxs-pill-nav"} aria-label={ariaLabel}>
    {items.map((item) => {
      if (!item.href) return null;
      const isActive = activeId === item.id;
      const shared = {
        className: isActive ? "nxs-pill-tab nxs-pill-tab-active" : "nxs-pill-tab",
        "aria-current": isActive ? ("page" as const) : undefined,
        onClick: item.onSelect,
      };
      const content = (
        <>
          {item.icon ? (
            <span className="nxs-pill-tab-icon" aria-hidden="true">
              {item.icon}
            </span>
          ) : null}
          <span>{item.label}</span>
        </>
      );
      // Spreading `shared` keeps the class and current state identical on both branches.
      /* eslint-disable react/jsx-props-no-spreading */
      return LinkComponent ? (
        <LinkComponent key={item.id} to={safeUrl(item.href)} {...shared}>
          {content}
        </LinkComponent>
      ) : (
        <a key={item.id} href={safeUrl(item.href)} {...shared}>
          {content}
        </a>
      );
      /* eslint-enable react/jsx-props-no-spreading */
    })}
  </nav>
);

export default PillNav;
