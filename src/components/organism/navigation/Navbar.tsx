import { IconButton, ListItem, NavToggle, Select } from "@nxs-molecules";
import { Button } from "@nxs-atoms";
import type { NavbarProps } from "nxs-navigation";

const Navbar: React.FC<NavbarProps> = (props) => {
  const { show, menu, theme, themeList, active, includeHome, hideIcons } = props;
  const { handleTheme, click, onHomeClick } = props;

  const layout = "nav-item highlight";
  return (
    <ul
      className={theme ? `navigation ${theme}` : "navigation"}
      data-state={show.isActive ? "open" : show.isClose ? "closing" : "close"}
    >
      {themeList && (
        <li className="nav-btn">
          <Select list={themeList} name="themeList" theme={theme} onChange={handleTheme} active={active} />
        </li>
      )}
      {menu.map((m) => (
        <ListItem key={m.menuId} theme={hideIcons ? "no-icon" : ""} item={m} handleClick={() => click(m)} />
      ))}
      {includeHome && (
        <li className="nav-btn nav-order-first">
          <Button label="Home" title="home" theme={layout} onClick={onHomeClick} />
        </li>
      )}
    </ul>
  );
};

export default Navbar;
