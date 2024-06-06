// import { IconButton } from "@nxs-molecules";
import type { NavigationProps } from "nxs-navigation";

/**
 * Component - Navigation
 * @param menu    array to be iterated
 * @param click   callback to be fired when button is click
 * @returns navbar
 */
const Navigation: React.FC<NavigationProps> = (props) => {
  const { onClick, menus, theme } = props;
  // require key variable
  if (!menus) throw Error("menus is required");
  // console.log("menus :>> ", menus);

  return (
    <nav className={theme || "primary-navigation"}>
      <ul className="navigation">
        {menus.map((menu) => (
          <li className="nav-btn" key={menu}>
            {menu}
            {/* {onClick && <IconButton icon={m} onClick={() => onClick(m)} />} */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
