import { Button } from "main";
import type { DialogProps } from "nxs-card";

const Dialog = (props: DialogProps) => {
  const { theme, onDialogClose, children } = props;
  return (
    <div className={`dialog ${theme ? ` alt-${theme}` : "alt-light-mode"}`}>
      <div className="dialog-navigation">
        <Button label="X" onClick={onDialogClose} theme="btn-dialog btn-cancel" />
      </div>
      <div className="dialog-body">{children}</div>
    </div>
  );
};
export default Dialog;
