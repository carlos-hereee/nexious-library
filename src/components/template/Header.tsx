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
  const {
    menu,
    logo,
    ping,
    language,
    theme,
    uniqueId,
    themeList,
    includeHome,
    layout,
    hideIcons,
    utilities,
    activePath,
  } = props;
  const { updateMenu, onLogoClick, handleTheme, onHomeClick } = props;
  const { errors } = useRequiredProps({ menu }, true);
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
  const handleHomeClick = () => {
    setActive(!isActive);
    if (onHomeClick) onHomeClick();
  };
  // An empty menu is a valid runtime state: public landings and minimal app pages
  // render a logo-only header. Only a genuinely absent menu prop is a developer
  // integration error worth replacing the header with a message. useRequiredProps
  // was hardened after 3.0.7 to also flag [] as "missing", so the old
  // `lightColor === "red"` gate blanked the ENTIRE header on every menu-less page.
  if (!menu) return <ErrorMessages errors={errors} component="header" />;
  return (
    <header className={layout} id={uniqueId} ref={headerRef}>
      {logo && <Logo hero={logo} label={logo.title} onLogoClick={onLogoClick} />}
      {menu.length > 0 && (
        <>
          <nav className="primary-navigation" aria-label="Primary">
            <Navbar
              show={{ isActive, isClose }}
              menu={menu}
              click={handleClick}
              handleTheme={handleTheme}
              language={language}
              themeList={themeList}
              theme={theme}
              hideIcons={hideIcons}
              active={theme}
              activePath={activePath}
              includeHome={includeHome}
              onHomeClick={handleHomeClick}
            />
          </nav>
          <nav className="mobile-navigation" aria-label="Mobile" id="mobile-navigation">
            <BurgerButton
              isBurger={isActive}
              onClick={() => setActive(!isActive)}
              ping={ping}
              controls="mobile-navigation"
            />
            <Navbar
              show={{ isActive, isClose }}
              menu={menu}
              click={handleClick}
              hideIcons={hideIcons}
              language={language}
              themeList={themeList}
              active={theme}
              activePath={activePath}
              theme={`alt-${theme}`}
              includeHome={includeHome}
              onHomeClick={handleHomeClick}
              handleTheme={handleTheme}
            />
          </nav>
        </>
      )}
      {utilities && <div className="header-utilities">{utilities}</div>}
    </header>
  );
};

export default Header;
