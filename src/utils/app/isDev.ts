// The ENV PROBE only. It is the lowest-precedence input to resolveDevMode (utils/app/devMode.ts),
// which is what components actually call; do not import this directly from a component.
//
// Relies on process.env.NODE_ENV, which webpack and Node define. CAVEAT: a bare Vite app does
// not always replace process.env.NODE_ENV inside library code, so this probe alone can be wrong
// in both directions. That unreliability is precisely why setDevMode() and the per-component
// `isDev` prop exist to override it (see the README "Dev diagnostics" section).
// import.meta.env.DEV would be the Vite-native check but cannot be used here, the bare
// `import.meta` token breaks the CommonJS test compile (ts-jest) and would need a jest ESM config.
export const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";
