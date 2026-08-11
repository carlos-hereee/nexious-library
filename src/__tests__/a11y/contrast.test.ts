import { readFileSync } from "fs";
import { resolve } from "path";

// ── Why this file exists ─────────────────────────────────────────────────────────
// The token layer and the changelog carry contrast CLAIMS in prose: "~5.1:1" and "~5.5:1"
// on the badge pairs (vars/_tokens.scss), "still AA on white (~4.6:1)" and "still AA on
// --surface" on the quiet text ramp, "6.19:1 light, 9.92:1 dark" on the error text
// (CHANGELOG). A number written in a comment rots the moment a token moves, and nothing
// catches it. These tests read the ACTUAL declarations out of vars/_tokens.scss and
// vars/_control.scss and recompute every pair, so changing a token either keeps this green
// or fails it HERE, with the measured number, rather than in a user's eyes six releases
// later.
//
// The math is implemented inline instead of pulled from a package. WCAG 2.x relative
// luminance plus (L1 + 0.05) / (L2 + 0.05) is about fifteen lines, and adding a runtime
// dependency to a published library for a test-only need is a decision the owner would
// have to approve.

// ── Token parsing ────────────────────────────────────────────────────────────────

type TokenMap = Record<string, string>;
type ThemeName = "light" | "dark";

/**
 * Strip SCSS comments before parsing. The token files are mostly prose, and a `//` line
 * that happens to contain a colon would otherwise read as a declaration. The `(^|\s)`
 * guard keeps a `//` inside a value (a protocol-relative URL, say) from being eaten.
 */
const stripComments = (scss: string): string =>
  scss.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/[^\n]*/g, "$1");

/**
 * Read the token layer into one map per theme. Both files declare a `:root` block and a
 * `.dark-mode, [data-theme="dark"]` block, neither nested, so a flat block scan is enough
 * and does not need a real SCSS parser. Dark is built as light-plus-overrides on purpose:
 * that is what the cascade actually does, and it is why pairs the dark block never
 * reassigns (--success-accent-color, --status-on-accent) still have to be asserted on dark.
 */
const readThemeMaps = (): Record<ThemeName, TokenMap> => {
  const light: TokenMap = {};
  const darkOverrides: TokenMap = {};

  for (const file of ["_tokens.scss", "_control.scss"]) {
    const source = stripComments(readFileSync(resolve(__dirname, "../../stylesheets/vars", file), "utf8"));
    const blockPattern = /([^{}]+)\{([^{}]*)\}/g;
    const declarationPattern = /(--[\w-]+)\s*:\s*([^;]+);/g;

    for (let block = blockPattern.exec(source); block !== null; block = blockPattern.exec(source)) {
      const [, selector, body] = block;
      const isDark = /\.dark-mode|\[data-theme="dark"\]/.test(selector);
      const target = selector.includes(":root") ? light : isDark ? darkOverrides : null;
      if (!target) continue;
      declarationPattern.lastIndex = 0;
      for (let decl = declarationPattern.exec(body); decl !== null; decl = declarationPattern.exec(body)) {
        target[decl[1]] = decl[2].trim();
      }
    }
  }

  return { light, dark: { ...light, ...darkOverrides } };
};

const themes = readThemeMaps();

const MAX_INDIRECTION_HOPS = 8;
/** A value that is EXACTLY one var() reference, with or without a fallback. */
const singleReference = /^var\(\s*(--[\w-]+)\s*(?:,\s*([^)]*))?\)$/;

/**
 * Follow simple var() indirection (--focus-ring-color points at --main-brand-color, which
 * points at a hex). Only a whole-value reference is followed: a composite value such as
 * `--focus-ring: 2px solid var(--focus-ring-color)` is returned verbatim and will fail in
 * parseColor with a readable message, which is the right outcome because it is not a color.
 */
const resolveToken = (map: TokenMap, name: string, hops = 0): string => {
  const raw = map[name];
  if (raw === undefined) throw new Error(`Token ${name} is not declared in the token layer.`);
  if (hops > MAX_INDIRECTION_HOPS) throw new Error(`Token ${name} exceeded ${MAX_INDIRECTION_HOPS} var() hops (cycle?).`);
  const reference = singleReference.exec(raw);
  if (!reference) return raw;
  const [, referenced, fallback] = reference;
  if (map[referenced] === undefined && fallback) return fallback.trim();
  return resolveToken(map, referenced, hops + 1);
};

