import { Icon } from "@nxs-atoms";
import CancelDialog from "@nxs-organism/card/CancelDialog";
import type { ButtonProps } from "nxs-button";
import { useEffect, useState } from "react";

const ButtonCancel: React.FC<ButtonProps> = ({ onClick, label, theme, confirmSubmit }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (confirmSubmit && show) setShow(true);
  }, [confirmSubmit, show]);

  if (show) {
    const handleConfirm = () => {
      // require key variable
      if (!onClick) throw Error("onClick is required");
      setShow(false);
      onClick();
    };
    return (
      <CancelDialog
        label={label}
        onDialogClose={() => setShow(false)}
        onClick={() => setShow(false)}
        onConfirmClick={handleConfirm}
      />
    );
  }
  if (confirmSubmit) {
    return (
      <button
        type="button"
        className={theme ? `btn-main btn-cancel ${theme}` : "btn-main btn-cancel"}
        onClick={() => setShow(true)}
      >
        <Icon icon="cancel" />
        {label || "Cancel"}
      </button>
    );
  }
  return (
    <button type="button" className={theme ? `btn-main btn-cancel ${theme}` : "btn-main btn-cancel"} onClick={onClick}>
      <Icon icon="cancel" />
      {label || "Cancel"}
    </button>
  );
};
export default ButtonCancel;
