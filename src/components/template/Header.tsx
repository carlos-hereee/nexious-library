import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgerButton, Logo } from "@nxs-molecules";
import { Navbar } from "@nxs-organism";
import { MenuItemProp } from "@nxs-helpers/types";

export type HeaderProps = {
  logo: { url: string; alt?: string; title: string };
  menu: MenuItemProp[];
  title: string;
  ping?: number;
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
const Header: React.FC<HeaderProps> = ({ menu, logo, title, ping }) => {
  const [isActive, setActive] = useState(false);
  const [isClose, setClose] = useState(false);
  const [items, setItems] = useState(menu || []);
  const [lan, setLan] = useState<string>();
  const navigate = useNavigate();

  const handleToggle = (e: MenuItemProp) => {
    let toggle = items.map((i) => {
      if (i.uid === e.uid) {
        setLanguage(i, i.isAlt);
        return { ...i, isAlt: !i.isAlt };
      }
      return i;
    });
    setItems(toggle);
  };
  const setLanguage = (item: MenuItemProp, isAlt?: boolean) => {
    return isAlt ? setLan(item.name) : item.alt && setLan(item.alt);
  };
  useEffect(() => {
    menu.forEach((m) => {
      if (m.icon === "flag") setLanguage(m, !m.isAlt);
    });
    const initClose = () => setClose(true);
    document.addEventListener("animationend", initClose, true);
    return () => document.removeEventListener("animationend", initClose, true);
  }, []);
  console.log("lan", lan);

  return (
    <header>
      <Link to="/" className="navlink">
        <Logo data={logo} title={title} />
      </Link>
      <nav className="primary-navigation">
        <Navbar
          show={{ isActive, isClose }}
          menu={items}
          toggle={handleToggle}
          click={(e) => navigate(`${e.name}`)}
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
          menu={items}
          toggle={handleToggle}
          click={(e) => navigate(`${e.name}`)}
        />
      </nav>
    </header>
  );
};

export default Header;
