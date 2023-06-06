import Icons from "../icon";

const SaveButton = ({ click }) => (
  <button type="button" className="btn-main" onClick={click}>
    <Icons name="heart" />
    Save
  </button>
);
export default SaveButton;
