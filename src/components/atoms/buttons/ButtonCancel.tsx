type ButtonCancelProps = {
  click: () => void;
};
const ButtonCancel: React.FC<ButtonCancelProps> = (props) => {
  const { click } = props;
  return (
    <button type="button" className="btn btn-cancel" onClick={click}>
      x
    </button>
  );
};
export default ButtonCancel;
