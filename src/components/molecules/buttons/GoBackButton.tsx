import { ButtonProps } from "nxs-button";
import IconButton from "./IconButton";

const GoBackButton: React.FC<ButtonProps> = ({ onClick }) => (
  <IconButton
    icon={{ icon: "leftArrow", label: "Go back", name: "Go back" }}
    theme="btn-main"
    onClick={onClick}
  />
);
export default GoBackButton;