// ── Color math (WCAG 2.x) ────────────────────────────────────────────────────────

type Rgba = { r: number; g: number; b: number; a: number };

// The only CSS named color the token layer uses today (--danger-accent-color: crimson).
// Deliberately not a full CSS name table: an unrecognized name should fail loudly rather
// than fall through to black and quietly report a contrast ratio that means nothing.
const namedColors: Record<string, Rgba> = { crimson: { r: 220, g: 20, b: 60, a: 1 } };

const parseColor = (raw: string): Rgba => {
  const value = raw.trim().toLowerCase();

  // color-mix() values (--brand-wash) are wash TINTS layered over a surface, not text or
  // surface colors, and resolving one needs a real CSS engine. Out of scope, and saying so
  // here beats a mystery NaN if a future pair reaches for one.
  if (value.startsWith("color-mix(")) {
    throw new Error(`${raw} is a color-mix() value: a wash tint, not a text or surface color. Out of scope for contrast.`);
  }

  if (value.startsWith("#")) {
    const digits = value.slice(1);
    const full = digits.length <= 4 ? digits.split("").map((digit) => digit + digit).join("") : digits;
    if (full.length !== 6 && full.length !== 8) throw new Error(`Cannot parse hex color ${raw}.`);
    const channel = (index: number) => parseInt(full.slice(index * 2, index * 2 + 2), 16);
    return { r: channel(0), g: channel(1), b: channel(2), a: full.length === 8 ? channel(3) / 255 : 1 };
  }

  const functional = /^rgba?\(([^)]+)\)$/.exec(value);
  if (functional) {
    const parts = functional[1].split(/[,/\s]+/).filter(Boolean).map(Number);
    if (parts.length < 3 || parts.some(Number.isNaN)) throw new Error(`Cannot parse rgb color ${raw}.`);
    return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
  }

  const named = namedColors[value];
  if (named) return named;
  throw new Error(`Cannot parse color ${raw}.`);
};

/**
 * Source-over compositing. WCAG defines a ratio between two OPAQUE colors, so an alpha
 * color has no contrast ratio on its own, only against a stated backdrop: --hover-bg is
 * rgba(15, 23, 42, 0.04) and means nothing until you say what it sits on.
 */
const compositeOver = (foreground: Rgba, backdrop: Rgba): Rgba => ({
  r: foreground.r * foreground.a + backdrop.r * (1 - foreground.a),
  g: foreground.g * foreground.a + backdrop.g * (1 - foreground.a),
  b: foreground.b * foreground.a + backdrop.b * (1 - foreground.a),
  a: 1,
});

