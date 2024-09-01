import type { ButtonProps } from "nxs-button";
import ErrorMessage from "@nxs-atoms/texts/ErrorMessage";
import IconButton from "@nxs-molecules/buttons/IconButton";
import Button from "./Button";

const NavButton = ({ onClick, data, theme, activeTheme, icon }: ButtonProps) => {
  if (!data) return <ErrorMessage error={{ code: "missingProps", prop: "data", value: data }} />;

  if (icon && onClick) {
    return <IconButton icon={{ icon, label: data }} theme={activeTheme || theme} onClick={() => onClick(data)} />;
  }
  if (onClick) {
    return (
      <Button theme={activeTheme || theme} onClick={() => onClick(data)}>
        <li className="nav-btn">{data}</li>
      </Button>
    );
  }
  return <li className="nav-btn">{data}</li>;
};
export default NavButton;
