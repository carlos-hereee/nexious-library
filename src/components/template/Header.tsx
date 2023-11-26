import { useEffect, useRef, useState } from "react";
import { BurgerButton, ErrorMessages, Logo } from "@nxs-molecules";
import { Navbar } from "@nxs-organism";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import type { HeaderProps, MenuProp } from "nxs-navigation";

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
  const { menu, logo, ping, updateMenu, language, theme, uniqueId, onLogoClick } = props;
  const { lightColor, errors } = useRequiredProps({ menu }, true);
  const [isActive, setActive] = useState(false);
  const [isClose, setClose] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setClose(true);
    document.addEventListener("animationend", handler, true);
    return () => document.removeEventListener("animationend", handler, true);
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && isActive) {
        if (!headerRef.current.contains(event.target as HTMLElement)) setActive(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [isActive]);

  const handleClick = (e: MenuProp) => {
    setActive(!isActive);
    updateMenu(e);
  };
  if (lightColor === "red") return <ErrorMessages errors={errors} component="header" />;
  return (
    <header id={uniqueId} ref={headerRef}>
      {logo && <Logo hero={logo} label={logo.title} onLogoClick={onLogoClick} />}
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
          <nav className="mobile-navigation">
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
              theme={`alt-${theme}`}
            />
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
