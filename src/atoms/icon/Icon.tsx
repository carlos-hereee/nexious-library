import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDefinition } from "./Assets";
import { IconProps } from "src/types/interface";

/**
 * Component - Icon
 * @param name specify icon name
 * @param size optional specify size for icon
 * @param spin optional specify if icon should spin
 * @param color optional specify the color for icon
 * @returns JSX.Element
 */
const Icon: React.FC<IconProps> = ({ name, size, spin, color }) => {
  return (
    <FontAwesomeIcon
      icon={getDefinition(name)}
      size={size}
      className="icon"
      spin={spin === "spin"}
      pulse={spin === "pulse"}
      color={color}
    />
  );
};
export default Icon;
