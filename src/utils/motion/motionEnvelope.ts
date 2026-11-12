// The arithmetic and class building behind useMotion, kept pure so it is testable without React
// and so the 5.9 envelope (nothing in the core product runs past 300ms) is enforced in one place.
// It does not read the DOM or the media query; the hook hands it the reduced-motion answer.
// Called only by utils/hooks/useMotion.
import type { CSSProperties } from "react";
import type { MotionDefaults, MotionOptions, MotionPattern, MotionProps, MotionSpeed } from "nxs-motion";

// Hand-kept mirror of the `--transition-*` tokens in stylesheets/vars/_tokens.scss. The CSS reads
// the tokens directly; JS needs the numbers only to compute a stagger delay and to tell a caller
// when an exit has finished. src/__tests__/a11y/motion.test.ts fails if the two halves drift.
export const MOTION_SPEED_MS: Record<MotionSpeed, number> = { fast: 150, base: 200, slow: 300 };

// Design language 5.9: "No animation longer than 300ms in the core product". Applied to the whole
// staggered list rather than to each item, so a region is fully settled 300ms after it mounts no
// matter how many children it has.
export const MOTION_CEILING_MS = 300;

// 30ms between items reads as an ordered arrival rather than a single block; anything much wider
// and the base 200ms speed hits the ceiling by the fourth item, after which items start together.
export const MOTION_STAGGER_STEP_MS = 30;

export const DEFAULT_MOTION: MotionDefaults = { pattern: "fade-rise", speed: "base" };

type MotionDirection = "enter" | "exit";

// React's CSSProperties has no slot for a custom property, so the one this module sets is declared
// here instead of cast in, which keeps a typo in its name a compile error.
type MotionDelayStyle = CSSProperties & { "--motion-delay": string };

/**
 * The delay for item `index` of a staggered list, clamped so delay plus duration never passes
 * the ceiling. Zero under reduced motion: an ordered reveal is still motion, and the setting asks
 * for content to simply be there.
 */
export const staggerDelayMs = (index: number, speed: MotionSpeed, reducedMotion: boolean): number => {
  if (reducedMotion) return 0;
  // NaN and negative indexes both mean "first item", never a negative delay that would start the
  // animation part way through.
  const position = Number.isFinite(index) ? Math.max(0, Math.floor(index)) : 0;
  const headroom = Math.max(0, MOTION_CEILING_MS - MOTION_SPEED_MS[speed]);
  return Math.min(position * MOTION_STAGGER_STEP_MS, headroom);
};

/** Zero under reduced motion, where the exit lands on its end state in the first frame. */
export const exitDurationMs = (speed: MotionSpeed, reducedMotion: boolean): number =>
  reducedMotion ? 0 : MOTION_SPEED_MS[speed];

const resolvePattern = (pattern: MotionPattern, reducedMotion: boolean): MotionPattern =>
  reducedMotion ? "fade" : pattern;

/**
 * The class list and delay for one moving element. The CSS in styles/components/_motion.scss
 * does the animating; this only names which keyframes and which speed token apply.
 */
export const buildMotionProps = (
  direction: MotionDirection,
  defaults: MotionDefaults,
  reducedMotion: boolean,
  options: MotionOptions = {},
  delayMs = 0
): MotionProps => {
  const speed = options.speed ?? defaults.speed;
  const pattern = resolvePattern(options.pattern ?? defaults.pattern, reducedMotion);
  const classes = ["motion", `motion-${direction}`, `motion-${pattern}`, `motion-${speed}`];
  if (options.className) classes.push(options.className);
  const props: MotionProps = { className: classes.join(" ") };
  // A custom property rather than an inline animation-delay, so the stylesheet stays the one place
  // that decides how a delay is applied (and the reduced-motion kill switch can still override it).
  if (delayMs > 0) {
    const style: MotionDelayStyle = { "--motion-delay": `${delayMs}ms` };
    props.style = style;
  }
  return props;
};
