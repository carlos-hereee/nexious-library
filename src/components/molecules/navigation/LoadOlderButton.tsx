// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/load-older-button/README.md
// The one "load older" control for a paged transcript or list, ported from nexious-client's
// components/list/LoadOlderButton.tsx (2026-11 item 337, Phase 5). The fetch, the cursor, the
// merge and any error copy stay with the caller; this renders the button and its loading state.
import type { LoadOlderButtonProps } from "nxs-navigation";
import { buildNxsButtonClass } from "../../../@types/Variant";

const LOAD_OLDER_BUTTON_CLASS = buildNxsButtonClass({ variant: "secondary", className: "nxs-load-older-button" });

/**
 * Component: LoadOlderButton
 *
 * Renders nothing once there is no more history, so a short thread never shows a dead control.
 * While a page loads the button is disabled and `aria-busy`, and its label switches to
 * `loadingLabel`, which a screen reader reads when focus is still on it.
 */
const LoadOlderButton = ({ hasMore, isLoading, onLoad, label, loadingLabel, className }: LoadOlderButtonProps) => {
  if (!hasMore) return null;
  return (
    <div className={className ? `nxs-load-older ${className}` : "nxs-load-older"}>
      <button
        type="button"
        className={LOAD_OLDER_BUTTON_CLASS}
        disabled={isLoading}
        aria-busy={isLoading || undefined}
        onClick={() => onLoad()}
      >
        {isLoading ? loadingLabel : label}
      </button>
    </div>
  );
};

export default LoadOlderButton;
