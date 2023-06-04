import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { svg } from "./Assets";

export const Icons = ({ name, size, spin, color }) => {
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
