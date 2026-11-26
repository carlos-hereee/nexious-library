// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/bar-chart/README.md
// The per day bar chart, ported from nexious-client's features/admin/components/analytics/
// AnalyticsBarChart.tsx (2026-11 item 337, Phase 5). The client formatted its ISO dates with the
// i18n locale; here each point arrives with its short label already localized, so the library
// carries no date or locale logic.
//
// ── Why the SVG draws bars only ──
// The library resets `svg { height: auto }`, so the chart's height comes from the viewBox ratio.
// The same scale applies to font size inside a viewBox (a CSS px there is a user unit), so an svg
// <text> label would render at a third of its size in a narrow tile. Every label is HTML in the
// sibling axis row instead, which stays in true CSS px at every width.
import type { BarChartPoint, BarChartProps } from "nxs-card";

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 300;
// Headroom so the tallest bar is not flush with the top edge.
const PAD_TOP = 10;
const MAX_BAR_WIDTH = 72;
const BAR_SLOT_RATIO = 0.55;
// A low but nonzero value still paints a visible sliver.
const MIN_BAR_HEIGHT = 3;
const BAR_RADIUS = 5;
// Each tick is a flex 1 column; past ten bars a tick in the narrowest tile cannot hold a "12/31"
// label, so the axis collapses to the first and last label and the text equivalent takes over.
const DEFAULT_MAX_TICK_LABELS = 10;

const plainNumber = (value: number): string => String(value);

/**
 * Component: BarChart
 *
 * Bars as an image named by `ariaLabel`, then either one tick per bar (value and label as text) or,
 * past `maxTickLabels`, a first and last label plus a visually hidden table of every value, because
 * role="img" makes the bars' titles presentational and a screen reader would get no values at all.
 */
const BarChart = (props: BarChartProps) => {
  const { points, ariaLabel, formatValue = plainNumber, formatTick = plainNumber, formatTooltip } = props;
  const { maxTickLabels = DEFAULT_MAX_TICK_LABELS, className } = props;
  const tooltip = formatTooltip ?? ((point: BarChartPoint) => `${point.id}: ${formatValue(point.value)}`);
  const maxValue = points.reduce((max, point) => Math.max(max, point.value), 0) || 1;
  // One less than the height keeps the 1px baseline inside the viewBox.
  const baselineY = VIEW_HEIGHT - 1;
  const plotHeight = baselineY - PAD_TOP;
  const slotWidth = points.length > 0 ? VIEW_WIDTH / points.length : VIEW_WIDTH;
  const barWidth = Math.min(slotWidth * BAR_SLOT_RATIO, MAX_BAR_WIDTH);
  const showPerBarTicks = points.length <= maxTickLabels;
  const firstPoint = points[0];
  const lastPoint = points[points.length - 1];

  return (
    <div className={className ? `nxs-bar-chart ${className}` : "nxs-bar-chart"}>
      <svg className="nxs-bar-chart-plot" viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} role="img" aria-label={ariaLabel}>
        <line className="nxs-bar-chart-baseline" x1={0} y1={baselineY} x2={VIEW_WIDTH} y2={baselineY} />
        {points.map((point, index) => {
          const barHeight = Math.max(Math.round((point.value / maxValue) * plotHeight), MIN_BAR_HEIGHT);
          const x = index * slotWidth + slotWidth / 2 - barWidth / 2;
          return (
            <rect className="nxs-bar-chart-bar" key={point.id} x={x} y={baselineY - barHeight} width={barWidth} height={barHeight} rx={BAR_RADIUS}>
              <title>{tooltip(point)}</title>
            </rect>
          );
        })}
      </svg>
      {/* The sr-only box is a wrapper, never the table itself: a table cannot be sized below its
          rows, so a clipped full height table would stretch the page under the chart. */}
      {!showPerBarTicks && points.length > 0 ? (
        <div className="sr-only">
          <table>
            <caption>{ariaLabel}</caption>
            <tbody>
              {points.map((point) => (
                <tr key={point.id}>
                  <th scope="row">{point.label}</th>
                  <td>{formatValue(point.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {showPerBarTicks ? (
        <ul className="nxs-bar-chart-axis">
          {points.map((point) => (
            <li className="nxs-bar-chart-tick" key={point.id}>
              <span className="nxs-bar-chart-tick-value">{formatTick(point.value)}</span>
              <span className="nxs-bar-chart-tick-label">{point.label}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {!showPerBarTicks && firstPoint && lastPoint ? (
        <div className="nxs-bar-chart-range">
          <span className="nxs-bar-chart-tick-label">{firstPoint.label}</span>
          <span className="nxs-bar-chart-tick-label">{lastPoint.label}</span>
        </div>
      ) : null}
    </div>
  );
};

export default BarChart;
