import { ErrorMessage } from "@nxs-atoms";
import type { IconProps } from "nxs-button";
import { getIconRenderer } from "./iconRegistry";

/**
 * Component - Icon
 * @param icon specify icon name (resolved through the pluggable icon registry)
 * @param size optional specify size for icon
 * @param spin optional specify if icon should spin ("spin" | "pulse")
 * @param color optional specify the color for icon
 * @param label optional accessible name for the icon
 * @returns JSX.Element
 */
const Icon: React.FC<IconProps> = (props) => {
  const { icon, size, spin, color, name, hideHints, theme, label } = props;

  const Renderer = icon ? getIconRenderer(icon) : undefined;
  if (!Renderer) {
    // hideHints (e.g. inside IconButton, which already validated) renders nothing
    // rather than a dev error so a missing key never injects stray UI.
    if (hideHints) return null;
    const code = icon ? "iconNotFound" : "missingProps";
    return <ErrorMessage error={{ code, prop: "icon", value: icon }} />;
  }

  const n = theme ? `icon${name ? ` icon-${name} ${theme}` : theme}` : `icon${name ? ` icon-${name}` : ""}`;
  const spinMode = spin === "spin" || spin === "pulse" ? spin : false;

  return <Renderer size={size} spin={spinMode} color={color} className={n} label={label} />;
};
export default Icon;
