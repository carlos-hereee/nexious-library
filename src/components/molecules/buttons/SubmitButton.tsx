import { Icon } from "@nxs-atoms";
import type { ButtonProps } from "nxs-button";

const SubmitButton: React.FC<ButtonProps> = (props) => {
  const { label, isDisable } = props;
  return (
    <button type="submit" className="btn-main btn-submit" disabled={isDisable}>
      <Icon icon="submit" /> {label ? label : "Confirm"}
    </button>
  );
};

export default SubmitButton;
