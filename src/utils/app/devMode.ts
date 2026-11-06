import { isDev } from "@nxs-utils/app/isDev";

// ── Dev-diagnostics switch ───────────────────────────────────────────────────
// WHY THIS EXISTS: the library's missing-prop panels are a build-time teaching tool.
// They must be loud in development and absent in production, and the env probe alone
// cannot guarantee that. `isDev` reads process.env.NODE_ENV, which a bare Vite app does
// NOT reliably replace inside pre-bundled library code, so a consumer could ship the
// panels to real users (unpolished) or lose them locally (useless). Both failures are
// silent, which is the worst kind.
//
// So dev mode is resolved from three sources, most specific first:
//   ① the `isDev` prop on <ErrorMessage> / <ErrorMessages>   (per-call override)
//   ② setDevMode(boolean) called once at app boot            (app-wide switch)
//   ③ process.env.NODE_ENV !== "production"                  (inherited default)
//
// ② mirrors `registerIcons`: a module-level registry the consumer configures at boot.
// It is the practical answer for Vite, where the consumer CAN read import.meta.env.DEV
// (replaced correctly in their own build) and hand the result to the library.

let devModeOverride: boolean | undefined;

/**
 * Set the library's dev-diagnostics mode for the whole app. Call once at boot, before
 * render. Pass `undefined` to fall back to the NODE_ENV probe.
 *
 * @example
 * // main.tsx, a Vite app
 * import { setDevMode } from "nexious-library";
 * setDevMode(import.meta.env.DEV);
 */
export const setDevMode = (value?: boolean): void => {
  devModeOverride = value;
};

/** Current app-wide setting, or undefined when nothing was set. Exposed for tests and debugging. */
export const getDevMode = (): boolean | undefined => devModeOverride;

/**
 * Resolve whether dev diagnostics should render, honoring the precedence above.
 * @param propValue the `isDev` prop as passed to the rendering component, if any
 */
export const resolveDevMode = (propValue?: boolean): boolean => {
  if (typeof propValue === "boolean") return propValue;
  if (typeof devModeOverride === "boolean") return devModeOverride;
  return isDev;
};
