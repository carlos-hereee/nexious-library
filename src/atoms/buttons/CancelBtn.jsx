import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CancelBtn = ({ click }) => (
  <button type="button" className="btn btn-main" onClick={click}>
    <FontAwesomeIcon icon={faTimes} className="mr-2" />
    Cancel
  </button>
);
export default CancelBtn;
