import { MenuProp } from "@nxs-utils/helpers/types";
import { IconButton } from "@nxs-molecules";

export type NavigationProps = {
  click: (e: MenuProp) => void;
  menu: MenuProp[];
  theme?: string;
};
/**
 * Component - Navigation
 * @param menu    array to be iterated
 * @param click   callback to be fired when button is click
 * @returns navbar
 */
const Navigation: React.FC<NavigationProps> = (props) => {
  const { click, menu, theme } = props;
  return (
    <ul className={theme ? `navigation ${theme}` : "navigation bg-default"}>
      {menu.map((m) => (
        <li className="nav-btn">
          <IconButton icon={m} onClick={() => click(m)} />
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
