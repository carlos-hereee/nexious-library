import { LabelKeys } from "@nxs-utils/helpers/types";
import { labels } from "@nxs-utils/form/labels";

type Props = {
  label: LabelKeys;
  errors?: string;
  theme?: string;
};
const Label: React.FC<Props> = (props) => {
  const { label, errors, theme } = props;
  const title = labels[label] ? labels[label] : "Enter Details";
  return (
    <label htmlFor={label.toString()} className={theme ? theme : "label"}>
      <span className="label-name">
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </span>{" "}
      {errors && <span className="required">{errors}</span>}
    </label>
  );
};
export default Label;
