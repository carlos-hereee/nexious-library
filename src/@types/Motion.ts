import type { CSSProperties, ReactNode } from "react";

// ── Motion (design language 5.9) ─────────────────────────────────────────────────
/**
 * The three named speeds, one per `--transition-*` token. A caller picks a ROLE rather than a
 * number, which is what keeps every motion in the product inside the 300ms core ceiling.
 */
export type MotionSpeed = "fast" | "base" | "slow";

/**
 * The named enter and exit patterns. "fade-rise" is the 5.9 "fade and rise" (opacity plus an 8px
 * lift, for content entering a region); "fade" is opacity alone. Under reduced motion every
 * pattern resolves to "fade", because translate and scale are what the setting asks to drop.
 */
export type MotionPattern = "fade-rise" | "fade";

export type MotionOptions = {
  /** Defaults to the nearest MotionProvider's pattern, else "fade-rise". */
  pattern?: MotionPattern;
  /** Defaults to the nearest MotionProvider's speed, else "base". */
  speed?: MotionSpeed;
  /** Appended to the motion classes, never replacing them. */
  className?: string;
};

/**
 * What enter, exit and stagger return: spread it onto the element that moves. `style` carries
 * only the `--motion-delay` custom property, and only for a staggered item past the first.
 */
export type MotionProps = {
  className: string;
  style?: CSSProperties;
};

export type MotionApi = {
  /** The live `prefers-reduced-motion: reduce` answer, for the rare caller that branches in JS. */
  reducedMotion: boolean;
  /** Props for an element entering on mount. */
  enter: (options?: MotionOptions) => MotionProps;
  /** Props for an element leaving. Keep it mounted for `exitDurationMs` before removing it. */
  exit: (options?: MotionOptions) => MotionProps;
  /** Enter props for the item at `index` of a list, delayed so the list settles in order. */
  stagger: (index: number, options?: MotionOptions) => MotionProps;
  /** How long an exit runs, in ms, so a caller can unmount after it. Zero under reduced motion. */
  exitDurationMs: (speed?: MotionSpeed) => number;
};

/**
 * The defaults a subtree's motion starts from. This is the seam a per-app personality plugs into
 * later: a provider higher in the tree changes how a region moves without its call sites changing.
 */
export type MotionDefaults = {
  pattern: MotionPattern;
  speed: MotionSpeed;
};

export type MotionProviderProps = Partial<MotionDefaults> & {
  children: ReactNode;
};
