import type { ButtonProps } from "nxs-button";
import ErrorMessage from "@nxs-atoms/texts/ErrorMessage";
import Button from "./Button";

const NavButton = ({ onClick, data, theme }: ButtonProps) => {
  if (!data) return <ErrorMessage error={{ code: "missingProps", prop: "data", value: data }} />;

  if (onClick) {
    return (
      <Button theme={theme} onClick={() => onClick(data)}>
        <li className="nav-btn">{data}</li>
      </Button>
    );
  }
  return <li className="nav-btn">{data}</li>;
};
export default NavButton;
