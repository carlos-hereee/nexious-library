import type { DialogProps } from "nxs-card";
import { Icon } from "@nxs-atoms";
import Dialog from "../../template/Dialog";

const CancelDialog = ({ onDialogClose, theme, onClick, label, onConfirmClick }: DialogProps) => {
  return (
    <Dialog theme={theme || "dialog-cancel light-mode"} onDialogClose={onDialogClose}>
      <div className="primary-container">
        <p className="text-center">Are you sure you want to continue this will remove current progress</p>
        <div className="buttons-container">
          <button
            type="button"
            className={theme ? `btn-main btn-cancel ${theme}` : "btn-main btn-cancel"}
            onClick={onConfirmClick}
          >
            <Icon icon="cancel" />
            {label || "Cancel"}
          </button>
          <button type="button" className="btn-main" onClick={onClick}>
            Cancel
          </button>
        </div>
      </div>
    </Dialog>
  );
};
export default CancelDialog;
