import type { ButtonProps } from "nxs-button";
import { buildControlClass } from "../../../@types/Variant";
import IconButton from "./IconButton";

// The secondary nxs-btn (2026-11 item 337), composed as a class string because IconButton takes
// its look that way; the legacy btn-main stays beside it until 2026-11 item 339.
const GO_BACK_CLASS = buildControlClass({ variant: "secondary", className: "btn-main" });

const GoBackButton: React.FC<ButtonProps> = ({ onClick }) => (
  <IconButton
    icon={{ icon: "leftArrow", label: "Go back", name: "Go back" }}
    className={GO_BACK_CLASS}
    onClick={() => onClick && onClick()}
  />
);
export default GoBackButton;
