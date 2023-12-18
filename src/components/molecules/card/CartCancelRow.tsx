type CancelRowProps = {
  click: (e: boolean) => void;
};
const CartCancel: React.FC<CancelRowProps> = ({ click }) => {
  return (
    <div className="container">
      <p>Are you sure you want to remove</p>
      <p>This will delete all progress</p>
      <div className="buttons-container-row">
        <button type="button" className="btn-main" onClick={() => click(false)}>
          Back
        </button>
        <button type="button" className="btn-main btn-danger" onClick={() => click(true)}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CartCancel;
