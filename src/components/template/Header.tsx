import { useEffect, useState } from "react";
import { BurgerButton, ErrorMessages, Logo } from "@nxs-molecules";
import { Navbar } from "@nxs-organism";
import { MenuProp } from "@nxs-utils/helpers/types";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { HeaderProps } from "nxs-navigation";

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
  const { menu, logo, ping, updateMenu, language, heading, theme } = props;
  const { lightColor, errors } = useRequiredProps({ menu }, true);
  const [isActive, setActive] = useState(false);
  const [isClose, setClose] = useState(false);

  useEffect(() => {
    const initClose = () => setClose(true);
    document.addEventListener("animationend", initClose, true);
    return () => document.removeEventListener("animationend", initClose, true);
  }, []);

  const handleClick = (e: MenuProp) => {
    setActive(!isActive);
    updateMenu(e);
  };
  if (lightColor === "red") return <ErrorMessages errors={errors} component="header" />;
  return (
    <header>
      <Logo hero={logo} label={heading} />
      {menu && (
        <>
          <nav className="primary-navigation">
            <Navbar
              show={{ isActive, isClose }}
              menu={menu}
              click={handleClick}
              language={language}
              theme={theme}
            />
          </nav>
          <nav className={"mobile-navigation"}>
            <BurgerButton
              isBurger={isActive}
              onClick={() => setActive(!isActive)}
              ping={ping}
            />
            <Navbar
              show={{ isActive, isClose }}
              menu={menu}
              click={handleClick}
              language={language}
              theme={theme}
            />
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
