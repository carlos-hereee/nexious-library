import { IconButton, NavToggle, Select } from "@nxs-molecules";
import type { NavbarProps } from "nxs-navigation";

const Navbar: React.FC<NavbarProps> = (props) => {
  const { show, click, menu, theme, themeList, handleTheme, active } = props;
  return (
    <ul
      className={theme ? `navigation ${theme}` : "navigation"}
      data-state={show.isActive ? "open" : show.isClose ? "closing" : "close"}
    >
      {themeList && (
        <li className="nav-btn">
          <Select
            list={themeList}
            name="themeList"
            theme={theme}
            onChange={handleTheme}
            active={active}
          />
        </li>
      )}
      {menu.map((m) => (
        <li className="nav-btn" key={m.menuId}>
          {m.isToggle ? (
            <NavToggle data={m} onSelect={(e) => click(e)} theme={theme} />
          ) : m.isPrivate ? (
            <IconButton icon={m} onClick={() => click(m)} theme="nav-item highlight" />
          ) : (
            <IconButton icon={m} onClick={() => click(m)} theme="nav-item highlight" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
