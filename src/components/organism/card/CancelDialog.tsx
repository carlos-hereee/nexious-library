import type { DialogProps } from "nxs-card";
import { Button, Icon } from "@nxs-atoms";
import { IconButton } from "@nxs-molecules";
import Dialog from "../../template/Dialog";
import { buildNxsButtonClass } from "../../../@types/Variant";

const CancelDialog = (props: DialogProps) => {
  const { onDialogClose, className, onClick, label, onConfirmClick, toggleShow, toggleLabel } = props;
  return (
    <Dialog asModal className={className || "dialog-cancel light-mode"} onDialogClose={onDialogClose}>
      <div className="primary-container">
        <p className="text-center">Are you sure you want to continue this will remove current progress</p>
        {typeof toggleShow === "boolean" && (
          <IconButton icon={{ icon: toggleShow ? "uncheck" : "check", label: toggleLabel }} onClick={onClick} />
        )}
        <div className="buttons-container">
          {/* Confirming removes the current progress (danger) and dismissing is the neutral way out
              (secondary), on the nxs-btn family (2026-11 item 337); the legacy classes stay beside them
              until 2026-11 item 339 because the client still styles them. */}
          <Button
            className={buildNxsButtonClass({
              variant: "danger",
              className: className ? `btn-main btn-cancel ${className}` : "btn-main btn-cancel",
            })}
            onClick={() => onConfirmClick && onConfirmClick()}
          >
            <Icon icon="cancel" />
            {label || "Cancel"}
          </Button>
          <Button
            className={buildNxsButtonClass({ variant: "secondary", className: "btn-main" })}
            onClick={() => onDialogClose && onDialogClose()}>
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
};
export default CancelDialog;
