import { ErrorMessage } from "@nxs-atoms";
import type { IconProps } from "nxs-button";
import { getIconRenderer, registeredKeysHint } from "./iconRegistry";

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
  const { icon, size, spin, color, name, hideHints, className, label, isDev } = props;

  const Renderer = icon ? getIconRenderer(icon) : undefined;
  if (!Renderer) {
    // hideHints (e.g. inside IconButton, which already validated) renders nothing
    // rather than a dev error so a missing key never injects stray UI.
    if (hideHints) return null;
    const code = icon ? "iconNotFound" : "missingProps";
    // The registry is filled at runtime by the consumer, so the valid key list cannot live
    // in the static spec. Pass it as a hint, and name the empty-registry case explicitly:
    // "no icons are registered" is a completely different fix from "that key is a typo".
    return (
      <ErrorMessage
        isDev={isDev}
        error={{ code, prop: "icon", value: icon, component: "Icon", hint: registeredKeysHint() }}
      />
    );
  }

  const n = className ? `icon${name ? ` icon-${name} ${className}` : className}` : `icon${name ? ` icon-${name}` : ""}`;
  const spinMode = spin === "spin" || spin === "pulse" ? spin : false;

  return <Renderer size={size} spin={spinMode} color={color} className={n} label={label} />;
};
export default Icon;
