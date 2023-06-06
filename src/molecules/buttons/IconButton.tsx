import { Button, Icon } from "src/atoms";
import { IconButtonProps } from "src/types/interface";
import NotificationCount from "../SetNotificationCount";

/**
 * Icon Button
 * @param name name of the icon
 * @param click callback fired when button is click
 * @param ping specify a notification count
 * @param size specify the size of icon
 * @returns button with icon label
 */

const IconButton: React.FC<IconButtonProps> = ({
  name,
  hasLabel,
  label,
  ping,
  size,
  spin,
  color,
  click,
}) => {
  return (
    <Button name={name} click={click}>
      <Icon name={name} size={size} spin={spin} color={color} />
      {
        <>
          {hasLabel && <span className="icon-label">{label}</span>}
          {ping && ping > 0 && <NotificationCount count={ping} />}
        </>
      }
    </Button>
  );
};

export default IconButton;
