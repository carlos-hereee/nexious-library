import { LabelKeys } from "@nxs-utils/helpers/types";
import { labels } from "./labels";

type Props = {
  children: JSX.Element[] | JSX.Element;
  name: LabelKeys;
};
const Label: React.FC<Props> = ({ children, name }) => {
  return (
    <label htmlFor={name.toString()} className="label">
      <span className="label-name">
        {labels[name].charAt(0).toUpperCase() + labels[name].slice(1)}
      </span>
      <span className="label-children">{children}</span>
    </label>
  );
};
export default Label;
