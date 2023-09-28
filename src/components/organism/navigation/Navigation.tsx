import { IconButton } from "@nxs-molecules";
import { NavigationProps } from "nxs-navigation";

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
