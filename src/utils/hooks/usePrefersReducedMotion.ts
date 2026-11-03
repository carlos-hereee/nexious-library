// Subscribes to `prefers-reduced-motion: reduce` so a component re-renders when the OS setting
// flips mid session, rather than reading it once at mount. It does not decide what reduced motion
// looks like; the stylesheet's kill switch and the motion envelope do. Used by useMotion.
import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// jsdom, server rendering and very old browsers have no matchMedia. Reporting "no preference"
// there is safe because the CSS kill switch still applies wherever the media query does exist.
const getQueryList = (): MediaQueryList | null =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(REDUCED_MOTION_QUERY)
    : null;

const subscribe = (onChange: () => void): (() => void) => {
  const queryList = getQueryList();
  if (!queryList) return () => undefined;
  queryList.addEventListener("change", onChange);
  return () => queryList.removeEventListener("change", onChange);
};

const readPreference = (): boolean => getQueryList()?.matches ?? false;
const readServerPreference = (): boolean => false;

/** True while the user has asked the OS for reduced motion. */
export const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(subscribe, readPreference, readServerPreference);
