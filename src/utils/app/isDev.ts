// Dev-mode gate for the library's own diagnostics (missing-prop warnings, unregistered-icon
// errors, the ErrorMessage overlay). Relies on process.env.NODE_ENV, which webpack and Node
// define. CAVEAT: a bare Vite app does not always replace process.env.NODE_ENV inside library
// code, so these diagnostics can be off in a Vite dev build unless the consumer defines it
// (see the README "Dev diagnostics" note). import.meta.env.DEV would be the Vite-native check
// but cannot be used here — the bare `import.meta` token breaks the CommonJS test compile
// (ts-jest) and would need a jest ESM config to land.
export const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";
