import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { svg } from "./Assets";
import { ErrorMessage } from "@nxs-atoms";
import { IconProps } from "nxs-button";

/**
 * Component - Icon
 * @param icon specify icon name
 * @param size optional specify size for icon
 * @param spin optional specify if icon should spin
 * @param color optional specify the color for icon
 * @param label optional specify the color for icon
 * @returns JSX.Element
 */
const Icon: React.FC<IconProps> = (props) => {
  const { icon, size, spin, color, name, className } = props;
  // const
  const n = className
    ? `icon ${name ? `icon-${name} ` + className : className}`
    : `${name ? `icon-${name}` : ""}`;

  if (!icon) return <ErrorMessage code="missingProps" prop="icon" />;
  if (!svg[icon]) return <ErrorMessage code="iconNotFound" prop="icon" />;
  return (
    <FontAwesomeIcon
      icon={svg[icon]}
      size={size ? size : "1x"}
      className={n}
      spin={spin ? spin === "spin" : false}
      pulse={spin ? spin === "pulse" : false}
      color={color}
    />
  );
};
export default Icon;
