import { Icon } from "@nxs-atoms";
import CancelDialog from "@nxs-organism/card/CancelDialog";
import type { ButtonProps } from "nxs-button";
import { useEffect, useState } from "react";

const ButtonCancel: React.FC<ButtonProps> = ({ onClick, label, theme, confirmSubmit, onSubmit, toggleLabel }) => {
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
    <button type="button" className={theme ? `btn-main btn-cancel ${theme}` : "btn-main btn-cancel"} onClick={onSubmit}>
      <Icon icon="cancel" />
      {label || "Cancel"}
    </button>
  );
};
export default ButtonCancel;
