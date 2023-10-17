import { ButtonProps } from "nxs-button";
import { Icon } from "@nxs-atoms";

const CancelButton: React.FC<ButtonProps> = (props) => {
  const { onClick, label, theme } = props;
  return (
    <button type="button" className={`btn-cancel ${theme ? theme : ""}`} onClick={onClick}>
      <Icon icon="cancel" />
      {label || "Cancel"}
    </button>
  );
};
export default CancelButton;
