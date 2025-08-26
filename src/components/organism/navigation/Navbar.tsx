import { ListItem } from "@nxs-molecules";
import type { NavbarProps } from "nxs-navigation";
import SelectItem from "@nxs-molecules/navigation/SelectItem";

const Navbar: React.FC<NavbarProps> = (props) => {
  const { show, menu, theme, themeList, active, includeHome, hideIcons } = props;
  const { handleTheme, click, onHomeClick } = props;

  return (
    <ul
      className={`navigation${theme ? ` ${theme}` : ""}`}
      data-state={show.isActive ? "open" : show.isClose ? "closing" : "close"}
    >
      {themeList && (
        <SelectItem active={active} list={themeList} theme={theme} handleChange={handleTheme} name="themeList" />
      )}
      {menu.map((m) => (
        <ListItem key={m.menuId} hideIcons={hideIcons} theme={theme} item={m} handleClick={() => click(m)} />
      ))}
      {includeHome && <ListItem hideIcons={hideIcons} handleClick={onHomeClick} theme="nav-btn nav-order-1" />}
    </ul>
  );
};

export default Navbar;
