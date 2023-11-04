import { IconButton, NavToggle } from "@nxs-molecules";
import { NavbarProps } from "nxs-navigation";

const Navbar: React.FC<NavbarProps> = (props) => {
  const { show, click, menu, theme, language } = props;
  return (
    <ul
      className={theme ? `navigation ${theme}` : "navigation"}
      data-state={show.isActive ? "open" : show.isClose ? "closing" : "close"}
    >
      {menu.map((m) => (
        <li className="nav-btn" key={m.menuId}>
          {m.isToggle ? (
            <NavToggle data={m} onSelect={() => click(m)} language={language} theme={theme} />
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
