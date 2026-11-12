// The context MotionProvider writes and useMotion reads. It lives in utils rather than beside the
// provider so the hook can import it without a util importing a component. It carries defaults
// only, never the reduced-motion answer, which each hook reads live so no stale value can hide it.
import { createContext } from "react";
import type { MotionDefaults } from "nxs-motion";
import { DEFAULT_MOTION } from "./motionEnvelope";

export const MotionContext = createContext<MotionDefaults>(DEFAULT_MOTION);
