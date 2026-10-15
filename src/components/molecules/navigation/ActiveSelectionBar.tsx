// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/active-selection-bar/README.md
// Promoted from nexious-client's StudyDeckBar, the "Studying: <deck> / Change" bar, which is the
// shape any surface with one active item and a way back to the chooser needs.
import { forwardRef } from "react";
import type { ActiveSelectionBarProps } from "nxs-navigation";

/**
 * Component - ActiveSelectionBar
 *
 * The ref reaches the root, because a caller may need the bar's place in the page: the client's
 * study surface walks up from it to find the region it puts into fullscreen.
 */
const ActiveSelectionBar = forwardRef<HTMLDivElement, ActiveSelectionBarProps>((props, ref) => {
  const { label, value, changeLabel, onChange, changeAriaLabel, actions, className, classNames } = props;
  const root = classNames?.root ?? "nxs-active-selection-bar";

  return (
    <div ref={ref} className={className ? `${root} ${className}` : root}>
      <span className={classNames?.label ?? "nxs-active-selection-bar-label"}>
        {label}: <strong>{value}</strong>
      </span>
      <div className={classNames?.actions ?? "nxs-active-selection-bar-actions"}>
        {actions}
        <button
          type="button"
          className={classNames?.change ?? "nxs-active-selection-bar-change"}
          onClick={onChange}
          aria-label={changeAriaLabel}
        >
          {changeLabel}
        </button>
      </div>
    </div>
  );
});

ActiveSelectionBar.displayName = "ActiveSelectionBar";

export default ActiveSelectionBar;
