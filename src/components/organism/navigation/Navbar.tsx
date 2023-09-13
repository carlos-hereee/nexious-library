import { MenuItemProp, MenuProp } from "@nxs-utils/helpers/types";
import { IconButton, NavToggle } from "@nxs-molecules";

export type NavbarProps = {
  show: { isActive: boolean; isClose: boolean };
  toggle: (a: MenuProp[]) => void;
  click: (a: MenuProp) => void;
  menu: MenuProp[];
  theme?: string;
  language?: MenuItemProp;
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
  const { show, toggle, click, menu, theme, language } = props;
  const handleToggle = (a: any) => {
    const idx = menu.findIndex((item) => item.uid === a.uid);
    if (idx) menu[idx] = a;
    toggle(menu);
  };

  return (
    <ul
      className={theme ? `navigation ${theme}` : "navigation"}
      data-state={show.isActive ? "open" : show.isClose ? "closing" : "close"}
    >
      {menu.map((m) => (
        <li className="nav-btn" key={m.menuId}>
          {m.isToggle ? (
            <NavToggle data={m} onSelect={handleToggle} language={language} />
          ) : m.isPrivate ? (
            <IconButton
              icon={m.active}
              onClick={() => click(m)}
              theme="nav-item highlight"
            />
          ) : (
            <IconButton
              icon={m.active}
              onClick={() => click(m)}
              theme="nav-item highlight"
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
