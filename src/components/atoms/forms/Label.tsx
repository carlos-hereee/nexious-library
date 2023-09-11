import { initLabels } from "@nxs-utils/form/labels";

type Props = {
  name: string;
  errors?: string;
  label?: string;
  theme?: string;
};
const Label: React.FC<Props> = (props) => {
  const { label, errors, theme, name } = props;
  const labelCap = label
    ? label.charAt(0).toUpperCase() + label.slice(1)
    : initLabels.label &&
      initLabels.label.charAt(0).toUpperCase() + initLabels.label.slice(1);

  return (
    <label htmlFor={name} className={theme ? theme : ""}>
      <span className="label-name">{labelCap}</span>{" "}
      {errors && <span className="required">{errors}</span>}
    </label>
  );
};
export default Label;
