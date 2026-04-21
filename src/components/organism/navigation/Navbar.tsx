import { ListItem } from "@nxs-molecules";
import type { NavbarProps } from "nxs-navigation";
import ThemeMenu from "@nxs-molecules/navigation/ThemeMenu";

const Navbar: React.FC<NavbarProps> = (props) => {
  const { show, menu, theme, themeList, active, activePath, includeHome, hideIcons } = props;
  const { handleTheme, click, onHomeClick } = props;

  return (
    <ul
      className={`navigation${theme ? ` ${theme}` : ""}`}
      data-state={show.isActive ? "open" : show.isClose ? "closing" : "close"}
    >
      {menu.map((m) => (
        <ListItem
          key={m.menuId}
          hideIcons={hideIcons}
          theme={theme}
          item={m}
          activePath={activePath}
          handleClick={() => click(m)}
        />
      ))}
      {includeHome && (
        <ListItem
          hideIcons={hideIcons}
          handleClick={onHomeClick}
          theme="nav-btn nav-order-1"
          activePath={activePath}
        />
      )}
      {themeList && (
        <ThemeMenu active={active} list={themeList} theme={theme} handleChange={handleTheme} name="theme" />
      )}
    </ul>
  );
};

export default Navbar;
