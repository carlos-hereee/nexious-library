import { IconNames } from "@nxs/atoms";
import { NavButton } from "@nxs/molecules";

export type NavbarProps = {
  show: { isActive: boolean; isClose: boolean };
  toggle: React.MouseEventHandler<HTMLButtonElement>;
  click: React.MouseEventHandler<HTMLButtonElement>;
  menu: [
    {
      uid: string;
      isToggle: boolean;
      isAlt: boolean;
      name: string;
      alt?: string;
      icon: IconNames;
    }
  ];
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
const Navbar: React.FC<NavbarProps> = ({ show, toggle, click, menu }) => {
  return (
    <ul
      className="navigation"
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
