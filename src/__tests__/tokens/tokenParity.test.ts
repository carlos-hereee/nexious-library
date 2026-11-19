import { readFileSync } from "fs";
import { resolve } from "path";
import { color, fontSize, fontWeight, layout, lineHeight, radius, shadow, space, type } from "../../tokens";

// ── Why this file exists ─────────────────────────────────────────────────────────
// src/tokens/index.ts is a hand kept mirror of vars/_tokens.scss and vars/_control.scss for native
// code, and a mirror with no check drifts the first time someone edits one side. This reads the
// ACTUAL SCSS declarations per block (:root, the `.dark-mode, [data-theme="dark"]` block and
// `.arcane-mode`), resolves var() across both files, converts rem to px at 16, and asserts:
//   ① every TS value equals its SCSS value, in every theme;
//   ② every SCSS token is either mirrored in TS or named in NOT_MIRRORED with a reason, so a new
//     token forces a decision instead of silently going missing from native code.
// It runs in library CI through `npm test`. The client's own parity test (the client copy against
// this library source) is a separate, local only gate on the client side.

// ── Token parsing ────────────────────────────────────────────────────────────────

type TokenMap = Record<string, string>;
type ThemeName = "light" | "dark" | "arcane";

const VARS_DIRECTORY = resolve(__dirname, "../../stylesheets/vars");
const TOKEN_FILES = ["_tokens.scss", "_control.scss"];
const DARK_SELECTOR = /^\.dark-mode,\s*\[data-theme="dark"\]$/;
const ARCANE_SELECTOR = ".arcane-mode";
const PX_PER_REM = 16;
const MAX_INDIRECTION_HOPS = 10;

/** Strip SCSS comments; the `(^|\s)` guard keeps a `//` inside a value from being eaten. */
const stripComments = (scss: string): string =>
  scss.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|\s)\/\/[^\n]*/g, "$1");

/** Which theme map a token block feeds, or null for a selector that is not a theme root. */
const selectTarget = (
  selector: string,
  maps: { light: TokenMap; darkOverrides: TokenMap; arcaneOverrides: TokenMap }
): TokenMap | null => {
  if (selector === ":root") return maps.light;
  if (DARK_SELECTOR.test(selector)) return maps.darkOverrides;
  if (selector === ARCANE_SELECTOR) return maps.arcaneOverrides;
  return null;
};

/**
 * One map per theme, built the way the cascade builds it: dark is light plus the dark overrides,
 * and arcane is light, then dark, then the Arcane overrides, because the platform shell sets
 * `dark-mode arcane-mode` together. An unrecognized block fails loudly, since a token declared
 * under a selector this parser skips would silently escape the mirror.
 */
const readThemeMaps = (): Record<ThemeName, TokenMap> => {
  const light: TokenMap = {};
  const darkOverrides: TokenMap = {};
  const arcaneOverrides: TokenMap = {};
  const blockPattern = /([^{}]+)\{([^{}]*)\}/g;
  const declarationPattern = /(--[\w-]+)\s*:\s*([^;]+);/g;

  TOKEN_FILES.forEach((file) => {
    const source = stripComments(readFileSync(resolve(VARS_DIRECTORY, file), "utf8"));
    for (let block = blockPattern.exec(source); block !== null; block = blockPattern.exec(source)) {
      const selector = block[1].trim();
      const target = selectTarget(selector, { light, darkOverrides, arcaneOverrides });
      if (!target) throw new Error(`${file}: unrecognized token block selector "${selector}".`);
      declarationPattern.lastIndex = 0;
      for (let decl = declarationPattern.exec(block[2]); decl !== null; decl = declarationPattern.exec(block[2])) {
        target[decl[1]] = decl[2].trim().replace(/\s+/g, " ");
      }
    }
  });

  return {
    light,
    dark: { ...light, ...darkOverrides },
    arcane: { ...light, ...darkOverrides, ...arcaneOverrides },
  };
};

/** Substitute every var() reference, composites included, until only literals remain. */
const resolveValue = (map: TokenMap, value: string, hops = 0): string => {
  if (hops > MAX_INDIRECTION_HOPS) throw new Error(`${value} exceeded ${MAX_INDIRECTION_HOPS} var() hops (cycle?).`);
  return value.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, name: string) => {
    const referenced = map[name];
    if (referenced === undefined) throw new Error(`${name} is referenced but never declared.`);
    return resolveValue(map, referenced, hops + 1);
  });
};