const relativeLuminance = ({ r, g, b }: Rgba): number => {
  const linear = (value: number) => {
    const srgb = value / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
};

const contrastRatio = (foreground: Rgba, background: Rgba): number => {
  if (background.a < 1) throw new Error("Background must be opaque: composite it onto a real surface first.");
  const front = foreground.a < 1 ? compositeOver(foreground, background) : foreground;
  const brighter = Math.max(relativeLuminance(front), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(front), relativeLuminance(background));
  return (brighter + 0.05) / (darker + 0.05);
};

// ── Assertion helpers ────────────────────────────────────────────────────────────

// WCAG 1.4.3 Contrast (Minimum), normal-size text. Large text (24px, or 18.66px bold) may
// use 3:1, and none of the pairs below qualify: they are body copy, badge labels and meta.
const BODY_TEXT_AA = 4.5;
// WCAG 1.4.11 Non-text Contrast. A focus indicator is a UI component boundary, not text,
// so its bar is 3:1. Asserting 4.5 here would be as wrong as asserting 3 on body copy: it
// would fail a ring that is compliant and teach the next reader the wrong number.
const NON_TEXT_AA = 3;

type Measurement = { ratio: number; foregroundValue: string; backgroundValue: string };

const measure = (theme: ThemeName, foreground: string, background: string): Measurement => {
  const foregroundValue = resolveToken(themes[theme], foreground);
  const backgroundValue = resolveToken(themes[theme], background);
  return {
    ratio: contrastRatio(parseColor(foregroundValue), parseColor(backgroundValue)),
    foregroundValue,
    backgroundValue,
  };
};

const describePair = (theme: ThemeName, foreground: string, background: string, measured: Measurement) =>
  `[${theme}] ${foreground} (${measured.foregroundValue}) on ${background} (${measured.backgroundValue}) ` +
  `measures ${measured.ratio.toFixed(2)}:1`;

/**
 * Throws with the pair, the theme, the resolved values, the measured ratio and the bar.
 * A bare `expect(ratio).toBeGreaterThan(4.5)` failing at 3am tells nobody which token moved.
 */
const assertContrast = (
  theme: ThemeName,
  foreground: string,
  background: string,
  minimum: number,
  criterion: string
): void => {
  const measured = measure(theme, foreground, background);
  if (measured.ratio < minimum) {
    throw new Error(`WCAG ${criterion}: ${describePair(theme, foreground, background, measured)}, requires ${minimum}:1.`);
  }
  expect(measured.ratio).toBeGreaterThanOrEqual(minimum);
};

const allThemes: ThemeName[] = ["light", "dark"];
// Every text pair is asserted on BOTH surfaces. They are close but not identical (light
// --bg is #f9fafb, not white), and a token tuned against one can quietly miss on the other.
const surfaces = ["--surface", "--bg"];

// ── The sanity layer: verify the math before trusting what it says about tokens ──
// An untested contrast implementation asserting on real tokens can be silently wrong in
// BOTH directions, passing a failing pair or failing a good one. These pin it to published
// reference values first.

describe("contrast math", () => {
  it("reports 21:1 for white on black, the WCAG maximum", () => {
    expect(contrastRatio(parseColor("#ffffff"), parseColor("#000000"))).toBeCloseTo(21, 5);
  });

  it("reports 1:1 for a color against itself", () => {
    expect(contrastRatio(parseColor("#4f46e5"), parseColor("#4f46e5"))).toBeCloseTo(1, 5);
  });

  it("puts #767676 on white just over AA, the canonical boundary gray", () => {
    expect(contrastRatio(parseColor("#767676"), parseColor("#ffffff"))).toBeCloseTo(4.5422, 3);
  });

  it("expands #rgb shorthand the same way a browser does", () => {
    expect(parseColor("#fff")).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseColor("#fff")).toEqual(parseColor("#ffffff"));
  });

  it("composites a translucent foreground onto its backdrop before measuring", () => {
    // 50% black over white lands on exactly 127.5 per channel, half a step off #808080, so
    // the composite is checked directly rather than against the nearest hex. Without this
    // step an alpha color has no defined luminance and the ratio would be nonsense.
    expect(compositeOver(parseColor("rgba(0, 0, 0, 0.5)"), parseColor("#ffffff"))).toEqual({
      r: 127.5,
      g: 127.5,
      b: 127.5,
      a: 1,
    });
    const translucent = contrastRatio(parseColor("rgba(0, 0, 0, 0.5)"), parseColor("#ffffff"));
    expect(translucent).toBeCloseTo(contrastRatio(parseColor("#808080"), parseColor("#ffffff")), 1);
    expect(translucent).toBeLessThan(contrastRatio(parseColor("#000000"), parseColor("#ffffff")));
  });

  it("refuses a translucent background instead of guessing what is behind it", () => {
    expect(() => contrastRatio(parseColor("#ffffff"), parseColor("rgba(0, 0, 0, 0.5)"))).toThrow(/opaque/);
  });

  it("refuses color-mix() values rather than inventing a number for them", () => {
    expect(() => parseColor(themes.light["--brand-wash"])).toThrow(/color-mix/);
  });
});

describe("token parsing", () => {
  it("reads both theme blocks out of the token layer", () => {
    expect(Object.keys(themes.light).length).toBeGreaterThan(30);
    expect(themes.light["--surface"]).toBe("#ffffff");
    expect(themes.dark["--surface"]).toBe("#111c2e");
  });

  it("lets dark inherit every token it does not reassign", () => {
    // The dark block never touches the status ACCENT set, so it must cascade from :root.
    // If that ever stops being true the accent assertions below silently change meaning.
    expect(themes.dark["--success-accent-color"]).toBe(themes.light["--success-accent-color"]);
    expect(themes.dark["--status-on-pending"]).toBe(themes.light["--status-on-pending"]);
  });

  it("follows var() indirection to a concrete color", () => {
    // --focus-ring-color is declared only as a reference, and it points at DIFFERENT brands
    // per theme, which is the whole reason the ring is a token rather than an inlined value.
    expect(resolveToken(themes.light, "--focus-ring-color")).toBe(themes.light["--main-brand-color"]);
    expect(resolveToken(themes.dark, "--focus-ring-color")).toBe(themes.dark["--main-brand-color-accent"]);
  });
});

