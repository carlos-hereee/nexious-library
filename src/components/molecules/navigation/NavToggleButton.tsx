import { MenuItemProp } from "@nxs-helpers/types";
import { IconButton } from "@nxs-molecules";

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
  if (data.alternatives) {
    const idx = data.alternatives?.findIndex((a) => a.uid === data.active);

    return (
      <li className="nav-btn">
        <IconButton icon={data.alternatives[idx]} click={() => click(data)} />
      </li>
    );
  }
};
export default NavButton;
