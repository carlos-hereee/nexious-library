import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BurgerButton, ErrorMessages, Logo } from "@nxs-molecules";
import { Navbar } from "@nxs-organism";
import { MenuProp } from "@nxs-utils/helpers/types";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { HeaderProps } from "nxs-header";

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
  const { menu, logo, ping, updateMenu, language } = props;
  const { lightColor, errors } = usePropErrorHandling({ logo, menu }, true);
  const [isActive, setActive] = useState(false);
  const [isClose, setClose] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initClose = () => setClose(true);
    document.addEventListener("animationend", initClose, true);
    return () => document.removeEventListener("animationend", initClose, true);
  }, []);

  const handleClick = (e: MenuProp) => {
    setActive(!isActive);
    e.active && e.active.link
      ? navigate(`/${e.active.link}`)
      : navigate(`/${e.active?.name}`);
  };
  // console.log("errors", errors);
  return (
    <header>
      {lightColor === "red" ? (
        <ErrorMessages errors={errors} component="header" />
      ) : (
        <>
          {logo?.logoId && <Logo hero={logo} />}
          {menu && (
            <>
              {" "}
              <nav className="primary-navigation">
                <Navbar
                  show={{ isActive, isClose }}
                  menu={menu}
                  toggle={updateMenu}
                  click={handleClick}
                  language={language}
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
                  language={language}
                />
              </nav>
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
