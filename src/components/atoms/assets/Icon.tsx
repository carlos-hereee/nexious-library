import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { svg } from "./Assets";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";

/**
 * Component - Icon
 * @param icon specify icon name
 * @param size optional specify size for icon
 * @param spin optional specify if icon should spin
 * @param color optional specify the color for icon
 * @param label optional specify the color for icon
 * @returns JSX.Element
 */

export interface IconProps {
  icon: string;
  size?: SizeProp;
  spin?: string;
  color?: string;
  label?: string;
  name?: string;
}

const Icon: React.FC<IconProps> = ({ icon, size, spin, color, name }) => {
  return (
    <FontAwesomeIcon
      icon={svg[icon]}
      size={size ? size : "1x"}
      className={name ? `icon icon-${name}` : "icon"}
      spin={icon ? spin === "spin" : true}
      pulse={icon ? spin === "pulse" : true}
      color={color}
    />
  );
  // return (
  //   <FontAwesomeIcon
  //     icon={icon ? svg[icon] : svg["spinner"]}
  //     size={size}
  //     className={name ? `icon icon-${name}` : "icon"}
  //     spin={icon ? spin === "spin" : true}
  //     pulse={icon ? spin === "pulse" : true}
  //     color={color}
  //   />
  // );
};
export default Icon;
