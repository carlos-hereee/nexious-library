import { Label } from "@nxs-atoms";
import type { FieldShellProps } from "nxs-form";

/**
 * FieldShell
 *
 * The one layout every form field renders inside: label, then the control, then optional help,
 * then the error. Before this each of the nine field components stacked its own parts as a bare
 * fragment, so they inherited the parent's 16px field-to-field gap as their label-to-control gap
 * and nothing read as a grouped unit.
 *
 * It also closes a real accessibility hole rather than just tidying markup. Every control in the
 * library sets `aria-describedby={`${name}-error`}` when invalid, but seven of them rendered the
 * error INSIDE the Label, so hiding the label removed the node the description pointed at and a
 * screen reader announced "invalid" with no reason. Field.tsx and Select.tsx each worked around
 * that with their own duplicated bare-span fallback. Here the error node is owned by the shell
 * and rendered whenever there is an error, label or not, so the reference can never dangle and
 * there is one copy of the rule instead of two workarounds and seven gaps.
 *
 * The error sits AFTER the control, which is both the convention and what the design language
 * specifies. That is a visible move from today, where it rendered inside the label above the
 * control. The `required` class rides along beside `field-error` so existing consumer styling
 * for error text keeps applying.
 *
 * `addon` is the one optional extension: a consumer node (a toggle, a hint pill) that sits on the
 * label line. It goes in a row NEXT TO the <label>, never inside it, because anything inside a
 * <label> becomes part of the control's accessible name and a click on it activates the control;
 * a toggle living there would both pollute the name and focus the input every time it was pressed.
 * Without an addon there is no row wrapper at all, so a consumer that never passes one gets the
 * exact markup it gets today.
 */
const FieldShell: React.FC<FieldShellProps> = (props) => {
  const { name, label, hideLabel, error, message, help, className, addon, children } = props;

  // The same `label &&` expression the shell has always rendered, hoisted so both branches below
  // place the identical node. Kept as an expression rather than a ternary so the no addon branch
  // stays byte for byte what it was.
  const labelNode = label && (
    <Label name={name} label={label} message={message} className={hideLabel ? "field-label sr-only" : "field-label"} />
  );

  return (
    <div className={className ? `field-shell ${className}` : "field-shell"}>
      {/* hideLabel hides the label VISUALLY, it does not delete it. A hidden <label htmlFor> plus
          the control's own id={name} gives every field type an accessible name for free, which is
          strictly better than the per-control aria-label hack it replaces: it works for the time
          input, the date trigger and the quantity input that had no aria-label at all, and it
          reads the human label ("Publish date") rather than the raw field name ("publishedOn").
          .sr-only is absolutely positioned, so it adds no flex gap and no layout.

          The error is deliberately NOT passed to Label. Label still renders one when given it
          (other call sites rely on that), and two nodes sharing `${name}-error` would make the
          aria reference ambiguous.

          With an addon the label and the node share one row. The hidden label stays in that row
          (out of flow, still the control's name) and the addon is the row's only in flow child, so
          the same auto margin lands it at the end whether the label is visible or not. */}
      {addon ? (
        <div className="field-label-row">
          {labelNode}
          <span className="field-addon">{addon}</span>
        </div>
      ) : (
        labelNode
      )}
      {children}
      {help && <p className="field-help">{help}</p>}
      {error && (
        <span className="required field-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default FieldShell;
