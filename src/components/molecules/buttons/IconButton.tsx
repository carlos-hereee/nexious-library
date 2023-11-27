import { Icon, PingCount } from "@nxs-atoms";
import type { IconButtonProps } from "nxs-button";

/**
 * Icon Button
 * @param icon.name string to specify the name of an icon
 *    @param size string to specify the size of an  *
 *    @param spin string to specify the spin of an  *
 *    @param color string to specify the color of an  *
 * @param ping string to specify a notification count on icon
 * @param click callback fired when button is click
 * @returns button with icon label
 */
const IconButton: React.FC<IconButtonProps> = (props) => {
  const { theme, onClick, ping, icon, title, isDisable } = props;
  if (!icon) return <p className="error-message">Double check icon prop</p>;

  const { color, label, size, spin } = icon;
  // console.log('object :>> ', object);
  return (
    <button
      className={theme}
      onClick={onClick}
      title={title || icon.icon || icon.name || ""}
      type="button"
      disabled={isDisable}
    >
      <Icon icon={icon.icon} size={size} spin={spin} color={color} />
      {label && label}
      {ping && ping > 0 && <PingCount data={ping} />}
    </button>
  );
};

export default IconButton;
