/**
 * @jest-environment node
 */
import * as path from "path";
import * as sass from "sass";
import { parse } from "postcss-scss";

// Locks the library's `prefers-reduced-motion` contract (design language 5.9, Phase 4 rule 8).
//
// It compiles the real stylesheet and asserts against the COMPILED CSS rather than the SCSS,
// because the media feature is written once inside `mixins.reduced-motion` and a source grep for
// "prefers-reduced-motion" therefore returns only the mixin body. A previous session read exactly
// that grep and concluded the kill switch did not exist. It does; this test proves it every run.
//
// The rule worth automating is the one a human misses: the global kill switch SHORTENS an
// animation (1ms, one iteration) instead of removing it. For a one-shot enter that is the right
// degrade, it lands on the end state in the first frame. For a LOOPING animation it turns a
// 1.2s shimmer into a strobe, so every `infinite` animation needs its own `animation: none`
// override. `.bubble` was missing one and nothing caught it.
//
// It runs under the `node` test environment because dart-sass's Windows case-correcting path
// resolver throws a NullError inside jest's jsdom environment, which is a harness quirk rather
// than anything about the stylesheet.
//
// The parser is postcss-scss and not postcss for a dependency reason, not a syntax one. Plain CSS
// is a subset of SCSS so the AST is identical, and postcss-scss is a declared devDependency while
// postcss itself only arrives transitively under stylelint.
const STYLESHEET_ENTRY = path.resolve(__dirname, "../../stylesheets/index.scss");
const REDUCED_MOTION_QUERY = /prefers-reduced-motion:\s*reduce/;

type AnimationSite = {
  /** One selector from the parent rule's list, e.g. `.icon-spin` out of `.icon-spin, .icon-pulse`. */
  selector: string;
  value: string;
  /** Byte offset in the compiled sheet. Two equal-specificity rules are decided by this. */
  offset: number;
};

/**
 * A structural stand-in for a postcss node. Walking postcss's own `parent` chain means casting on
 * every hop (the declared type is a Container | Document union), and the walk only ever reads a
 * node's type and, for an at-rule, its name and params.
 */
type StyleNode = { type: string; name?: string; params?: string; parent?: StyleNode };

const compiled = sass.compile(STYLESHEET_ENTRY, { sourceMap: false }).css;
const root = parse(compiled);

/** True when any ancestor at-rule is the reduced-motion media query. */
const isReducedMotion = (from: StyleNode | undefined): boolean => {
  let node = from;
  while (node) {
    if (node.type === "atrule" && node.name === "media" && REDUCED_MOTION_QUERY.test(node.params || "")) return true;
    node = node.parent;
  }
  return false;
};

const splitSelectors = (selector: string): string[] =>
  selector
    .split(",")
    .map((part) => part.trim().replace(/\s+/g, " "))
    .filter(Boolean);

const animated: AnimationSite[] = [];
const looping: AnimationSite[] = [];
const guards: AnimationSite[] = [];
const killSwitch: { duration?: string; iterations?: string; transform?: string } = {};

root.walkDecls((decl) => {
  const prop = decl.prop.toLowerCase();
  if (!prop.startsWith("animation") && prop !== "transform") return;
  // A keyframe step parses as a rule too (`from`, `60%`), so its declarations arrive here. They
  // fall out below: a step never carries `animation` or `animation-name`.
  if (decl.parent?.type !== "rule") return;
  const rule = decl.parent as unknown as { selector: string };
  const value = decl.value.trim();
  const offset = decl.source?.start?.offset ?? 0;
  const reduced = isReducedMotion(decl.parent as unknown as StyleNode);
  const selectors = splitSelectors(rule.selector);

  // postcss lifts `!important` off the value onto decl.important, so the flag has to be read
  // separately. It is the load-bearing half of the kill switch: without it a component's own
  // hover transform outranks the reset on specificity and the switch does nothing.
  const stamped = decl.important ? `${value} !important` : value;

  // The kill switch is the reduced-motion rule that targets the universal selector, in two parts:
  // `*` for the animation clamp, `*:hover` and friends for the transform strip.
  if (reduced && selectors.includes("*")) {
    if (prop === "animation-duration") killSwitch.duration = stamped;
    if (prop === "animation-iteration-count") killSwitch.iterations = stamped;
    return;
  }
  if (reduced && selectors.some((sel) => sel.startsWith("*:"))) {
    if (prop === "transform") killSwitch.transform = stamped;
    return;
  }
  if (prop === "transform") return;

  selectors.forEach((selector) => {
    const site = { selector, value, offset };
    const names = prop === "animation" || prop === "animation-name";
    if (reduced) {
      if (names && value === "none") guards.push(site);
      return;
    }
    if (names) animated.push(site);
    const loops =
      (prop === "animation" && /(^|\s)infinite(\s|$)/.test(value)) ||
      (prop === "animation-iteration-count" && value === "infinite");
    if (loops) looping.push(site);
  });
});

