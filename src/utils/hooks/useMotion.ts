// The one motion hook (design language 5.9). Returns props for an element that enters, exits or
// arrives as part of a list, built on the `--transition-*` tokens and safe under reduced motion.
// It works with or without a MotionProvider above it; the provider only changes the defaults.
import { useCallback, useContext, useMemo } from "react";
import type { MotionApi, MotionOptions, MotionSpeed } from "nxs-motion";
import { MotionContext } from "@nxs-utils/motion/motionContext";
import { buildMotionProps, exitDurationMs, staggerDelayMs } from "@nxs-utils/motion/motionEnvelope";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Hook - useMotion
 *
 * Spread the result of `enter()`, `exit()` or `stagger(index)` onto the element that moves:
 * `<section {...motion.enter()}>`. The stylesheet animates opacity and transform only, never
 * layout, and an element is clickable from its first frame, so motion never blocks input.
 *
 * Reduced motion: every pattern resolves to an opacity fade with no translate or scale, stagger
 * delays drop to zero, and the global kill switch lands the fade on its end state at once.
 */
export const useMotion = (): MotionApi => {
  const defaults = useContext(MotionContext);
  const reducedMotion = usePrefersReducedMotion();

  const enter = useCallback(
    (options?: MotionOptions) => buildMotionProps("enter", defaults, reducedMotion, options),
    [defaults, reducedMotion]
  );
  const exit = useCallback(
    (options?: MotionOptions) => buildMotionProps("exit", defaults, reducedMotion, options),
    [defaults, reducedMotion]
  );
  const stagger = useCallback(
    (index: number, options?: MotionOptions) => {
      const delay = staggerDelayMs(index, options?.speed ?? defaults.speed, reducedMotion);
      return buildMotionProps("enter", defaults, reducedMotion, options, delay);
    },
    [defaults, reducedMotion]
  );
  const exitDuration = useCallback(
    (speed?: MotionSpeed) => exitDurationMs(speed ?? defaults.speed, reducedMotion),
    [defaults, reducedMotion]
  );

  return useMemo(
    () => ({ reducedMotion, enter, exit, stagger, exitDurationMs: exitDuration }),
    [reducedMotion, enter, exit, stagger, exitDuration]
  );
};
