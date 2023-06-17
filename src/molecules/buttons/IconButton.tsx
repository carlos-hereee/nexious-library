// import { Button, Icon } from  "@atoms";
// import { Button } from  "@atoms";
// import { IconButtonProps } from "types/interface";
// import NotificationCount from "../SetNotificationCount";

import { IconButtonProps } from "@nexious-library/helpers/interface";
import { Button, Icon } from "@nexious-library/atoms/index";

// import { Button, Icon } from "@atoms";
// import { IconButtonProps } from "@helpers/interface";
// import { Button, Icon } from "@atoms";

/**
 * Icon Button
 * @param name string to specify the name of an icon
 * @param click callback fired when button is click
 * @param ping specify a notification count
 * @param size specify the size of icon
 * @returns button with icon label
 */

const IconButton: React.FC<IconButtonProps> = ({
  name,
  hasLabel,
  label,
  // ping,
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
          {/* {ping && ping > 0 && <NotificationCount count={ping} />} */}
        </>
      }
    </Button>
  );
};

export default IconButton;
