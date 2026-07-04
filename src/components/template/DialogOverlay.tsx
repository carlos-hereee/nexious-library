import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { DialogProps } from "nxs-card";
import Dialog from "@nxs-template/Dialog";

export interface DialogOverlayProps extends DialogProps {
  // Click the dimmed backdrop to dismiss. On by default — the universally expected modal
  // affordance. Set false for flows that must be dismissed deliberately (e.g. a destructive
  // confirm) so a stray backdrop click cannot cancel them. Keyboard users always dismiss
  // via Escape (provided by Dialog's asModal), regardless of this flag.
  closeOnBackdropClick?: boolean;
}

/**
 * DialogOverlay — the complete, self-sufficient modal the library ships so consumers do not
 * have to hand-roll the accessibility-critical pieces around Dialog. It renders Dialog with
 * asModal (so the focus trap + Escape + role="dialog"/aria-modal engage) inside a portaled,
 * scroll-locked, dimmed backdrop:
 *   ① createPortal to document.body so the modal escapes any ancestor overflow/stacking context;
 *   ② body scroll-lock while open so the page behind cannot scroll under the panel;
 *   ③ a dimmed backdrop whose click dismisses (the mouse equivalent of Escape).
 *
 * Why separate from Dialog: Dialog stays a bare shell (asModal off) for consumers who already
 * own a modal shell and only want the panel markup. Reach for DialogOverlay when you want a
 * drop-in modal that is conformant on its own.
 */
const DialogOverlay = (props: DialogOverlayProps) => {
  const { closeOnBackdropClick = true, onDialogClose, theme, header, children } = props;

  useEffect(() => {
    // Lock body scroll for the modal's lifetime; restore the PRIOR value (not a hardcoded
    // default) on close so a consumer's own overflow setting, or a parent modal's lock, is
    // not clobbered when this one unmounts.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // No DOM target during SSR; render nothing rather than throw on document.body.
  if (typeof document === "undefined") return null;

  return createPortal(
    // The backdrop is a presentation layer; its click is a mouse convenience whose accessible
    // equivalent is Escape (handled by Dialog's asModal), so the static-element a11y rules are
    // intentionally relaxed here.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className="dialog-overlay"
      role="presentation"
      onClick={
        closeOnBackdropClick
          ? (event) => {
              // Only a click landing directly on the backdrop dismisses. A click inside the
              // dialog has a different target, so it bubbles up here harmlessly without closing.
              if (event.target === event.currentTarget) onDialogClose?.();
            }
          : undefined
      }
    >
      <Dialog asModal theme={theme} header={header} onDialogClose={onDialogClose}>
        {children}
      </Dialog>
    </div>,
    document.body
  );
};

export default DialogOverlay;
