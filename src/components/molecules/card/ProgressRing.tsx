// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/progress-ring/README.md
// A percent as a circular arc, lifted from nexious-client's features/plugin-modules/study/workspace/
// StudyProgressRing.tsx and its study-ws-ring rules (2026-11 item 387, Phase 1), so Study and Job
// Hunt draw one ring. It formats no number and knows no locale: the label and any valueText arrive
// translated. It draws no frame and no interactive control; the caller places it.
import type { ProgressRingProps } from "nxs-card";

// The geometry lives in a 36 unit viewBox: radius 15.5 with a 4 unit stroke keeps the stroke's outer
// edge at 17.5, inside the box, so the round caps never clip. The CSS sizes the svg, never these.
const VIEWBOX_SIZE = 36;
const CENTER = VIEWBOX_SIZE / 2;
const RADIUS = 15.5;
const STROKE_WIDTH = 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Clamps a percent to 0 to 100 and rounds it; a non finite value reads as 0 rather than NaN. */
export const boundPercent = (value: number): number => {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
};

/** The dasharray that draws `percent` of the circle: the arc length, then the remaining gap. */
export const ringDashArray = (percent: number): string => {
  const arc = (percent / 100) * CIRCUMFERENCE;
  return `${arc} ${CIRCUMFERENCE - arc}`;
};

/**
 * Component: ProgressRing
 *
 * One `role="img"` named "label: value", so a screen reader hears what is measured and how far it
 * is in one stop. The arc uses stroke-dasharray ATTRIBUTES (no inline style) and starts at 12
 * o'clock. The value is HTML outside the viewBox, never svg `<text>`, so it stays in true CSS
 * pixels at every size: beside the ring for small and large, stacked over it for hero, where the
 * label (or the caller's children) shows as a caption. Both are aria-hidden because the image
 * name already speaks them, and the arc is never the only carrier of the value.
 */
const ProgressRing = ({ value, label, size = "small", valueText, children, className, classNames }: ProgressRingProps) => {
  const bounded = boundPercent(value);
  const printedValue = valueText ?? `${bounded}%`;
  const isHero = size === "hero";
  const rootClass = [classNames?.root ?? "nxs-progress-ring", `nxs-progress-ring-${size}`, className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={rootClass} role="img" aria-label={`${label}: ${printedValue}`}>
      <svg
        className="nxs-progress-ring-svg"
        viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
        aria-hidden="true"
        focusable="false"
      >
        <circle className="nxs-progress-ring-track" cx={CENTER} cy={CENTER} r={RADIUS} fill="none" strokeWidth={STROKE_WIDTH} />
        <circle
          className="nxs-progress-ring-arc"
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={ringDashArray(bounded)}
          // An svg circle's stroke starts at 3 o'clock; a quarter turn back starts it at 12.
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
      </svg>
      <span className="nxs-progress-ring-value" aria-hidden="true">
        {printedValue}
        {isHero ? <span className="nxs-progress-ring-caption">{children ?? label}</span> : null}
      </span>
    </span>
  );
};

export default ProgressRing;
