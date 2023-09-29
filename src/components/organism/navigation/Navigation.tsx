import { IconButton } from "@nxs-molecules";
import { NavigationProps } from "nxs-navigation";

/**
 * Component - Navigation
 * @param menu    array to be iterated
 * @param click   callback to be fired when button is click
 * @returns navbar
 */
const Navigation: React.FC<NavigationProps> = (props) => {
  const { onClick, menu, theme } = props;

  return (
    <ul className={theme ? `navigation ${theme}` : "navigation bg-default"}>
      {menu.map((m) => (
        <li className="nav-btn">
          {onClick && <IconButton icon={m} onClick={() => onClick(m)} />}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
