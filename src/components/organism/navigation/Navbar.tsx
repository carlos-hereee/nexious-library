import { IconButton, NavToggle, Select } from "@nxs-molecules";
import { Button } from "@nxs-atoms";
import type { NavbarProps } from "nxs-navigation";

const Navbar: React.FC<NavbarProps> = (props) => {
  const { show, menu, theme, themeList, active, includeHome } = props;
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
      {menu.map((m) => {
        const layoutOrder = m.isPrivate || m.category === "auth" ? " nav-order-last" : "";
        return (
          <li className={`nav-btn${layoutOrder}`} key={m.menuId}>
            {m.isToggle ? (
              <NavToggle data={m} onSelect={(e) => click(e)} theme={theme} />
            ) : m.icon ? (
              <IconButton icon={m} onClick={() => click(m)} theme={layout} />
            ) : (
              <Button label={m.label} theme={layout} onClick={() => click(m)} />
            )}
          </li>
        );
      })}
      {includeHome && (
        <li className="nav-btn nav-order-first">
          <Button label="Home" title="home" theme={layout} onClick={onHomeClick} />
        </li>
      )}
    </ul>
  );
};

export default Navbar;
