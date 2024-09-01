import { Button, ErrorMessage, NavButton } from "@nxs-atoms";
import { propChecker } from "@nxs-utils/tsChecker/propChecker";
import type { NavigationProps, MenuProp } from "nxs-navigation";

/**
 * Component - Navigation
 * @param menu    array to be iterated
 * @param click   callback to be fired when button is click
 * @returns navbar
 */
const Navigation: React.FC<NavigationProps> = ({ onClick, menus, theme, active }) => {
  // require key variable
  if (!menus) return <ErrorMessage error={{ code: "missingProps", prop: "menus", value: menus }} />;
  const propType = propChecker<string>(menus, "string");

  if (propType === "string") {
    return (
      <nav className={theme || "primary-navigation"}>
        <ul className="navigation">
          {(menus as string[]).map((menu) => (
            <NavButton onClick={onClick} data={menu} key={menu} />
          ))}
        </ul>
      </nav>
    );
  }
  return (
    <nav className={theme || "primary-navigation"}>
      <ul className="navigation">
        {(menus as MenuProp[]).map((menu) => (
          <NavButton onClick={onClick} data={menu.value} key={menu.uid} />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
