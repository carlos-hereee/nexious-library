// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/step-progress/README.md
// Promoted from nexious-client's src/components/form/StepProgress.tsx. Three client forms share
// it, so it lives here now as the one stepper any consumer's paginated form can use.
import type { StepProgressProps } from "nxs-navigation";

const joinClass = (base: string, extra?: string): string => (extra ? `${base} ${extra}` : base);

/**
 * Component - StepProgress
 *
 * The numbered step list, a native <progress> bar and the "Step X of N" line, plus a polite live
 * region that announces the step on every change.
 *
 * What stays with the form, deliberately: the step heading (the form owns it because focus moves
 * to it on every step change and only the form knows when that is), the per step validation, and
 * the Back / Continue row, since each form words those differently.
 *
 * The bar is a <progress> element rather than a div with an inline width, so the fill needs no
 * style attribute; the vendor pseudo elements in _step-progress.scss paint it.
 */
const StepProgress: React.FC<StepProgressProps> = (props) => {
  const { steps, current, labelFor, progressLabel, stepOfText, className, classNames } = props;
  const total = steps.length;
  const currentLabel = labelFor(steps[current] ?? "");

  return (
    <div className={joinClass(classNames?.root ?? "nxs-step-progress", className)}>
      <ol className="nxs-step-progress-steps" aria-label={progressLabel}>
        {steps.map((id, index) => (
          <li
            key={id}
            className={`nxs-step-progress-step${index === current ? " nxs-step-progress-step-current" : ""}${
              index < current ? " nxs-step-progress-step-done" : ""
            }`}
            aria-current={index === current ? "step" : undefined}
          >
            <span className="nxs-step-progress-step-num" aria-hidden>
              {index + 1}
            </span>
            <span className="nxs-step-progress-step-name">{labelFor(id)}</span>
          </li>
        ))}
      </ol>
      <progress
        className="nxs-step-progress-bar"
        value={current + 1}
        max={total}
        aria-label={progressLabel}
        aria-valuetext={stepOfText}
      />
      <p className="nxs-step-progress-stepof">{stepOfText}</p>
      {/* Politely announce the step for screen readers on every change. */}
      <p className="sr-only" aria-live="polite">
        {stepOfText}: {currentLabel}
      </p>
    </div>
  );
};

export default StepProgress;
