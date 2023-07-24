import { MenuItemProp } from "@nxs-helpers/types";
import { NavButton } from "@nxs-molecules";

export type NavbarProps = {
  show: { isActive: boolean; isClose: boolean };
  toggle: (e: MenuItemProp) => void;
  click: (e: MenuItemProp) => void;
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
  return (
    <ul
      className={theme ? `navigation ${theme}` : "navigation bg-light"}
      data-state={show.isActive ? "open" : show.isClose ? "closing" : "close"}
    >
      {menu.map((m) =>
        m.isToggle ? (
          <NavButton data={m} key={m.uid} click={toggle} />
        ) : (
          <NavButton data={m} key={m.uid} click={click} />
        )
      )}
    </ul>
  );
};

export default Navbar;
