// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/pill-tab-strip/README.md
// The horizontal pill tablist, ported from nexious-client's components/menu/PillTabStrip.tsx
// (2026-11 item 337, Phase 4). Tabs here SWAP PANELS in place; a strip of links that change the
// route is PillNav, which shares the pill look and none of the tab semantics.
import type { PillTabStripProps } from "nxs-navigation";
import { handleRovingKeyDown, resolveTabStop } from "@nxs-utils/navigation/rovingTabs";

/**
 * Component: PillTabStrip
 *
 * A WAI-ARIA tablist of pills with a roving tab stop on the active tab and automatic activation:
 * the arrow keys (either axis), Home and End move focus and selection together. The caller owns
 * the ids, the translated labels and the panel each tab controls.
 */
const PillTabStrip = <T extends string>(props: PillTabStripProps<T>) => {
  const { tabs, active, onSelect, ariaLabel, labelFor, tabId, panelId, className } = props;
  const tabStop = resolveTabStop(tabs, active);

  return (
    <div className={className ? `nxs-pill-tabs ${className}` : "nxs-pill-tabs"} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          role="tab"
          id={tabId(tab)}
          aria-selected={active === tab}
          aria-controls={panelId(tab)}
          tabIndex={tabStop === tab ? 0 : -1}
          className={active === tab ? "nxs-pill-tab nxs-pill-tab-active" : "nxs-pill-tab"}
          onKeyDown={(event) => handleRovingKeyDown(event, tabs, onSelect)}
          onClick={() => onSelect(tab)}
        >
          {labelFor(tab)}
        </button>
      ))}
    </div>
  );
};

export default PillTabStrip;
