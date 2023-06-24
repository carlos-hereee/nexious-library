import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgerButton, Logo } from "@nxs-molecules";
import { MenuItemProp, Navbar } from "@nxs-organism";

export type HeaderProps = {
  data: { url: string; alt?: string; title: string };
  menu: MenuItemProp[];
  title: string;
};
/**
 * Component - Header
 * @param dara.url string; url pointing to asset
 * @param dara.alt string; alt tag to asset
 * @param dara.title string; logo title
 * @param menu.uid string; menu item uid
 * @param menu.name string; menu item name
 * @param menu.icon string; menu item icon name
 * @param menu.alt string; menu item alt tag
 * @param menu.isAlt boolean;
 * @param menu.isToggle boolean;
 * @returns Header component
 */
const Header: React.FC<HeaderProps> = ({ menu, data, title }) => {
  const [isActive, setActive] = useState(false);
  const [isClose, setClose] = useState(false);
  const [items, setItems] = useState(menu || []);
  const navigate = useNavigate();

  const handleToggle = (e: MenuItemProp) => {
    let toggle = items.map((i) => {
      return i.uid === e.uid ? { ...i, isAlt: !i.isAlt } : i;
    });
    setItems(toggle);
  };

  useEffect(() => {
    const initClose = () => setClose(true);
    document.addEventListener("animationend", initClose, true);
    return () => document.removeEventListener("animationend", initClose, true);
  }, []);

  return (
    <header>
      <Link to="/" className="navlink">
        <Logo data={data} title={title} />
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
        <BurgerButton isBurger={isActive} click={() => setActive(!isActive)} />
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
