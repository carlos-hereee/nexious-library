import { useEffect, useRef } from "react";

// Elements that can receive keyboard focus. Excludes [tabindex="-1"] and
// disabled controls so Tab cycles only through genuinely reachable nodes.
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Traps keyboard focus inside the returned ref while `isActive` is true:
 * ① moves focus into the container on open, ② cycles Tab / Shift+Tab within it
 * so focus never escapes to the page behind a modal backdrop, and ③ restores
 * focus to whatever was focused before opening on teardown.
 *
 * Why centralized: this is the WCAG 2.4.3 / 2.1.2 contract every modal needs.
 * One correct implementation backs every dialog instead of each modal
 * re-rolling focus management or omitting it entirely.
 */
export const useFocusTrap = <T extends HTMLElement>(isActive: boolean) => {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!isActive || !container) return undefined;

    // Remember the trigger so focus returns there on close, not to <body>.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        // getClientRects() is empty for display:none nodes but non-empty for
        // position:fixed (offsetParent would wrongly exclude a fixed dialog).
        (el) => el.getClientRects().length > 0
      );

    // Move focus inside on open. Prefer the first control; fall back to the
    // container itself (made focusable) so screen readers still land inside.
    const initial = getFocusable();
    if (initial.length > 0) initial[0]?.focus();
    else {
      container.setAttribute("tabindex", "-1");
      container.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const nodes = getFocusable();
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      // Wrap around at both ends so Tab/Shift+Tab stay inside the dialog.
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("keydown", onKeyDown);
      // Guard: the trigger may have unmounted while the dialog was open.
      previouslyFocused?.focus?.();
    };
  }, [isActive]);

  return containerRef;
};

export default useFocusTrap;
