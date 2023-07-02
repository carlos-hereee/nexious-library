import IconButton from "./IconButton";
import { MenuItemProp } from "@nxs-helpers/types";

export type NavButtonProps = {
  data: MenuItemProp;
  click: (e: MenuItemProp) => void;
};
/**
 *  Component - NavButton
 * @param data navigation menu item
 * @param click   callback tobe fired when button is click
 *
 * @returns navigation button
 */
const NavButton: React.FC<NavButtonProps> = ({ data, click }) => {
  return (
    <li className="nav-btn">
      <IconButton
        icon={{ ...data, label: data.name }}
        click={() => click(data)}
      />
    </li>
  );
};
export default NavButton;
