import { IconButton, NavToggle } from "@nxs-molecules";
import type { NavbarProps } from "nxs-navigation";

const Navbar: React.FC<NavbarProps> = (props) => {
  const { show, click, menu, theme } = props;
  let dataState = show.isActive ? "open" : "close";
  if (show.isClose) dataState = "closing";
  if (!show.isActive && !show.isClose) dataState = "close";

  return (
    <ul className={theme ? `navigation ${theme}` : "navigation"} data-state={dataState}>
      {menu.map((m) => (
        <li className="nav-btn" key={m.menuId}>
          {m.isToggle ? (
            <NavToggle data={m} onSelect={(e) => click(e)} theme={theme} />
          ) : m.isPrivate ? (
            <IconButton icon={m.active} onClick={() => click(m)} theme="nav-item highlight" />
          ) : (
            <IconButton icon={m.active} onClick={() => click(m)} theme="nav-item highlight" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
