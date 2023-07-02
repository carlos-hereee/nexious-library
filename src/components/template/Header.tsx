import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BurgerButton, Logo } from "@nxs-molecules";
import { Navbar } from "@nxs-organism";
import { MenuItemProp } from "@nxs-helpers/types";

export type HeaderProps = {
  logo: { url: string; alt?: string; name: string };
  menu: MenuItemProp[];
  appName: string;
  ping?: number;
  setLanguage?: (e: string) => void;
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
  const { menu, logo, ping, appName, setLanguage } = props;
  const [isActive, setActive] = useState(false);
  const [isClose, setClose] = useState(false);
  const [items, setItems] = useState(menu || []);
  const navigate = useNavigate();

  const handleToggle = (e: MenuItemProp) => {
    let toggle = items.map((i) => {
      if (i.uid === e.uid) {
        setLan(i, i.isAlt);
        return { ...i, isAlt: !i.isAlt };
      }
      return i;
    });
    setItems(toggle);
  };
  const setLan = (item: MenuItemProp, isAlt?: boolean) => {
    if (setLanguage) {
      // return isAlt ? setData(item.name) : item.alt && setData(item.alt);
      return isAlt ? setLanguage(item.name) : item.alt && setLanguage(item.alt);
    }
  };
  useEffect(() => {
    menu.forEach((m) => m.icon === "flag" && setLan(m, !m.isAlt));
    const initClose = () => setClose(true);
    document.addEventListener("animationend", initClose, true);
    return () => document.removeEventListener("animationend", initClose, true);
  }, []);

  // useEffect(() => {
  //   if (data === "english" || data === "ingles") {
  //     document.documentElement.setAttribute("lang", "en-US");
  //   }
  //   if (data === "espanol" || data === "spanish") {
  //     const inEnglish = new Intl.DisplayNames(["en"], { type: "region" });
  //     const inSpanish = new Intl.DisplayNames(["es"], { type: "region" });

  //     console.log(inEnglish.of("US"));
  //     // Expected output: "United States"

  //     console.log(inSpanish.of("US"));
  //     // Expected output: "美國"

  //     // document.documentElement.setAttribute("lang", "es-US");
  //   }
  // }, [data]);
  // console.log("data", data);
  return (
    <header>
      <Link to="/" className="navlink">
        <Logo logo={logo} appName={appName} />
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
