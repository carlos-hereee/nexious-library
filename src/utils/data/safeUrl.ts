// Neutralizes dangerous URL schemes before a consumer/user-supplied value reaches
// an anchor href. React escapes link TEXT but NOT the URL scheme, so a stored post
// or author href of "javascript:alert(document.cookie)" is a one-click stored-XSS
// sink in every consuming app. This guard allowlists the schemes that are safe in
// an href (http, https, mailto, tel) plus scheme-less URLs (relative, root-relative,
// anchor, query, protocol-relative); anything else collapses to "#". Dependency-free.

const ALLOWED_SCHEME = /^(https?:|mailto:|tel:)/i;

// Browsers ignore control characters and spaces when resolving a URL scheme, so
// "java\tscript:..." still executes. Drop every char at or below 0x20 (space +
// control chars like tab/newline) and 0x7f (DEL) before the safety test.
const stripIgnoredChars = (value: string): string =>
  Array.from(value)
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return code > 0x20 && code !== 0x7f;
    })
    .join("");

/**
 * Returns the URL only when it is safe to place in an href, otherwise "#".
 * @param url consumer/user-supplied URL (may be undefined/null)
 */
export const safeUrl = (url?: string | null): string => {
  if (!url) return "#";
  // Test against the stripped value, but return the ORIGINAL on the safe path so
  // legitimate paths and encoding are preserved.
  const cleaned = stripIgnoredChars(url);
  if (!cleaned) return "#";
  // Scheme-less URLs cannot smuggle a dangerous protocol; let them through.
  if (/^(\/|\.|#|\?)/.test(cleaned) || cleaned.startsWith("//")) return url;
  if (ALLOWED_SCHEME.test(cleaned)) return url;
  // A colon before the first slash means an explicit, non-allowlisted scheme
  // (javascript:, data:, vbscript:, ...) -> neutralize. A bare "example.com/x"
  // has no such colon and is treated as a relative path -> safe.
  const colon = cleaned.indexOf(":");
  const slash = cleaned.indexOf("/");
  if (colon !== -1 && (slash === -1 || colon < slash)) return "#";
  return url;
};

export default safeUrl;