/** A bare px or rem length as a px number, or null when the value is not one. */
const toPx = (value: string): number | null => {
  const match = /^(-?[\d.]+)(px|rem)$/.exec(value);
  if (!match) return null;
  return match[2] === "rem" ? Number(match[1]) * PX_PER_REM : Number(match[1]);
};

const isColorLiteral = (value: string): boolean =>
  /^#[0-9a-f]{3,8}$/i.test(value) || /^rgba?\(/i.test(value) || value === "crimson";

const kebabToCamel = (name: string): string => name.replace(/-([a-z0-9])/g, (_, char: string) => char.toUpperCase());

const themes = readThemeMaps();
const resolved = (theme: ThemeName, name: string): string => resolveValue(themes[theme], themes[theme][name]);

// ── The classification ───────────────────────────────────────────────────────────
// Each SCSS token lands in exactly one TS group by name, colors by value. The scale patterns are
// explicit because --text-secondary is a color while --text-small is a size: a bare `--text-`
// prefix test would put them in the same bucket.

const FONT_SIZE_PATTERN = /^--text-(extra-small|small|base|large|extra-large|\dx-large)$/;
const TYPE_ROLE_PATTERN = /^--type-([a-z-]+)-(size|weight|line-height)$/;
const LAYOUT_TOKENS = ["--content-max", "--measure", "--max-card-width", "--rail-width"];

/** Tokens native code has no use for, each with the reason it is left out of the TS module. */
const NOT_MIRRORED: Record<string, string> = {
  "--brand-wash": "a color-mix() wash; React Native has no color-mix",
  "--tracking-overline": "an em letter spacing, relative to a CSS font size",
  "--elevation-1": "an alias of --shadow-small",
  "--elevation-2": "an alias of --shadow-medium",
  "--elevation-3": "an alias of --shadow-large",
  "--transition-fast": "a CSS transition shorthand",
  "--transition-base": "a CSS transition shorthand",
  "--transition-slow": "a CSS transition shorthand",
  "--skeleton-duration": "a CSS animation duration for the web skeleton",
  "--row-height": "web list row geometry",
  "--row-height-dense": "web list row geometry",
  "--min-button-width": "web button geometry",
  "--z-base": "web stacking order",
  "--z-raised": "web stacking order",
  "--z-sticky": "web stacking order",
  "--z-dropdown": "web stacking order",
  "--z-overlay": "web stacking order",
  "--z-toast": "web stacking order",
  "--z-command": "web stacking order",
  "--control-height-small": "web control geometry (_control.scss)",
  "--control-height": "web control geometry (_control.scss)",
  "--control-height-large": "web control geometry (_control.scss)",
  "--control-padding-y-small": "web control geometry (_control.scss)",
  "--control-padding-x-small": "web control geometry (_control.scss)",
  "--control-padding-y": "web control geometry (_control.scss)",
  "--control-padding-x": "web control geometry (_control.scss)",
  "--control-padding-y-large": "web control geometry (_control.scss)",
  "--control-padding-x-large": "web control geometry (_control.scss)",
  "--control-radius-input": "an alias of a radius step",
  "--control-radius-button": "an alias of a radius step",
  "--focus-ring-width": "the web outline focus ring",
  "--focus-ring-offset": "the web outline focus ring",
  "--focus-ring": "a CSS outline shorthand",
  "--tap-target-min": "web touch target floor; native platforms enforce their own",
};

type Expected = { group: string; key: string; value: string | number };

/** Where a non color SCSS token is expected in the TS module, or null when it is not a scale token. */
const classifyScale = (name: string, value: string): Expected | null => {
  if (name.startsWith("--space-")) return { group: "space", key: kebabToCamel(name.slice(8)), value: toPx(value) ?? value };
  if (FONT_SIZE_PATTERN.test(name)) return { group: "fontSize", key: kebabToCamel(name.slice(7)), value: toPx(value) ?? value };
  if (name.startsWith("--font-")) return { group: "fontWeight", key: kebabToCamel(name.slice(7)), value: Number(value) };
  if (name.startsWith("--line-height-")) return { group: "lineHeight", key: kebabToCamel(name.slice(14)), value: Number(value) };
  if (name.startsWith("--radius-")) return { group: "radius", key: kebabToCamel(name.slice(9)), value: toPx(value) ?? value };
  if (name.startsWith("--shadow-")) return { group: "shadow", key: kebabToCamel(name.slice(9)), value };
  if (LAYOUT_TOKENS.includes(name)) return { group: "layout", key: kebabToCamel(name.slice(2)), value: toPx(value) ?? value };
  return null;
};

