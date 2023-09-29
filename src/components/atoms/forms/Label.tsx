import { initLabels } from "@nxs-utils/form/labels";
import { LabelProps } from "nxs-form";

const Label: React.FC<LabelProps> = (props) => {
  const { label, errors, theme, name } = props;
  const labelCap = label
    ? label.charAt(0).toUpperCase() + label.slice(1)
    : initLabels.label &&
      initLabels.label.charAt(0).toUpperCase() + initLabels.label.slice(1);

  return (
    <label htmlFor={name} className={theme}>
      <span className="label-name">{labelCap}</span>{" "}
      {errors && <span className="required">{errors}</span>}
    </label>
  );
};
export default Label;
