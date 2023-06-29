import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { svg } from "./Assets";
import { IconProps } from "@nxs-helpers/interface";

/**
 * Component - Icon
 * @param icon specify icon name
 * @param size optional specify size for icon
 * @param spin optional specify if icon should spin
 * @param color optional specify the color for icon
 * @param label optional specify the color for icon
 * @returns JSX.Element
 */
const Icon: React.FC<IconProps> = ({ icon, size, spin, color, name }) => {
  return (
    <FontAwesomeIcon
      icon={svg[icon]}
      size={size}
      className={name ? `icon icon-${name}` : "icon"}
      spin={spin === "spin"}
      pulse={spin === "pulse"}
      color={color}
    />
  );
};
export default Icon;
