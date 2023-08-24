import { MenuItemProp } from "@nxs-utils/helpers/types";
import { IconButton, NavToggle } from "@nxs-molecules";

export type NavbarProps = {
  show: { isActive: boolean; isClose: boolean };
  toggle: (a: MenuItemProp[]) => void;
  click: (a: MenuItemProp) => void;
  menu: MenuItemProp[];
  theme?: string;
};
/**
 * Component - Navbar
 * @param show    display navigation
 *                  show: {
 *                            isActive: boolean,
 *                            isClose: boolean
 *                        }
 * @param menu    array tobe iterated
 *                  menu: [{
 *                            uid: string,
 *                            isToggle: boolean,
 *                            isAlt: boolean,
 *                            name: string,
 *                            alt?: string, optional param
 *                         }]
 * @param toggle  callback to be fired when button is click
 * @param click   callback to be fired when button is click
 * @returns navbar
 */
const Navbar: React.FC<NavbarProps> = (props) => {
  const { show, toggle, click, menu, theme } = props;
  const handleClick = (e: any) => click(e);
  const handleToggle = (a: any) => {
    const idx = menu.findIndex((item) => item.uid === a.uid);
    if (idx) menu[idx] = a;
    toggle(menu);
  };
  return (
    <ul
      className={theme ? `navigation ${theme}` : "navigation bg-default"}
      data-state={show.isActive ? "open" : show.isClose ? "closing" : "close"}
    >
      {menu.map((m) => (
        <li className="nav-btn" key={m.uid}>
          {m.isToggle ? (
            <NavToggle data={m} onSelect={handleToggle} />
          ) : m.isPrivate ? (
            <IconButton icon={m.active} click={handleClick} />
          ) : (
            <IconButton icon={m} click={handleClick} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
