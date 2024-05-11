import type { DialogProps } from "nxs-card";
import { Button } from "@nxs-atoms";

const Dialog = ({ theme, onDialogClose, children, header }: DialogProps) => {
  return (
    <div className={`dialog ${theme ? `${theme}` : "alt-light-mode"}`}>
      <div className="dialog-navigation">
        <Button label="X" onClick={onDialogClose} theme="btn-dialog btn-cancel" />
      </div>
      {header && (
        <div className="dialog-header">
          {header?.heading && <h2 className="heading">{header.heading}</h2>}
          {header?.subtitle && <h3 className="subtitle">{header.subtitle}</h3>}
          {header?.data && <p>{header.data}</p>}
        </div>
      )}
      {children && <div className="dialog-body">{children}</div>}
    </div>
  );
};
export default Dialog;
