// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/rank-list/README.md
// The ranked rows primitive, ported from nexious-client's features/admin/components/analytics/
// AnalyticsRankList.tsx (2026-11 item 337, Phase 5). Top pages, top posts and best sellers share
// one shape: a label, an optional second line and a right aligned figure. Each value arrives
// formatted, because the unit (money, count, percent) is the caller's to know.
import type { RankListProps } from "nxs-card";

/**
 * Component: RankList
 *
 * A list of ranked rows, or the caller's one line empty label when there are none. Long labels
 * end in an ellipsis instead of pushing the figure out of the row.
 */
const RankList = ({ rows, emptyLabel, ariaLabel, className }: RankListProps) => {
  if (rows.length === 0) {
    return <p className={className ? `nxs-rank-list-empty ${className}` : "nxs-rank-list-empty"}>{emptyLabel}</p>;
  }
  return (
    <ul className={className ? `nxs-rank-list ${className}` : "nxs-rank-list"} aria-label={ariaLabel}>
      {rows.map((row) => (
        <li className="nxs-rank-list-row" key={row.id}>
          <span className="nxs-rank-list-text">
            <span className="nxs-rank-list-name">{row.label}</span>
            {row.meta ? <span className="nxs-rank-list-meta">{row.meta}</span> : null}
          </span>
          <span className="nxs-rank-list-value">{row.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default RankList;
