// import { Button, Icon } from  "@atoms/index.js";
// import { Button } from  "@atoms/index.js";
// import { IconButtonProps } from "types/interface";
// import NotificationCount from "../SetNotificationCount";

import { IconButtonProps } from "@nexious-library/helpers/interface.js";
import { Button, Icon } from "@nexious-library/atoms/index.js";

// import { Button, Icon } from "@atoms/index.js";
// import { IconButtonProps } from "@helpers/interface.js";
// import { Button, Icon } from "@atoms/index.js";

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
