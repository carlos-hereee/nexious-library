import type { DialogProps } from "nxs-card";
import { useEffect, useId } from "react";
import { Button } from "@nxs-atoms";
import { useFocusTrap } from "@nxs-utils/hooks/useFocusTrap";
import { buildNxsButtonClass } from "../../@types/Variant";

// The close control is an icon only tertiary nxs-btn square, like CloseHeader's (2026-11 item 337);
// btn-dialog and btn-cancel stay beside it until 2026-11 item 339 because the client still styles them.
const DIALOG_CLOSE_CLASS = buildNxsButtonClass({ variant: "tertiary", className: "nxs-btn-icon btn-dialog btn-cancel" });

const Dialog = ({ className, onDialogClose, children, header, asModal }: DialogProps) => {
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
      className={`dialog ${className ? `${className}` : "alt-light-mode"}`}
      role={asModal ? "dialog" : undefined}
      aria-modal={asModal ? true : undefined}
      aria-labelledby={asModal && header?.heading ? headingId : undefined}
    >
      <div className="dialog-navigation">
        <Button label="X" aria-label="Close" onClick={onDialogClose} className={DIALOG_CLOSE_CLASS} />
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
