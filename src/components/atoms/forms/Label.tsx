import { initLabels } from "@nxs-utils/form/labels";
import type { LabelProps } from "nxs-form";

const Label: React.FC<LabelProps> = (props) => {
  const { label, error, theme, name, message } = props;
  const labelCap = label
    ? label.charAt(0).toUpperCase() + label.slice(1)
    : initLabels.label && initLabels.label.charAt(0).toUpperCase() + initLabels.label.slice(1);

  return (
    <label htmlFor={name} className={theme}>
      <span className="label-name">{labelCap}</span>{" "}
      {error && (
        // role="alert" + the predictable `${name}-error` id let the matching input wire
        // aria-describedby/aria-invalid so screen readers announce the validation error.
        <span className="required" id={name ? `${name}-error` : undefined} role="alert">
          {error}
        </span>
      )}
      {message && <span className="success">{message}</span>}
    </label>
  );
};
export default Label;
