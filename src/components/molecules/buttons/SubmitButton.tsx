import { Button, Icon } from "@nxs-atoms";
import type { ButtonProps } from "nxs-button";
import { buildNxsButtonClass } from "../../../@types/Variant";

// A form's submit control. It renders the primary nxs-btn (2026-11 item 337) and keeps the legacy
// btn-main and btn-submit classes beside it, because the client still styles those hooks; they go
// with 2026-11 item 339. The label is passed as children, not `label`, so Button adds no
// aria-label that would only repeat the visible text.
const SubmitButton: React.FC<ButtonProps> = ({ label, isDisable, className, icon }) => {
  return (
    <Button
      type="submit"
      className={buildNxsButtonClass({
        variant: "primary",
        className: className ? `btn-main ${className}` : "btn-main btn-submit",
      })}
      isDisabled={isDisable}
    >
      <Icon icon={icon || "submit"} /> {label || "Confirm"}
    </Button>
  );
};

export default SubmitButton;
