import { Icon } from "@nxs-atoms";
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
  name,
  hasLabel,
  label,
  // ping,
  size,
  spin,
  color,
  click,
  data,
}) => {
  return (
    <button
      className={`btn btn-${name}`}
      onClick={() => click(data)}
      type="button"
    >
      <Icon name={name} size={size} spin={spin} color={color} />
      {
        <>
          {hasLabel && <span className="icon-label">{label}</span>}
          {/* {ping && ping > 0 && <NotificationCount count={ping} />} */}
        </>
      }
    </button>
  );
};

export default IconButton;
