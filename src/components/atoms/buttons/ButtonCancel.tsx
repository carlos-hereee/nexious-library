import { ButtonProps } from "nxs-button";

const ButtonCancel: React.FC<ButtonProps> = (props) => {
  const { onClick, label, theme } = props;
  return (
    <button type="button" className={`btn-cancel ${theme ? theme : ""}`} onClick={onClick}>
      {label || "Cancel"}
    </button>
  );
};
export default ButtonCancel;
