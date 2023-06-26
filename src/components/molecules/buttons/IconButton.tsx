import { Icon, PingCount } from "@nxs-atoms";
import { IconButtonProps } from "@nxs-helpers/interface";

/**
 * Icon Button
 * @param name string to specify the name of an icon
 * @param click callback fired when button is click
 * @param ping specify a notification count
 * @param size specify the size of icon
 * @returns button with icon label
 */

// type Props = {
//   icon:
// }

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  hasLabel,
  label,
  ping,
  click,
}) => {
  return (
    <button className={`btn btn-${icon.name}`} onClick={click} type="button">
      <Icon
        name={icon.name}
        size={icon.size}
        spin={icon.spin}
        color={icon.color}
      />
      {
        <>
          {hasLabel && <span className="icon-label">{label}</span>}
          {ping && ping > 0 && <PingCount count={ping} />}
        </>
      }
    </button>
  );
};

export default IconButton;