// ── The contract ─────────────────────────────────────────────────────────────────

describe.each(allThemes)("WCAG contrast: %s theme", (theme) => {
  describe.each(surfaces)("body text on %s", (surface) => {
    it("--text clears 1.4.3 AA", () => {
      assertContrast(theme, "--text", surface, BODY_TEXT_AA, "1.4.3");
    });

    it("--text-secondary clears 1.4.3 AA", () => {
      // The token comments claim this on both themes ("still AA on white", "still AA on
      // --surface"). This is that claim, executable.
      assertContrast(theme, "--text-secondary", surface, BODY_TEXT_AA, "1.4.3");
    });

    it("--text-muted clears 1.4.3 AA", () => {
      // This pair is why the file exists. Dark --text-muted was #64748b, measuring 3.59:1 on
      // --surface and 3.96:1 on --bg, while the token's own comment claimed AA by citing a
      // LIGHT-mode number. Raised to #7c8ba1 in the same pass that added these assertions.
      //
      // It was never a large-text exemption: .text-mute in styles/_typography.scss sets the color
      // with NO font-size, so it lands at whatever size it is used, and .post-card-handle and
      // .post-card-date pin it at --text-small (14px), under the 18.66px-bold / 24px threshold.
      assertContrast(theme, "--text-muted", surface, BODY_TEXT_AA, "1.4.3");
    });
  });

  describe.each([
    ["--success-text", "--success-bg"],
    ["--warn-text", "--warn-bg"],
    ["--danger-text", "--danger-bg"],
    ["--info-text", "--info-bg"],
  ])("status surface %s on %s", (text, background) => {
    it("clears 1.4.3 AA", () => {
      // Each status ships as a bg/border/text SET so a badge can be built from tokens alone.
      // A set is only usable if its own text passes on its own fill, in both themes.
      assertContrast(theme, text, background, BODY_TEXT_AA, "1.4.3");
    });
  });

  describe.each([
    ["--status-on-accent", "--success-accent-color"],
    ["--status-on-pending", "--pending-accent-color"],
  ])("badge label %s on %s", (label, accent) => {
    it("clears 1.4.3 AA", () => {
      // These two pairs were picked together (the green was darkened to #2e7d46 precisely so
      // white would pass), and the comments claim ~5.1:1 and ~5.5:1. Neither is reassigned on
      // dark, so a dark badge rides the light values and has to be checked there too.
      assertContrast(theme, label, accent, BODY_TEXT_AA, "1.4.3");
    });
  });

  describe.each(surfaces)("focus ring on %s", (surface) => {
    it("clears 1.4.11 non-text contrast", () => {
      // 3:1, NOT 4.5:1. The ring is a UI component boundary under 1.4.11, not text under
      // 1.4.3, and both mistakes are real defects: demanding 4.5 would fail a compliant ring.
      // The indigo genuinely fails on navy, which is why --focus-ring-color swaps to the
      // lighter brand accent on dark, and this is the assertion that keeps that swap honest.
      assertContrast(theme, "--focus-ring-color", surface, NON_TEXT_AA, "1.4.11");
    });
  });

  it("--danger-text stays AA on --bg, where .required error text renders", () => {
    // CHANGELOG records this pair at "6.19:1 light, 9.92:1 dark" after .required was moved off
    // the danger ACCENT (which measured 3.77:1 on dark). Pinning it stops a later token tweak
    // from walking that fix back.
    assertContrast(theme, "--danger-text", "--bg", BODY_TEXT_AA, "1.4.3");
  });
});

// The hierarchy, not just the floor. Two quiet-text tokens that measure the same are one token
// with two names, and the cheapest way to "fix" a muted-text contrast failure is to raise muted
// until it IS secondary, which satisfies every other assertion in this file while quietly deleting
// a design distinction. This is the guard against that specific bad fix.
describe.each(allThemes)("quiet-text hierarchy: %s theme", (theme) => {
  it.each(surfaces)("--text-muted stays visibly quieter than --text-secondary on %s", (surface) => {
    const muted = measure(theme, "--text-muted", surface);
    const secondary = measure(theme, "--text-secondary", surface);
    expect(muted.ratio).toBeLessThan(secondary.ratio);
  });
});
