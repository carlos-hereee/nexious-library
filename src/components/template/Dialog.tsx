import type { DialogProps } from "nxs-card";
import { useEffect, useId } from "react";
import { Button } from "@nxs-atoms";
import { useFocusTrap } from "@nxs-utils/hooks/useFocusTrap";

const Dialog = ({ theme, onDialogClose, children, header, asModal }: DialogProps) => {
  // Focus trap + Escape are opt-in (asModal). Consumers that already wrap Dialog in their
  // own modal shell leave asModal off and get the plain markup, avoiding nested dialog
  // semantics and double Escape handling.
  const containerRef = useFocusTrap<HTMLDivElement>(!!asModal);
  const headingId = useId();

  useEffect(() => {
    if (!asModal) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDialogClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [asModal, onDialogClose]);

  return (
    <div
      ref={containerRef}
      className={`dialog ${theme ? `${theme}` : "alt-light-mode"}`}
      role={asModal ? "dialog" : undefined}
      aria-modal={asModal ? true : undefined}
      aria-labelledby={asModal && header?.heading ? headingId : undefined}
    >
      <div className="dialog-navigation">
        <Button label="X" aria-label="Close" onClick={onDialogClose} theme="btn-dialog btn-cancel" />
      </div>
      {header && (
        <div className="dialog-header">
          {header?.heading && (
            <h2 className="heading" id={headingId}>
              {header.heading}
            </h2>
          )}
          {header?.subtitle && <h3 className="subtitle">{header.subtitle}</h3>}
          {header?.data && <p>{header.data}</p>}
        </div>
      )}
      {children && <div className="dialog-body">{children}</div>}
    </div>
  );
};
export default Dialog;
