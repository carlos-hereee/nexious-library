// Character pool for ID generation (alphanumeric + special characters)
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=[]{}|;:,.<>?";

// Default segment count and segment length
// Produces 4 segments of 6 characters joined by dashes (e.g. "aB3$xZ-Kp9!mQ-rT2&wY-Jn7@cF")
const DEFAULT_SEGMENTS = 4;
const SEGMENT_LENGTH = 6;

// Minimum total length before dashes are inserted between segments
const DASH_THRESHOLD = 10;

// ── randomIndex ──
// What: returns a uniformly distributed integer in [0, max) using the Web Crypto
//       API, which is available in every modern browser and in Node >= 19.
// Why not Node's crypto.randomInt: that function does not exist in the browser.
//       When Vite sees `import crypto from "crypto"` in library code it provides
//       an empty shim whose default export has no randomInt, which crashed the
//       app with "import_crypto.default.randomInt is not a function" the first
//       time uniqueId ran in a browser bundle.
// How: read a single Uint32 of entropy, reject-sample the small bias at the top
//       of the 2^32 range so the output is exactly uniform, then modulo into
//       [0, max). Reject-sampling costs one extra draw in the worst case but
//       avoids the classic "top values slightly more likely" bug.
// Where: inline helper used only by uniqueId below; not exported.
const randomIndex = (max: number): number => {
  // Prefer globalThis.crypto (browser + modern Node). If a runtime somehow
  // lacks it, fall back to Math.random so the app still boots — uniqueId is
  // used for React keys and form uids, not for security-sensitive tokens.
  const g = (globalThis as unknown as { crypto?: Crypto }).crypto;
  if (!g?.getRandomValues) return Math.floor(Math.random() * max);

  // Reject any draw that lands in the biased tail above the largest multiple
  // of `max` that fits in 2^32. This keeps the distribution perfectly uniform.
  const range = 0x1_0000_0000; // 2^32
  const limit = range - (range % max);
  const buf = new Uint32Array(1);
  // Bounded retry loop. At max = 85 (current chars.length) the worst-case
  // rejection rate is ~0.00000002%, so this is effectively a single draw.
  for (let attempt = 0; attempt < 10; attempt++) {
    g.getRandomValues(buf);
    if (buf[0] < limit) return buf[0] % max;
  }
  // Should be unreachable; return the last draw modulo max as a safe fallback.
  return buf[0] % max;
};

/**
 * Generate a cryptographically random unique ID.
 * @param length optional total character count (default is 24 which maps to 4 segments of 6)
 * @returns a random string; if length > DASH_THRESHOLD, dashes are inserted every 6 characters
 */
export const uniqueId = (length?: number) => {
  // Total raw characters to generate
  const totalChars = length || DEFAULT_SEGMENTS * SEGMENT_LENGTH;

  // Build raw random string
  let raw = "";
  for (let i = 0; i < totalChars; i++) {
    raw += chars[randomIndex(chars.length)];
  }

  // If the string is short, return it as is with no dashes
  if (totalChars <= DASH_THRESHOLD) return raw;

  // Split into segments of SEGMENT_LENGTH and join with dashes
  const segments: string[] = [];
  for (let i = 0; i < raw.length; i += SEGMENT_LENGTH) {
    segments.push(raw.slice(i, i + SEGMENT_LENGTH));
  }
  return segments.join("-");
};
export const uniqueRandomList = (range: number) => {
  return Array.from({ length: range }, () => ({ id: uniqueId() }));
};
