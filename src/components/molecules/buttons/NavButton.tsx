import { IconNames } from "@nxs-atoms";
import IconButton from "./IconButton";

export type NavButtonProps = {
  data: {
    uid: string;
    name: string;
    icon: IconNames;
    isAlt: boolean;
    alt?: string;
  };
  click: (e: {
    uid: string;
    name: string;
    icon: IconNames;
    isAlt: boolean;
    alt?: string;
  }) => void;
};
/**
 *  Component - NavButton
 * @param data navigation menu item
 * @param click   callback tobe fired when button is click
 *
 * @returns navigation button
 */
const NavButton: React.FC<NavButtonProps> = ({ data, click }) => (
  <li className="nav-btn">
    {data.isAlt ? (
      <IconButton
        name={data.icon}
        hasLabel={true}
        label={data.alt}
        data={data}
        click={click}
      />
    ) : (
      <IconButton
        name={data.icon}
        data={data}
        hasLabel={true}
        label={data.name}
        click={click}
      />
    )}
  </li>
);
export default NavButton;
{
  /* notification={data.notification} */
}
