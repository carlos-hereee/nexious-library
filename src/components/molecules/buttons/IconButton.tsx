import { Icon, PingCount } from "@nxs-atoms";
import { IconButtonProps } from "nxs-button";

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
  const { icon, ping, onClick, theme } = props;
  return (
    <button
      className={theme}
      onClick={onClick}
      title={icon.name || icon.icon}
      type="button"
    >
      <Icon icon={icon.icon} size={icon.size} spin={icon.spin} color={icon.color} />
      {icon.label && icon.label}
      {ping && ping > 0 && <PingCount count={ping} />}
    </button>
  );
};

export default IconButton;
