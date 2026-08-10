import { ErrorMessage, Icon, PingCount } from "@nxs-atoms";
import { getIconRenderer, registeredKeysHint } from "@nxs-atoms/assets/iconRegistry";
import type { IconButtonProps } from "nxs-button";

/**
 * Icon Button
 * @param icon.name string to specify the name of an icon
 *    @param size string to specify the size of an  *
 *    @param spin string to specify the spin of an  *
 *    @param color string to specify the color of an  *
 * @param ping string to specify a notification count on icon
 * @param onClick callback fired when button is clicked
 * @returns button with icon label
 */
const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    className,
    onClick,
    ping,
    icon,
    title,
    isDisable,
    isDisabled,
    "aria-label": ariaLabelProp,
    "aria-expanded": ariaExpanded,
    "aria-controls": ariaControls,
    isDev,
  } = props;
  // Both branches route through ErrorMessage now. The first used to render a bare
  // "Double check icon prop" paragraph, which bypassed the dev-mode gate entirely and so
  // shipped that string to production users.
  if (!icon)
    return (
      <ErrorMessage isDev={isDev} error={{ code: "missingProps", prop: "icon", value: icon, component: "IconButton" }} />
    );
  const { color, label, size, spin, name } = icon;
  if (!icon.icon) {
    return (
      <ErrorMessage
        isDev={isDev}
        error={{ code: "missingProps", prop: "icon.icon", value: icon.icon, component: "IconButton" }}
      />
    );
  }
  const disabled = isDisabled ?? isDisable;
  // Icon-only buttons have no text node, so without a name a screen reader announces nothing.
  // Prefer an explicit aria-label, then title/label/name, finally the icon key as a last resort.
  const ariaLabel = ariaLabelProp || title || label || name || icon.icon;
  if (icon.isNum) {
    const nums = icon.icon.split("");
    return (
      <button
        className={className ? `btn-icon ${className}` : "btn-icon"}
        onClick={onClick}
        title={title || icon.icon || name || ""}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
      >
        {nums.map((n) => (
          <Icon key={n} icon={n} size={size} spin={spin} color={color} name={name} hideHints />
        ))}
      </button>
    );
  }
  if (!getIconRenderer(icon.icon)) {
    // `value` is the key that failed (what the reader passed); the valid key list is a
    // hint. They used to be concatenated into `value`, which reported the whole catalog
    // as if it were the received prop.
    return (
      <ErrorMessage
        isDev={isDev}
        error={{
          code: "iconNotFound",
          prop: "icon.icon",
          value: icon.icon,
          component: "IconButton",
          hint: registeredKeysHint(),
        }}
      />
    );
  }
  return (
    <button
      className={className ? `btn-icon ${className}` : "btn-icon"}
      onClick={onClick}
      title={title || name || icon.icon || ""}
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
    >
      <Icon icon={icon.icon} size={size} spin={spin} color={color} name={name} hideHints />
      {label && label}
      {ping && ping > 0 && <PingCount data={ping} />}
    </button>
  );
};

export default IconButton;
