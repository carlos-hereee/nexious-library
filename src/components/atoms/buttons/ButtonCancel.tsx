type ButtonCancelProps = {
  click: () => void;
  data: string;
};
const ButtonCancel: React.FC<ButtonCancelProps> = (props) => {
  const { click, data } = props;
  return (
    <button type="button" className="btn btn-cancel" onClick={click}>
      {data}
    </button>
  );
};
export default ButtonCancel;
