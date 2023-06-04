import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RematchBtn = ({ click }) => (
  <button type="button" className="btn btn-main" onClick={click}>
    <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
    Rematch
  </button>
);
export default RematchBtn;
