import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { svg } from "./Assets";

const Icons = ({ name, size, spin, color }) => {
  return (
    <FontAwesomeIcon
      icon={svg[name]}
      size={size}
      className="icon"
      spin={spin === "spin"}
      pulse={spin === "pulse"}
      color={color}
    />
  );
};
export default Icons;
