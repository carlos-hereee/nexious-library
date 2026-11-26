/**
 * @jest-environment node
 */
import * as fs from "fs";
import * as path from "path";
import * as sass from "sass";
import { parse } from "postcss-scss";
import { MOTION_SPEED_MS } from "@nxs-utils/motion/motionEnvelope";

// Locks the CSS half of the motion primitive (design language 5.9) against the COMPILED sheet,
// for the same reason reducedMotion.test.ts does: the media feature lives once inside a mixin, so
// a source grep cannot prove a rule reaches the output. It runs under node for the dart-sass
// jsdom path quirk that suite's header describes.
const STYLESHEET_ENTRY = path.resolve(__dirname, "../../stylesheets/index.scss");
const TOKENS_FILE = path.resolve(__dirname, "../../stylesheets/vars/_tokens.scss");
const REDUCED_MOTION_QUERY = /prefers-reduced-motion:\s*reduce/;

type StyleNode = { type: string; name?: string; params?: string; parent?: StyleNode };

const compiled = sass.compile(STYLESHEET_ENTRY, { sourceMap: false }).css;
const root = parse(compiled);

const isReducedMotion = (from: StyleNode | undefined): boolean => {
  let node = from;
  while (node) {
    if (node.type === "atrule" && node.name === "media" && REDUCED_MOTION_QUERY.test(node.params || "")) return true;
    node = node.parent;
  }
  return false;
};

/** The `--motion-keyframes` each selector sets, split by whether it sits under reduced motion. */
const keyframesBySelector = { normal: new Map<string, string>(), reduced: new Map<string, string>() };
/** Every property each keyframe step touches, keyed by keyframes name. */
const keyframeProps = new Map<string, Set<string>>();

root.walkDecls((decl) => {
  const parent = decl.parent as unknown as { type: string; selector?: string; parent?: StyleNode };
  const grandparent = parent.parent;
  if (grandparent?.type === "atrule" && grandparent.name === "keyframes") {
    const name = grandparent.params || "";
    const props = keyframeProps.get(name) ?? new Set<string>();
    props.add(decl.prop);
    keyframeProps.set(name, props);
    return;
  }
  if (decl.prop !== "--motion-keyframes" || parent.type !== "rule") return;
  const bucket = isReducedMotion(parent as unknown as StyleNode) ? keyframesBySelector.reduced : keyframesBySelector.normal;
  bucket.set((parent.selector || "").replace(/\s+/g, " ").trim(), decl.value.trim());
});

describe("motion primitive stylesheet", () => {
  it("maps each direction and pattern to its keyframes", () => {
    expect(keyframesBySelector.normal.get(".motion-enter")).toBe("fadeIn");
    expect(keyframesBySelector.normal.get(".motion-exit")).toBe("fadeOut");
    expect(keyframesBySelector.normal.get(".motion-enter.motion-fade-rise")).toBe("motion-fade-rise-in");
    expect(keyframesBySelector.normal.get(".motion-exit.motion-fade-rise")).toBe("motion-fade-rise-out");
  });

  it("swaps fade and rise for a plain fade under reduced motion, in CSS alone", () => {
    // The hook does the same swap in JS, but a first painted frame can arrive before it reads the
    // media query, so the stylesheet must not depend on it.
    expect(keyframesBySelector.reduced.get(".motion-enter.motion-fade-rise")).toBe("fadeIn");
    expect(keyframesBySelector.reduced.get(".motion-exit.motion-fade-rise")).toBe("fadeOut");
  });

  it("keeps the reduced-motion keyframes free of any transform: opacity only", () => {
    ["fadeIn", "fadeOut"].forEach((name) => {
      expect([...(keyframeProps.get(name) ?? [])]).toEqual(["opacity"]);
    });
  });

  it("animates only opacity and transform, never layout", () => {
    ["motion-fade-rise-in", "motion-fade-rise-out"].forEach((name) => {
      expect([...(keyframeProps.get(name) ?? [])].sort()).toEqual(["opacity", "transform"]);
    });
  });

  it("reads its speeds from the --transition-* tokens rather than literals", () => {
    expect(compiled).toMatch(/\.motion-fast\s*\{\s*--motion-speed:\s*var\(--transition-fast\)/);
    expect(compiled).toMatch(/\.motion-base\s*\{\s*--motion-speed:\s*var\(--transition-base\)/);
    expect(compiled).toMatch(/\.motion-slow\s*\{\s*--motion-speed:\s*var\(--transition-slow\)/);
  });
});

describe("motion speed mirror", () => {
  it("matches the --transition-* tokens in _tokens.scss", () => {
    // MOTION_SPEED_MS in utils/motion/motionEnvelope.ts is a hand-kept mirror of these tokens; the
    // JS uses it for stagger and exit timing while the CSS reads the tokens directly.
    const tokens = fs.readFileSync(TOKENS_FILE, "utf8");
    (Object.keys(MOTION_SPEED_MS) as (keyof typeof MOTION_SPEED_MS)[]).forEach((speed) => {
      const match = tokens.match(new RegExp(`--transition-${speed}:\\s*(\\d+)ms`));
      expect(match?.[1]).toBe(String(MOTION_SPEED_MS[speed]));
    });
  });
});
