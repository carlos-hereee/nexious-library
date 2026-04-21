import { Icon } from "@nxs-atoms";
import { makeStrReadable } from "@nxs-utils/data/text";
import type { FormNavigationProps } from "nxs-navigation";

/**
 * FormNavigation
 *
 * A step indicator + stepper for multi page forms.
 *
 * UX rules:
 *  - Rendered as <ol> because the step order is meaningful.
 *  - The current step is a <span> with aria-current="step". It is not a
 *    button because clicking the page you are already on is a dead action,
 *    and a disabled button drops out of the tab order, hiding context from
 *    screen reader users.
 *  - Other steps are <button> elements with descriptive aria-labels so a
 *    screen reader user hears "Go to step 3: Contact info" instead of just
 *    "Contact info button".
 *  - Completed steps (idx < pageNumber) get a visual "done" treatment via
 *    .is-complete class, matching common wizard conventions.
 *  - The count line is wrapped in aria-live="polite" so changes get
 *    announced as the user paginates.
 *  - The mobile dot/uncheck indicators get parallel semantics so a keyboard
 *    or screen reader user on mobile gets the same info.
 */
const FormNavigation: React.FC<FormNavigationProps> = (props) => {
  const { formOrder, pageNumber, onClick, heading } = props;

  if (!formOrder) return <div />;

  const renderStep = (name: string, idx: number, variant: "full" | "mini") => {
    const formName = makeStrReadable(name);
    const isCurrent = idx === pageNumber;
    const isComplete = idx < pageNumber;
    const state = isCurrent ? "current" : isComplete ? "complete" : "upcoming";

    const liClass = [
      variant === "full" ? "form-step" : "form-step form-step-mini",
      isCurrent ? "is-current" : "",
      isComplete ? "is-complete" : "",
    ]
      .filter(Boolean)
      .join(" ");

    // Current step: not interactive
    if (isCurrent) {
      return (
        <li key={formName} className={liClass} aria-current="step">
          {variant === "mini" ? (
            <span className="form-step-marker" aria-hidden="true">
              <Icon icon="dot" name="current" />
            </span>
          ) : (
            <span className="form-step-label">
              <span className="form-step-index" aria-hidden="true">
                {idx + 1}
              </span>
              <span className="form-step-name">{formName}</span>
            </span>
          )}
          <span className="sr-only">Current step: {formName}</span>
        </li>
      );
    }

    // Other steps: interactive
    const ariaLabel = `${isComplete ? "Go back to completed step" : "Go to step"} ${idx + 1}: ${formName}`;
    return (
      <li key={formName} className={liClass} data-state={state}>
        <button
          type="button"
          className={variant === "mini" ? "form-step-btn form-step-btn-mini" : "form-step-btn"}
          title={formName}
          aria-label={ariaLabel}
          onClick={() => onClick(idx)}
        >
          {variant === "mini" ? (
            <Icon icon={isComplete ? "check" : "uncheck"} name={state} />
          ) : (
            <>
              <span className="form-step-index" aria-hidden="true">
                {idx + 1}
              </span>
              <span className="form-step-name">{formName}</span>
            </>
          )}
        </button>
      </li>
    );
  };

  return (
    <div className="container">
      {heading && (
        <h3 className="heading" id="form-navigation-heading">
          {heading}
        </h3>
      )}

      <ol
        className="form-steps hide-on-mobile"
        aria-labelledby={heading ? "form-navigation-heading" : undefined}
        aria-label={heading ? undefined : "Form steps"}
      >
        {formOrder.map((name, idx) => renderStep(name, idx, "full"))}
      </ol>

      <ol
        className="form-steps form-steps-mini"
        aria-labelledby={heading ? "form-navigation-heading" : undefined}
        aria-label={heading ? undefined : "Form steps"}
      >
        {formOrder.map((name, idx) => renderStep(name, idx, "mini"))}
      </ol>

      <p className="form-steps-status" aria-live="polite">
        Showing {makeStrReadable(formOrder[pageNumber])} ({pageNumber + 1}/{formOrder.length})
      </p>
    </div>
  );
};

export default FormNavigation;
