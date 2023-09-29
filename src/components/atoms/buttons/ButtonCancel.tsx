import { ButtonProps } from "nxs-button";

const ButtonCancel: React.FC<ButtonProps> = (props) => {
  const { onClick, data } = props;
  return (
    <button type="button" className="btn-cancel" onClick={onClick}>
      {data}
    </button>
  );
};
export default ButtonCancel;
