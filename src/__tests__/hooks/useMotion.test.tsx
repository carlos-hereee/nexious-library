import { act, render, renderHook, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import MotionProvider from "@nxs-template/MotionProvider";
import { useMotion } from "@nxs-utils/hooks/useMotion";
import { MOTION_CEILING_MS, MOTION_SPEED_MS, staggerDelayMs } from "@nxs-utils/motion/motionEnvelope";

// Locks the JS half of the motion primitive (design language 5.9). The CSS half, what the classes
// actually animate and how reduced motion strips the translate, is asserted against the compiled
// stylesheet in a11y/motion.test.ts.

type ChangeListener = (event: { matches: boolean }) => void;

/**
 * jsdom ships no matchMedia, so each test installs a controllable one. `flip` fires the change
 * event the way a browser does when the OS setting changes mid session.
 */
const installReducedMotion = (initial: boolean) => {
  let matches = initial;
  const listeners = new Set<ChangeListener>();
  const queryList = {
    get matches() {
      return matches;
    },
    media: "(prefers-reduced-motion: reduce)",
    addEventListener: (_type: string, listener: ChangeListener) => listeners.add(listener),
    removeEventListener: (_type: string, listener: ChangeListener) => listeners.delete(listener),
  };
  Object.defineProperty(window, "matchMedia", { configurable: true, writable: true, value: () => queryList });
  return {
    flip: (next: boolean) => {
      matches = next;
      listeners.forEach((listener) => listener({ matches: next }));
    },
    listenerCount: () => listeners.size,
  };
};

afterEach(() => {
  // Leave jsdom as it was for every other suite: no matchMedia at all.
  Reflect.deleteProperty(window, "matchMedia");
});

describe("useMotion", () => {
  it("defaults to the 5.9 fade and rise at the base speed", () => {
    installReducedMotion(false);
    const { result } = renderHook(() => useMotion());

    expect(result.current.reducedMotion).toBe(false);
    expect(result.current.enter().className).toBe("motion motion-enter motion-fade-rise motion-base");
    expect(result.current.exit().className).toBe("motion motion-exit motion-fade-rise motion-base");
    expect(result.current.enter().style).toBeUndefined();
  });

  it("appends a caller class without replacing the motion classes", () => {
    installReducedMotion(false);
    const { result } = renderHook(() => useMotion());

    expect(result.current.enter({ className: "app-dashboard-grid" }).className).toBe(
      "motion motion-enter motion-fade-rise motion-base app-dashboard-grid"
    );
  });

  it("works with no matchMedia at all, reporting no preference", () => {
    // jsdom and server rendering. The CSS kill switch still covers real browsers.
    const { result } = renderHook(() => useMotion());
    expect(result.current.reducedMotion).toBe(false);
  });

  it("drops the translate, the stagger and the exit wait under reduced motion", () => {
    installReducedMotion(true);
    const { result } = renderHook(() => useMotion());

    expect(result.current.reducedMotion).toBe(true);
    expect(result.current.enter().className).toBe("motion motion-enter motion-fade motion-base");
    expect(result.current.enter({ pattern: "fade-rise" }).className).toContain("motion-fade ");
    expect(result.current.stagger(3).style).toBeUndefined();
    expect(result.current.exitDurationMs()).toBe(0);
  });

  it("follows the OS setting when it flips mid session, and unsubscribes on unmount", () => {
    const media = installReducedMotion(false);
    const { result, unmount } = renderHook(() => useMotion());
    expect(result.current.enter().className).toContain("motion-fade-rise");

    act(() => media.flip(true));
    expect(result.current.reducedMotion).toBe(true);
    expect(result.current.enter().className).not.toContain("motion-fade-rise");

    unmount();
    expect(media.listenerCount()).toBe(0);
  });

  it("staggers items in order and never lets a list run past the 300ms ceiling", () => {
    installReducedMotion(false);
    const { result } = renderHook(() => useMotion());

    expect(result.current.stagger(0).style).toBeUndefined();
    expect(result.current.stagger(1).style).toEqual({ "--motion-delay": "30ms" });
    // Base is 200ms, so the delay stops growing at 100ms and every later item starts together.
    expect(result.current.stagger(50).style).toEqual({ "--motion-delay": "100ms" });
    // Slow already spends the whole ceiling, so it has no room to stagger at all.
    expect(result.current.stagger(5, { speed: "slow" }).style).toBeUndefined();
  });

  it.each([["fast" as const], ["base" as const], ["slow" as const]])(
    "keeps delay plus duration inside the ceiling at the %s speed",
    (speed) => {
      for (let index = 0; index < 40; index += 1) {
        expect(staggerDelayMs(index, speed, false) + MOTION_SPEED_MS[speed]).toBeLessThanOrEqual(MOTION_CEILING_MS);
      }
    }
  );

  it("treats a negative or non numeric index as the first item", () => {
    expect(staggerDelayMs(-4, "base", false)).toBe(0);
    expect(staggerDelayMs(Number.NaN, "base", false)).toBe(0);
  });

  it("reports the exit duration for each speed", () => {
    installReducedMotion(false);
    const { result } = renderHook(() => useMotion());
    expect(result.current.exitDurationMs()).toBe(200);
    expect(result.current.exitDurationMs("fast")).toBe(150);
  });
});

describe("MotionProvider", () => {
  it("sets the defaults for the subtree, and nested providers change only what they pass", () => {
    installReducedMotion(false);
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MotionProvider speed="fast">
        <MotionProvider pattern="fade">{children}</MotionProvider>
      </MotionProvider>
    );
    const { result } = renderHook(() => useMotion(), { wrapper });

    expect(result.current.enter().className).toBe("motion motion-enter motion-fade motion-fast");
    // A call site option still outranks the provider.
    expect(result.current.enter({ pattern: "fade-rise" }).className).toContain("motion-fade-rise");
  });

  it("renders no element of its own, so wrapping a region changes no layout", () => {
    const { container } = render(
      <MotionProvider>
        <p>Region</p>
      </MotionProvider>
    );
    expect(container.childElementCount).toBe(1);
    expect(screen.getByText("Region").tagName).toBe("P");
  });

  it("cannot outrank reduced motion", () => {
    installReducedMotion(true);
    const wrapper = ({ children }: { children: ReactNode }) => <MotionProvider pattern="fade-rise">{children}</MotionProvider>;
    const { result } = renderHook(() => useMotion(), { wrapper });
    expect(result.current.enter().className).not.toContain("motion-fade-rise");
  });
});
