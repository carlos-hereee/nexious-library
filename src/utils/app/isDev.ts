/** Auto-detect dev mode — works with Vite, Webpack, and Node bundlers */
export const isDev = typeof process !== "undefined" && process.env?.NODE_ENV !== "production";
