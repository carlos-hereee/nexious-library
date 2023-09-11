// import { LabelKeys } from "@nxs-utils/helpers/types";
import { labels } from "@nxs-utils/form/labels";

type Props = {
  name: string;
  errors?: string;
  label?: string;
  theme?: string;
};
const Label: React.FC<Props> = (props) => {
  const { label, errors, theme, name } = props;
  return (
    <label htmlFor={name} className={theme ? theme : ""}>
      <span className="label-name">
        {label
          ? label.charAt(0).toUpperCase() + label.slice(1)
          : labels.label &&
            labels.label.charAt(0).toUpperCase() + labels.label.slice(1)}
      </span>{" "}
      {errors && <span className="required">{errors}</span>}
    </label>
  );
};
export default Label;
