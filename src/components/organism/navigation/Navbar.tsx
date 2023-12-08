import { IconButton, NavToggle, Select } from "@nxs-molecules";
import { Button } from "@nxs-atoms";
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
      {menu.map((m) => {
        const layoutOrder = m.isPrivate || m.category === "auth" ? " nav-order-last" : "";
        return (
          <li className={`nav-btn${layoutOrder}`} key={m.menuId}>
            {m.isToggle ? (
              <NavToggle data={m} onSelect={(e) => click(e)} theme={theme} />
            ) : m.icon ? (
              <IconButton icon={m} onClick={() => click(m)} theme="nav-item highlight" />
            ) : (
              <Button label={m.label} theme="nav-item highlight" onClick={() => click(m)} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
