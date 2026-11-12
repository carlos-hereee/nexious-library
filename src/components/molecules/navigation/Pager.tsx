// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/pager/README.md
// The previous and next pager, ported from nexious-client's components/list/Pager.tsx (2026-11
// item 337, Phase 5). It renders the controls and the status only; which page is shown, and the
// fetch behind it, stay with the caller. The client read its labels from i18n; here every string
// arrives as a prop, and the status sentence through a formatter so its word order can localize.
import type { PagerProps } from "nxs-navigation";
import { buildNxsButtonClass } from "../../../@types/Variant";

const PAGER_BUTTON_CLASS = buildNxsButtonClass({ variant: "secondary", className: "nxs-pager-button" });

/**
 * Component: Pager
 *
 * A named nav landmark holding Previous, a polite page status and Next. Renders nothing while there
 * is only one page, so a short list never shows dead controls. The ends disable natively, because
 * a pager at its first page has nothing for Previous to announce.
 */
const Pager = ({ page, totalPages, onPage, ariaLabel, previousLabel, nextLabel, formatStatus, className }: PagerProps) => {
  if (totalPages <= 1) return null;
  return (
    <nav className={className ? `nxs-pager ${className}` : "nxs-pager"} aria-label={ariaLabel}>
      <button type="button" className={PAGER_BUTTON_CLASS} disabled={page <= 1} onClick={() => onPage(page - 1)}>
        {previousLabel}
      </button>
      {/* A polite live region is what tells a screen reader the page changed after a press. */}
      <span className="nxs-pager-status" aria-live="polite">
        {formatStatus(page, totalPages)}
      </span>
      <button type="button" className={PAGER_BUTTON_CLASS} disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        {nextLabel}
      </button>
    </nav>
  );
};

export default Pager;
