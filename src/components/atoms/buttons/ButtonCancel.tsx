import { Icon } from "@nxs-atoms";
import type { ButtonProps } from "nxs-button";

const ButtonCancel: React.FC<ButtonProps> = (props) => {
  const { onClick, label, theme } = props;
  return (
    <button type="button" className={`btn-cancel ${theme || ""}`} onClick={onClick}>
      <Icon icon="cancel" />
      {label || "Cancel"}
    </button>
  );
};
export default ButtonCancel;