describe("prefers-reduced-motion contract", () => {
  it("emits the global kill switch with the correctly spelled media feature", () => {
    // Regression guard for the `prefers-reduced-inputdirection` typo, which is not a real media
    // feature and so silently disabled every animation guard in the library for months.
    expect(compiled).toMatch(REDUCED_MOTION_QUERY);
    expect(killSwitch).toMatchObject({ duration: "1ms !important", iterations: "1 !important" });
  });

  it("strips transforms from the interaction pseudo-classes only", () => {
    // Scoped to :hover/:focus/:focus-visible/:active on purpose. A transform at rest is layout
    // (icon rotation, centering, the mobile-nav circle reveal) and must survive. See the block
    // comment in vars/reset/_index.scss for the case this scoping still does NOT cover.
    expect(killSwitch).toMatchObject({ transform: "none !important" });
  });

  it("finds the animations this contract is written about", () => {
    // A smoke check on the parse itself: if a refactor moved the animations behind a token or a
    // different property, every assertion below would pass vacuously and prove nothing.
    expect(looping.length).toBeGreaterThanOrEqual(4);
    expect(guards.length).toBeGreaterThanOrEqual(4);
  });

  it.each([[".icon-spin"], [".icon-pulse"], [".bubble"], [".skeleton-bar"]])(
    "%s is a known looping animation",
    (selector) => {
      // Named explicitly so deleting a loop is a deliberate edit to this list rather than a silent
      // drop in coverage of the generic sweep below.
      expect(looping.map((site) => site.selector)).toContain(selector);
    }
  );

  it("gives every looping animation its own animation: none override", () => {
    const unguarded = looping.filter((site) => !guards.some((guard) => guard.selector === site.selector));
    expect(unguarded.map((site) => `${site.selector} { animation: ${site.value} }`)).toEqual([]);
  });

  it("orders each override after the rule it overrides", () => {
    // The guard and the rule it cancels carry the SAME selector and neither is !important, so the
    // cascade decides on source order alone. A guard emitted above its own rule parses fine,
    // lints clean, and does nothing at all.
    const misordered = looping
      .filter((site) => !guards.some((guard) => guard.selector === site.selector && guard.offset > site.offset))
      .map((site) => site.selector);
    expect(misordered).toEqual([]);
  });

  it("leaves no override pointing at a selector that no longer animates", () => {
    // A guard that outlived its animation (a rename, a deleted component) is dead weight that
    // still reads as coverage.
    const animatedSelectors = new Set(animated.map((site) => site.selector));
    const orphans = guards.filter((guard) => !animatedSelectors.has(guard.selector)).map((guard) => guard.selector);
    expect(orphans).toEqual([]);
  });

  it("guards the dialog scrim and panel so an enter fades out rather than flashing", () => {
    // These two are one-shots, so the kill switch alone would already land them on their end
    // state. They carry explicit guards anyway because a 1ms fade is a repaint the user pays for
    // with nothing to show, and the design language says drop the motion and keep the end state.
    const guarded = guards.map((guard) => guard.selector);
    expect(guarded).toContain(".dialog-overlay");
    expect(guarded).toContain(".dialog");
  });

  it("leaves the mobile-nav drawer on the kill switch, which lands it on its end state", () => {
    // Deliberately unguarded: `animation-delay: -1ms` plus `animation-duration: 1ms` starts
    // circleOpen already finished, so clip-path reads circle(250%) on the first frame, and the
    // animationend that Header listens for still fires. An `animation: none` here would remove
    // that event for no visual gain. The reasoning is at the call site in _mobile-navigation.scss.
    const drawer = animated.find((site) => site.selector.includes("[data-state=open]"));
    expect(drawer?.value).toContain("circleOpen");
    expect(guards.some((guard) => guard.selector === drawer?.selector)).toBe(false);
  });
});
