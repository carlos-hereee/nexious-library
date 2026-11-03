// Reusable component record: companyuno-growth/product-planning/DESIGNS/reusable-components/motion-provider/README.md
import { useContext, useMemo } from "react";
import type { MotionProviderProps } from "nxs-motion";
import { MotionContext } from "@nxs-utils/motion/motionContext";

/**
 * Component - MotionProvider
 *
 * Sets the default motion pattern and speed for every useMotion call beneath it (design
 * language 5.9). It renders no element of its own, so wrapping a region changes no layout.
 * A prop left unset inherits from the provider above, so providers nest: a shell can set the
 * speed and one region inside it can change only the pattern.
 *
 * It does not carry the reduced-motion answer. Each useMotion reads the media query live, so a
 * provider cannot hold a stale value that outranks the user's setting.
 */
const MotionProvider: React.FC<MotionProviderProps> = (props) => {
  const { pattern, speed, children } = props;
  const inherited = useContext(MotionContext);

  // Memoized on the resolved values, not the props object, so a parent re-render that passes the
  // same pattern and speed does not re-render every motion consumer below it.
  const resolvedPattern = pattern ?? inherited.pattern;
  const resolvedSpeed = speed ?? inherited.speed;
  const value = useMemo(() => ({ pattern: resolvedPattern, speed: resolvedSpeed }), [resolvedPattern, resolvedSpeed]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
};

export default MotionProvider;
