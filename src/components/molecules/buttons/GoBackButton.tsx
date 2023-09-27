import { OnClickProps } from "@nxs-utils/types/custom/OnClickProps";
import IconButton from "./IconButton";

const GoBackButton: React.FC<OnClickProps> = ({ onClick }) => (
  <IconButton
    icon={{ icon: "leftArrow", label: "Go back", name: "Go back" }}
    theme="btn-main"
    onClick={onClick}
  />
);
export default GoBackButton;
