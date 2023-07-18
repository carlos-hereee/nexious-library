type CancelRowProps = {
  click: (e: boolean) => void;
};
const CartCancel: React.FC<CancelRowProps> = ({ click }) => {
  return (
    <div className="cancel-row">
      <p>Are you sure you want to cancel</p>
      <p>This will delete all progress</p>
      <div className="cancel-row-footer">
        <button
          type="button"
          className="btn btn-main"
          onClick={() => click(false)}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-main btn-danger"
          onClick={() => click(true)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default CartCancel;
