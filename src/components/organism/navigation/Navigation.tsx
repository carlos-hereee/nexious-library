import { Button } from "@nxs-atoms";
import type { NavigationProps } from "nxs-navigation";

/**
 * Component - Navigation
 * @param menu    array to be iterated
 * @param click   callback to be fired when button is click
 * @returns navbar
 */
const Navigation: React.FC<NavigationProps> = (props) => {
  const { onClick, menus, theme, active } = props;
  // require key variable
  if (!menus) throw Error("menus is required");
  // console.log("menus :>> ", menus);

  return (
    <nav className={theme || "primary-navigation"}>
      <ul className="navigation">
        {menus.map((menu) =>
          onClick ? (
            <Button
              theme={menu === active ? "btn-main btn-active" : "btn-main"}
              onClick={() => onClick(menu)}
              key={menu}
            >
              <li className="nav-btn">{menu}</li>
            </Button>
          ) : (
            <li className={menu === active ? "nav-btn btn-active" : "nav-btn"} key={menu}>
              {menu}
            </li>
          )
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
