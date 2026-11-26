// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/more-sheet/README.md
// The modal bottom sheet behind MobileTabBar's More button, ported from nexious-client's
// components/menu/MoreSheet.tsx (2026-11 item 337, Phase 4). The client builds it on its own
// DialogOverlay in bare chrome. The library's DialogOverlay is not a fit: it always draws the
// .dialog panel and a close button named in English, so the sheet composes the same parts the
// overlay is made of (a portal, the shared useFocusTrap, Escape and a scroll lock) around its own
// markup instead. When the client dialog system moves into the library this can sit on it.
//
// Opening the sheet is NOT viewing the items inside it: nothing here calls onSelect until an item
// is actually chosen, so a caller that clears pings on view keys on the selection, never on open.
import { useEffect, useId } from "react";
import { createPortal } from "react-dom";
import type { MoreSheetProps, NavItem } from "nxs-navigation";
import Button from "@nxs-atoms/buttons/Button";
import { useFocusTrap } from "@nxs-utils/hooks/useFocusTrap";
import { renderNavPing } from "@nxs-utils/navigation/navPing";
import { buildNxsButtonClass } from "../../../@types/Variant";

// The close control is an icon only danger nxs-btn square, the client's cu-btn-danger cu-btn-icon
// cu-btn-small. buildNxsButtonClass rather than a Button variant so it gains none of the 4.0.0
// btn-base hooks the client styles (the Session 2a internal button rule).
const CLOSE_CLASS = buildNxsButtonClass({ variant: "danger", size: "small", className: "nxs-btn-icon" });

/**
 * Component: MoreSheet
 *
 * Renders nothing while closed. Open, it portals a scrim and a `role="dialog"` sheet named by its
 * title to the document body: focus moves to the first control (the close button), Tab stays
 * inside, Escape and a press on the scrim close it, the page behind does not scroll, and focus
 * returns to the opener on close. Each section draws its overline (when it has one) over a grid of
 * items; the current item carries `aria-current="page"`. Choosing an item closes the sheet FIRST,
 * so focus is back on More before the chosen panel renders, then selects it.
 */
const MoreSheet = <TPing,>(props: MoreSheetProps<TPing>) => {
  const { id, isOpen, title, closeLabel, closeIcon, sections, activeId, onSelect, onClose } = props;
  const { footer, className, pings, renderPing } = props;
  const titleId = useId();
  const sheetRef = useFocusTrap<HTMLDivElement>(isOpen);

  useEffect(() => {
    if (!isOpen) return undefined;
    // Restore the PRIOR overflow rather than a default, so a lock another modal holds survives.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const chooseItem = (item: NavItem) => {
    onClose();
    item.onSelect?.();
    onSelect?.(item.id);
  };

  return createPortal(
    // The scrim is a presentation layer; its click is the mouse twin of Escape, which keyboard
    // users have, so the static element rules are relaxed here exactly as in DialogOverlay.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className="nxs-more-scrim"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        id={id}
        className={className ? `nxs-more-sheet ${className}` : "nxs-more-sheet"}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="nxs-more-grab" aria-hidden="true" />
        <div className="nxs-more-header">
          <h2 id={titleId} className="nxs-more-title">
            {title}
          </h2>
          <Button className={CLOSE_CLASS} aria-label={closeLabel} onClick={onClose}>
            <span aria-hidden="true">{closeIcon ?? "✕"}</span>
          </Button>
        </div>
        {sections
          .filter((section) => section.items.length > 0)
          .map((section) => (
            <div className="nxs-more-section" key={section.id}>
              {section.label ? <p className="nxs-more-overline">{section.label}</p> : null}
              <div className="nxs-more-grid">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="nxs-more-item"
                    aria-current={activeId === item.id ? "page" : undefined}
                    onClick={() => chooseItem(item)}
                  >
                    <span className="nxs-more-item-icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="nxs-more-item-label">{item.label}</span>
                    {renderNavPing({ pings, renderPing }, item)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        {footer ? <div className="nxs-more-footer">{footer}</div> : null}
      </div>
    </div>,
    document.body
  );
};

export default MoreSheet;
