// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/swap-order-buttons/README.md
// Promoted from nexious-client's src/components/list/SwapOrderButtons.tsx. Five client lists had
// drifted into four skins of the same pair before it existed there, so it lives here now for any
// consumer that reorders a list one row at a time.
import { useLayoutEffect, useRef } from "react";
import Icon from "@nxs-atoms/assets/Icon";
import type { MoveOffset, SwapOrderButtonsProps } from "nxs-button";
// A runtime value from @types, imported by relative path because jest has no nxs-* mapping.
import { buildControlClass } from "../../../@types/Variant";

// Built once: the secondary variant is a neutral, so a reorder pair never competes with the row's
// own primary action, and `nxs-swap-order-button` squares it (styles/buttons/_swap-order-buttons).
const DEFAULT_BUTTON_CLASS = buildControlClass({ variant: "secondary", size: "medium", extra: "nxs-swap-order-button" });

/**
 * Component - SwapOrderButtons
 *
 * What stays with the caller, deliberately: the swap itself (each list writes its own way), the
 * copy (labels arrive translated, so each caller keeps its own namespace), and any focus repair
 * that depends on how the caller keys its rows. What lives here: the ends disable themselves, so
 * no caller can forget one, and the one focus rule every caller wants (see the layout effect).
 *
 * Renders a fragment, no wrapper, so the pair drops into any row's action container unchanged.
 */
const SwapOrderButtons: React.FC<SwapOrderButtonsProps> = (props) => {
  const { position, count, onMove, upLabel, downLabel, disabled = false, moveKey } = props;
  const { upIcon, downIcon, classNames } = props;

  const upRef = useRef<HTMLButtonElement>(null);
  const downRef = useRef<HTMLButtonElement>(null);
  const upDisabled = disabled || position <= 0;
  const downDisabled = disabled || position >= count - 1;

  // ── Focus when a button reaches an end ──
  // Which button holds focus, by its own focus and blur events. A button that turns disabled
  // while it held focus hands focus to its sibling when the sibling is live. Two cases reach
  // here. A row whose DOM node stays put keeps focus on the now disabled button until the
  // browser's focus fixup runs, which is after this effect. A row React MOVES (keyed lists move
  // the row that swapped down) loses focus on the move WITHOUT a blur event, and React's own
  // focus restore cannot land it on a disabled button, so focus is on the page when this runs
  // and only the flag remembers it was here. Tracking focus rather than presses is what keeps
  // this honest: a click on the page background, or a mouse press in a browser that never
  // focuses buttons, leaves no flag behind to pull focus back later. When both buttons disable
  // at once (a caller's hold) there is nowhere to go, and the caller's own repair takes over.
  const focusedRef = useRef<MoveOffset | null>(null);
  const previousRef = useRef({ up: upDisabled, down: downDisabled });

  useLayoutEffect(() => {
    const previous = previousRef.current;
    previousRef.current = { up: upDisabled, down: downDisabled };
    const active = document.activeElement;
    const focusOnPage = !active || active === document.body;
    const handOff = (
      offset: MoveOffset,
      from: HTMLButtonElement | null,
      to: HTMLButtonElement | null,
      toDisabled: boolean
    ) => {
      const held = active === from || (focusOnPage && focusedRef.current === offset);
      if (held && !toDisabled) to?.focus();
    };
    if (upDisabled && !previous.up) handOff(-1, upRef.current, downRef.current, downDisabled);
    if (downDisabled && !previous.down) handOff(1, downRef.current, upRef.current, upDisabled);
  }, [upDisabled, downDisabled]);

  const className = classNames?.button ?? DEFAULT_BUTTON_CLASS;
  const dataMove = (offset: MoveOffset) => (moveKey === undefined ? undefined : `${moveKey}:${offset}`);

  return (
    <>
      <button
        ref={upRef}
        type="button"
        className={className}
        aria-label={upLabel}
        data-move={dataMove(-1)}
        disabled={upDisabled}
        onClick={() => onMove(-1)}
        onFocus={() => {
          focusedRef.current = -1;
        }}
        onBlur={() => {
          focusedRef.current = null;
        }}
      >
        {upIcon ?? <Icon icon="arrowUp" />}
      </button>
      <button
        ref={downRef}
        type="button"
        className={className}
        aria-label={downLabel}
        data-move={dataMove(1)}
        disabled={downDisabled}
        onClick={() => onMove(1)}
        onFocus={() => {
          focusedRef.current = 1;
        }}
        onBlur={() => {
          focusedRef.current = null;
        }}
      >
        {downIcon ?? <Icon icon="arrowDown" />}
      </button>
    </>
  );
};

export default SwapOrderButtons;
