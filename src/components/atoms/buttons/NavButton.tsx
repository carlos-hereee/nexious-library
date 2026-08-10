import type { ButtonProps } from "nxs-button";
import ErrorMessage from "@nxs-atoms/texts/ErrorMessage";
import IconButton from "@nxs-molecules/buttons/IconButton";
import Button from "./Button";

const NavButton = ({ onClick, data, className, activeTheme, icon, label, isDev }: ButtonProps) => {
  if (!data)
    return (
      <ErrorMessage isDev={isDev} error={{ code: "missingProps", prop: "data", value: data, component: "NavButton" }} />
    );

  if (icon && onClick) {
    return (
      <IconButton icon={{ icon, label: label || data }} className={activeTheme || className} onClick={() => onClick(data)} />
    );
  }
  if (onClick) {
    return (
      <Button className={activeTheme || className} onClick={() => onClick(data)}>
        <li className="nav-btn">{label || data}</li>
      </Button>
    );
  }
  return <li className="nav-btn">{label || data}</li>;
};
export default NavButton;
