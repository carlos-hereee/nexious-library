import { Icon, PingCount } from "@nxs-atoms";
import { IconButtonProps } from "@nxs-helpers/interface";

/**
 * Icon Button
 * @param icon string to specify the name of an icon
 * @param click callback fired when button is click
 * @param ping specify a notification count
 * @param size specify the size of icon
 * @returns button with icon label
 */

const IconButton: React.FC<IconButtonProps> = ({ icon, ping, click }) => {
  return (
    <button
      className={`btn btn-icon btn-${icon.name}`}
      onClick={click}
      type="button"
    >
      <Icon
        icon={icon.icon}
        size={icon.size}
        spin={icon.spin}
        color={icon.color}
      />
      {icon.label && <span className="icon-label">{icon.label}</span>}
      {ping && ping > 0 && <PingCount count={ping} />}
    </button>
  );
};

export default IconButton;
