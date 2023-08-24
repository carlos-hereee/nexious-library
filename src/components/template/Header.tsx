import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgerButton, Logo } from "@nxs-molecules";
import { Navbar } from "@nxs-organism";
import { MenuItemProp } from "@nxs-utils/helpers/types";

export type HeaderProps = {
  logo: { url: string; alt?: string; name: string };
  menu: MenuItemProp[];
  ping?: number;
  updateMenu: (e: MenuItemProp[]) => void;
};
/**
 * Component - Header
 * @param logo.url string; url pointing to asset
 * @param logo.alt string; alt tag to asset
 * @param logo.title string; logo title
 * @param menu.uid string; menu item uid
 * @param menu.name string; menu item name
 * @param menu.icon string; menu item icon name
 * @param menu.alt string; menu item alt tag
 * @param menu.isAlt boolean;
 * @param menu.isToggle boolean;
 * @returns Header component
 */
const Header: React.FC<HeaderProps> = (props) => {
  const { menu, logo, ping, updateMenu } = props;
  const [isActive, setActive] = useState(false);
  const [isClose, setClose] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initClose = () => setClose(true);
    document.addEventListener("animationend", initClose, true);
    return () => document.removeEventListener("animationend", initClose, true);
  }, []);
  const handleClick = (e: MenuItemProp) => {
    setActive(!isActive);
    navigate(`${e.icon}`);
  };
  return (
    <header>
      <Link to="/" className="logo-link">
        <Logo logo={logo} />
      </Link>
      <nav className="primary-navigation">
        <Navbar
          show={{ isActive, isClose }}
          menu={menu}
          toggle={updateMenu}
          click={handleClick}
        />
      </nav>
      <nav className="mobile-navigation">
        <BurgerButton
          isBurger={isActive}
          click={() => setActive(!isActive)}
          ping={ping}
        />
        <Navbar
          show={{ isActive, isClose }}
          menu={menu}
          toggle={updateMenu}
          click={handleClick}
        />
      </nav>
    </header>
  );
};

export default Header;
