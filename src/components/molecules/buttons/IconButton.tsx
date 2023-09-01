import { Icon, PingCount } from "@nxs-atoms";
import { IconButtonProps } from "@nxs-utils/helpers/interface";

/**
 * Icon Button
 * @param icon.name string to specify the name of an icon
 * @param icon.size string to specify the size of an icon
 * @param icon.spin string to specify the spin of an icon
 * @param icon.color string to specify the color of an icon
 * @param ping string to specify a notification count on icon
 * @param click callback fired when button is click
 * @returns button with icon label
 */

const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, ping, click, theme } = props;
  return (
    <button
      className={theme ? theme : ""}
      onClick={click}
      title={icon.name || icon.icon}
      type="button"
    >
      <Icon
        icon={icon.icon}
        size={icon.size}
        spin={icon.spin}
        color={icon.color}
      />
      {icon.label && icon.label}
      {ping && ping > 0 && <PingCount count={ping} />}
    </button>
  );
};

export default IconButton;
