import { Icon } from "@nxs-atoms";
import CancelDialog from "@nxs-organism/card/CancelDialog";
import type { ButtonProps } from "nxs-button";
import { useEffect, useState } from "react";
import Button from "./Button";

// Cancel is the neutral way out, so it renders the secondary nxs-btn (2026-11 item 337). The legacy
// btn-main and btn-cancel classes stay beside it because the client still styles them; they go with
// 2026-11 item 339.
const CANCEL_CLASS = "btn-main btn-cancel";

const ButtonCancel: React.FC<ButtonProps> = (props) => {
  const { onClick, label, className, confirmSubmit, onSubmit, toggleLabel, hideIcon } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (confirmSubmit && show) setShow(true);
  }, [confirmSubmit, show]);

  if (show) {
    const handleConfirm = () => {
      // require key variable
      if (!onClick) throw Error("onClick is required");
      onClick();
    };
    const handleSubmit = () => {
      // require key variable
      if (!onSubmit) throw Error("onSubmit is required");
      setShow(false);
      onSubmit();
    };
    return (
      <CancelDialog
        label={label}
        toggleShow={confirmSubmit}
        toggleLabel={toggleLabel || "Do not show again"}
        onDialogClose={() => setShow(false)}
        onClick={handleConfirm}
        onConfirmClick={handleSubmit}
      />
    );
  }
  if (confirmSubmit) {
    return (
      <Button
        variant="secondary"
        className={className ? `${CANCEL_CLASS} ${className}` : CANCEL_CLASS}
        onClick={() => setShow(true)}
      >
        {!hideIcon && <Icon icon="cancel" />}
        {label || "Cancel"}
      </Button>
    );
  }
  return (
    <Button
      variant="secondary"
      className={className ? `${CANCEL_CLASS} ${className}` : CANCEL_CLASS}
      onClick={() => onClick && onClick()}
    >
      {!hideIcon && <Icon icon="cancel" />}
      {label || "Cancel"}
    </Button>
  );
};
export default ButtonCancel;
