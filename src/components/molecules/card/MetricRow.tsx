// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/metric-row/README.md
// The band of stat tiles, ported from nexious-client's features/dashboard/components/MetricRow.tsx
// and its cu-metric-row and cu-stat primitives (2026-11 item 337, Phase 5). The client tile read a
// dashboard Metric contract, i18n keys and its own money formatter; here each entry arrives already
// formatted and translated, so the library knows no currency, locale or data source.
import type { MetricRowEntry, MetricRowProps } from "nxs-card";

const DELTA_TONE_CLASS: Record<NonNullable<MetricRowEntry["trend"]>, string> = {
  up: "nxs-stat-delta nxs-stat-delta-up",
  down: "nxs-stat-delta nxs-stat-delta-down",
  flat: "nxs-stat-delta",
};

/** One tile: the label, then the value or its empty text, the delta and the hint. */
const MetricTile = ({ entry }: { entry: MetricRowEntry }) => {
  const { id, label, value, delta, trend, trendLabel, hint, emptyText } = entry;
  const hasValue = value !== undefined && value !== null;
  return (
    <div className="nxs-stat" data-metric={id}>
      <p className="nxs-stat-label">{label}</p>
      {hasValue ? <p className="nxs-stat-value">{value}</p> : null}
      {!hasValue && emptyText ? <p className="nxs-stat-hint nxs-stat-empty">{emptyText}</p> : null}
      {hasValue && delta ? (
        <span className={DELTA_TONE_CLASS[trend ?? "flat"]}>
          {/* The tone is color only, so its meaning is spoken before the number. */}
          {trendLabel ? <span className="sr-only">{`${trendLabel} `}</span> : null}
          {delta}
        </span>
      ) : null}
      {hasValue && hint ? <p className="nxs-stat-hint">{hint}</p> : null}
    </div>
  );
};

/**
 * Component: MetricRow
 *
 * A grid that fits as many tiles as the width allows (two on a phone), or one scrolling line with
 * `isScrollable`. A `trailing` node sits in the same band so a status tile aligns with the numbers.
 * Named as a group only when the caller passes `ariaLabel`.
 */
const MetricRow = ({ entries, trailing, isScrollable, ariaLabel, className }: MetricRowProps) => {
  const rootClass = ["nxs-metric-row", isScrollable ? "nxs-metric-row-scroll" : "", className ?? ""]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={rootClass} role={ariaLabel ? "group" : undefined} aria-label={ariaLabel}>
      {entries.map((entry) => (
        <MetricTile key={entry.id} entry={entry} />
      ))}
      {trailing}
    </div>
  );
};

export default MetricRow;
