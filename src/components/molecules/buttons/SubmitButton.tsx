import { Icon } from "@nxs-atoms";
import type { ButtonProps } from "nxs-button";

const SubmitButton: React.FC<ButtonProps> = ({ label, isDisable, className, icon }) => {
  return (
    <button type="submit" className={className ? `btn-main ${className}` : "btn-main btn-submit"} disabled={isDisable}>
      <Icon icon={icon || "submit"} /> {label || "Confirm"}
    </button>
  );
};

export default SubmitButton;
