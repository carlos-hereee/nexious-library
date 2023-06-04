const ButtonCancel = ({ data, click }) => (
  <button
    type="button"
    className="btn-cancel"
    onClick={() => click(data, true)}
  >
    x
  </button>
);
export default ButtonCancel;
