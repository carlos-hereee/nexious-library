// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/select-card/README.md
// Promoted from nexious-client's `.pages-panel-grid` recipe, which five client surfaces had come
// to share as a bare class. A component gives the grid one home, and its nav form a landmark.
import type { CardGridProps } from "nxs-card";

/**
 * Component - CardGrid
 *
 * The grid SelectCards sit in. auto-fill plus minmax rather than a column count, so the grid
 * follows the number of cards and collapses to one column on its own with no breakpoint.
 */
const CardGrid: React.FC<CardGridProps> = (props) => {
  const { as: Root = "div", ariaLabel, className, classNames, children } = props;
  const base = classNames?.root ?? "nxs-card-grid";

  return (
    <Root className={className ? `${base} ${className}` : base} aria-label={ariaLabel}>
      {children}
    </Root>
  );
};

export default CardGrid;
