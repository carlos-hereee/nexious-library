const ToggleBtn = ({ setToggle, toggle }) => (
  <button
    type="button"
    className="btn btn-main"
    onClick={() => setToggle(!toggle)}
  >
    ...
  </button>
);
export default ToggleBtn;
