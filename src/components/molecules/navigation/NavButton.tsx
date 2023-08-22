import IconButton from "../buttons/IconButton";
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
const NavButton: React.FC<NavButtonProps> = (props) => {
  const { data, click } = props;

  return (
    <li className="nav-btn">
      <IconButton icon={data} click={() => click(data)} />
    </li>
  );
};
export default NavButton;
