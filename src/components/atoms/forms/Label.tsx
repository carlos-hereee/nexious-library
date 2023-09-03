import { LabelKeys } from "@nxs-utils/helpers/types";
import { labels } from "./labels";

type Props = {
  label: LabelKeys;
  errors?: string;
};
const Label: React.FC<Props> = (props) => {
  const { label, errors } = props;
  return (
    <label htmlFor={label.toString()} className="label">
      <span className="label-name">
        {labels[label].charAt(0).toUpperCase() + labels[label].slice(1)}
      </span>{" "}
      {errors && <span className="required">{errors}</span>}
    </label>
  );
};
export default Label;
