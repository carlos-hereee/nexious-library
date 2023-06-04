import { Link } from "react-router-dom";
// import { UserContext } from "../../../utils/context/UserContext";
import Buttons from "../buttons/Buttons";

/**
 *
 * data = {name=string, uid: string, ping: number}
 */
const Navlink = ({ data, click }) => {
  return (
    <li>
      <Link className="nav-link" to={data.name}>
        <Buttons
          name={data.isPrivate ? data.alt : data.name}
          ping={data.ping}
          handleClick={click}
        />
      </Link>
    </li>
  );
};

export default Navlink;
