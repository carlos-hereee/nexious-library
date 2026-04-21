import crypto from "crypto";

// Character pool for ID generation (alphanumeric + special characters)
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=[]{}|;:,.<>?";

// Default segment count and segment length
// Produces 4 segments of 6 characters joined by dashes (e.g. "aB3$xZ-Kp9!mQ-rT2&wY-Jn7@cF")
const DEFAULT_SEGMENTS = 4;
const SEGMENT_LENGTH = 6;

// Minimum total length before dashes are inserted between segments
const DASH_THRESHOLD = 10;

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
    const randomIndex = crypto.randomInt(0, chars.length);
    raw += chars[randomIndex];
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
