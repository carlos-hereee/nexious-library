// Ported from nexious-client's features/user/components/orders/OrdersSkeleton.tsx (2026-11 item
// 337, Phase 5). The client drew five fixed order columns; here the columns are a prop, so any
// list whose rows have a known shape (a number, texts, a pill, a total) can reserve it. It sits
// beside Skeleton rather than inside it because the two own announcement differently: Skeleton is
// its own status region, this one is aria-hidden next to the caller's.
import type { CSSProperties } from "react";
import type { SkeletonRowsColumn, SkeletonRowsProps } from "nxs-errors";

// Three rows is enough to read as a list without reserving a screenful; the client's orders list
// passes its own count.
const DEFAULT_ROW_COUNT = 3;
const DEFAULT_COLUMN: SkeletonRowsColumn = { width: "1fr", shape: "bar" };

// The tracks ride a custom property so the stylesheet can fold them to two columns on a phone; an
// inline grid-template-columns would beat any media query.
type SkeletonRowsStyle = CSSProperties & { "--nxs-skeleton-columns": string };

/**
 * Component: SkeletonRows
 *
 * Placeholder rows shaped like the real ones, so the list does not visibly reflow when the data
 * lands.
 *
 * Accessibility: the whole block is aria-hidden. Five rows of empty bars read aloud as nothing
 * useful, so the caller keeps one sibling live region that says the list is loading and then what
 * arrived ("Showing 12 orders"). Nothing here is focusable.
 */
const SkeletonRows = ({ columns, count, className }: SkeletonRowsProps) => {
  const drawnColumns = columns.length > 0 ? columns : [DEFAULT_COLUMN];
  const rowCount = Math.max(1, Math.floor(count ?? DEFAULT_ROW_COUNT));
  const style: SkeletonRowsStyle = {
    "--nxs-skeleton-columns": drawnColumns.map((column) => column.width || "1fr").join(" "),
  };
  const wrapperClass = className ? `nxs-skeleton-rows ${className}` : "nxs-skeleton-rows";

  return (
    <div className={wrapperClass} style={style} aria-hidden="true">
      {Array.from({ length: rowCount }, (_, rowIndex) => (
        // Index keys are safe: the rows and cells are identical, stateless and never reordered.
        <div className="nxs-skeleton-row" key={`row-${rowIndex}`}>
          {drawnColumns.map((column, columnIndex) => (
            <span
              className={`skeleton-bar nxs-skeleton-cell nxs-skeleton-cell-${column.shape ?? "bar"}`}
              // A column has no identity beyond its position (two "1fr" bars are interchangeable).
              // eslint-disable-next-line react/no-array-index-key
              key={`cell-${columnIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonRows;
