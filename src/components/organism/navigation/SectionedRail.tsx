// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/sectioned-rail/README.md
// The sectioned side rail, ported from nexious-client's OwnerRail (features/admin/components/
// dashboard/OwnerRail.tsx) and the account rail beside it (2026-11 item 337, Phase 4). It renders
// exactly the sections it is given; deciding which items exist, their order and their labels stays
// with the caller, as buildOwnerRailSections does in the client.
//
// DOM order is load bearing. Every section renders into ONE list element as a Fragment, with its
// overline as a plain paragraph between the items. A roving tablist moves focus by indexing the
// [role="tab"] descendants of that one element, so a wrapper per section would trap the arrow keys
// inside it, and one tablist per section would mean one tab stop per section instead of one.
import { Fragment } from "react";
import type { KeyboardEvent } from "react";
import type { NavItem, SectionedRailProps } from "nxs-navigation";
import { safeUrl } from "@nxs-utils/data/safeUrl";
import { handleRovingKeyDown, resolveTabStop } from "@nxs-utils/navigation/rovingTabs";
import { renderNavPing } from "@nxs-utils/navigation/navPing";

const ITEM_CLASS = "nxs-rail-item";
const ACTIVE_ITEM_CLASS = "nxs-rail-item-active";

/**
 * Component: SectionedRail
 *
 * `semantics="tablist"` (the default) renders a vertical tablist whose tabs control `panelId`,
 * with a roving tab stop from `focusId`, then `activeId`, then the first item. `semantics="nav"`
 * renders a nav landmark of links (`linkComponent`, or a plain `a`) with `aria-current="page"` on
 * the current one, every item its own tab stop. Pings render through `renderPing`, the footer
 * under the last section.
 */
const SectionedRail = <TPing,>(props: SectionedRailProps<TPing>) => {
  const { sections, semantics = "tablist", activeId, focusId, ariaLabel, onSelect, onKeyDown } = props;
  const { itemElementId, panelId, linkComponent: LinkComponent, footer, className, pings, renderPing } = props;
  const visibleSections = sections.filter((section) => section.items.length > 0);
  const ids = visibleSections.flatMap((section) => section.items.map((item) => item.id));
  const tabStop = resolveTabStop(ids, focusId, activeId);
  const isTablist = semantics === "tablist";

  const selectItem = (item: NavItem) => {
    item.onSelect?.();
    onSelect?.(item.id);
  };
  const selectById = (id: string) => {
    const item = visibleSections.flatMap((section) => section.items).find((candidate) => candidate.id === id);
    if (item) selectItem(item);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLElement>, item: NavItem) => {
    onKeyDown?.(event, item);
    if (event.defaultPrevented) return;
    handleRovingKeyDown(event, ids, selectById);
  };

  const renderContent = (item: NavItem) => (
    <>
      {item.icon ? (
        <span className="nxs-rail-icon" aria-hidden="true">
          {item.icon}
        </span>
      ) : null}
      <span className="nxs-rail-label">{item.label}</span>
      {renderNavPing({ pings, renderPing }, item)}
    </>
  );

  const renderTab = (item: NavItem) => {
    const isActive = activeId === item.id;
    return (
      <button
        key={item.id}
        type="button"
        role="tab"
        id={itemElementId?.(item.id)}
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={tabStop === item.id ? 0 : -1}
        className={isActive ? `${ITEM_CLASS} ${ACTIVE_ITEM_CLASS}` : ITEM_CLASS}
        onKeyDown={(event) => handleTabKeyDown(event, item)}
        onClick={() => selectItem(item)}
      >
        {renderContent(item)}
      </button>
    );
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = activeId === item.id;
    const shared = {
      id: itemElementId?.(item.id),
      className: isActive ? `${ITEM_CLASS} ${ACTIVE_ITEM_CLASS}` : ITEM_CLASS,
      "aria-current": isActive ? ("page" as const) : undefined,
      onClick: () => selectItem(item),
      onKeyDown: onKeyDown ? (event: KeyboardEvent<HTMLElement>) => onKeyDown(event, item) : undefined,
    };
    // Spreading `shared` keeps the id, class, current state and handlers identical on all three
    // branches; listing them per element is how one branch ends up without aria-current.
    /* eslint-disable react/jsx-props-no-spreading */
    if (item.href && LinkComponent) {
      return (
        <LinkComponent key={item.id} to={safeUrl(item.href)} {...shared}>
          {renderContent(item)}
        </LinkComponent>
      );
    }
    if (item.href) {
      return (
        <a key={item.id} href={safeUrl(item.href)} {...shared}>
          {renderContent(item)}
        </a>
      );
    }
    return (
      <button key={item.id} type="button" {...shared}>
        {renderContent(item)}
      </button>
    );
    /* eslint-enable react/jsx-props-no-spreading */
  };

  const listChildren = visibleSections.map((section) => (
    <Fragment key={section.id}>
      {section.label ? <p className="nxs-rail-overline">{section.label}</p> : null}
      {section.items.map(isTablist ? renderTab : renderNavItem)}
    </Fragment>
  ));

  return (
    <div className={className ? `nxs-rail ${className}` : "nxs-rail"}>
      {isTablist ? (
        <div className="nxs-rail-list" role="tablist" aria-orientation="vertical" aria-label={ariaLabel}>
          {listChildren}
        </div>
      ) : (
        <nav className="nxs-rail-list" aria-label={ariaLabel}>
          {listChildren}
        </nav>
      )}
      {footer ? <div className="nxs-rail-footer">{footer}</div> : null}
    </div>
  );
};

export default SectionedRail;