const SCALE_GROUPS: Record<string, Record<string, string | number>> = {
  space,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  shadow,
  layout,
};

const lightNames = Object.keys(themes.light);
const themeNames: ThemeName[] = ["light", "dark", "arcane"];

// ── The contract ─────────────────────────────────────────────────────────────────

describe("token parsing", () => {
  it("reads all three theme blocks out of both token files", () => {
    expect(lightNames.length).toBeGreaterThan(100);
    expect(resolved("light", "--surface")).toBe("#ffffff");
    expect(resolved("dark", "--surface")).toBe("#111c2e");
    expect(resolved("arcane", "--surface")).toBe("#171331");
  });

  it("layers Arcane on dark, so a token Arcane leaves alone keeps its dark value", () => {
    expect(resolved("arcane", "--accent")).toBe(resolved("dark", "--accent"));
    // The ring's Arcane override sits in _control.scss, after that file's own dark block.
    expect(resolved("arcane", "--focus-ring-color")).toBe(resolved("light", "--arcane-accent-strong"));
  });

  it("declares no token in a theme block that :root does not define", () => {
    // A token that exists only under a theme class has no light value, so a light page would read
    // nothing and native code would have no light entry for it.
    const themeOnly = Object.keys(themes.arcane).filter((name) => !(name in themes.light));
    expect(themeOnly).toEqual([]);
  });
});

describe("scale tokens: TS mirrors SCSS", () => {
  const scaleTokens = lightNames
    .map((name) => ({ name, expected: classifyScale(name, resolved("light", name)) }))
    .filter((entry): entry is { name: string; expected: Expected } => entry.expected !== null);

  it.each(scaleTokens.map(({ name, expected }) => [name, expected] as const))("%s", (_name, expected) => {
    expect(SCALE_GROUPS[expected.group][expected.key]).toEqual(expected.value);
  });

  it.each(Object.entries(SCALE_GROUPS))("every %s entry has an SCSS source", (group, entries) => {
    const sourced = scaleTokens.filter(({ expected }) => expected.group === group).map(({ expected }) => expected.key);
    expect(Object.keys(entries).sort()).toEqual([...sourced].sort());
  });

  it("does not let a scale token change per theme", () => {
    // The scale groups are theme independent in TS, so a dark or Arcane override of one would be
    // a value native code can never see.
    const themed = scaleTokens.filter(({ name }) => resolved("dark", name) !== resolved("light", name) || resolved("arcane", name) !== resolved("light", name));
    expect(themed.map(({ name }) => name)).toEqual([]);
  });
});

describe("type roles: TS mirrors SCSS", () => {
  const roles = Array.from(
    new Set(lightNames.map((name) => TYPE_ROLE_PATTERN.exec(name)?.[1]).filter((role): role is string => Boolean(role)))
  );

  it("mirrors every role and no other", () => {
    expect(Object.keys(type).sort()).toEqual(roles.map(kebabToCamel).sort());
  });

  it.each(roles)("--type-%s", (role) => {
    expect(type[kebabToCamel(role) as keyof typeof type]).toEqual({
      size: toPx(resolved("light", `--type-${role}-size`)),
      weight: Number(resolved("light", `--type-${role}-weight`)),
      lineHeight: Number(resolved("light", `--type-${role}-line-height`)),
    });
  });
});

describe.each(themeNames)("colors: the %s theme", (theme) => {
  const colorTokens = lightNames.filter((name) => isColorLiteral(resolved(theme, name)));

  it.each(colorTokens)("%s", (name) => {
    const key = kebabToCamel(name.slice(2)) as keyof (typeof color)["light"];
    expect(color[theme][key]).toBe(resolved(theme, name));
  });

  it("has an SCSS source for every TS color", () => {
    expect(Object.keys(color[theme]).sort()).toEqual(colorTokens.map((name) => kebabToCamel(name.slice(2))).sort());
  });
});

describe("coverage", () => {
  it("puts every SCSS token in a TS group or names why it is left out", () => {
    const unaccounted = lightNames.filter(
      (name) =>
        classifyScale(name, resolved("light", name)) === null &&
        !TYPE_ROLE_PATTERN.test(name) &&
        !themeNames.every((theme) => isColorLiteral(resolved(theme, name))) &&
        !(name in NOT_MIRRORED)
    );
    expect(unaccounted).toEqual([]);
  });

  it("keeps NOT_MIRRORED honest: every name on it is a real token", () => {
    expect(Object.keys(NOT_MIRRORED).filter((name) => !(name in themes.light))).toEqual([]);
  });
});
