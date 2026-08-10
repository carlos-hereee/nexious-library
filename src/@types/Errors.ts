import type { AssetProps } from "nxs-assets";
import type { Variant } from "./Variant";

export type LightSystem = "green" | "yellow" | "red" | null;
export type RequiredTypesProps = { [key: string]: unknown };
export type ErrorCodes =
  | "missingProps"
  | "iconNotFound"
  | "missingAsset"
  | "missingInitialValues"
  | "wrongPropType"
  | "emptyCollection";
export interface ErrorMessageProp {
  prop: string;
  code: string;
  name: string;
  value?: unknown;
}
export interface ErrorProps {
  heading?: string;
  icon?: string;
  hero?: AssetProps;
  message?: string;
  component?: string;
  to?: string;
  children?: React.ReactNode;
  errors?: ErrorMessageProp[];
  timer?: number;
  handleClick?: () => void;
  // Overrides dev-mode detection for this list and every panel inside it. See resolveDevMode.
  isDev?: boolean;

  // ── The empty-state and skeleton slots (UI rework Phase 4) ──────────────────
  // EmptySection, ComingSoon and PageNotFound now render through one EmptyState pattern
  // (design language 5.10: icon, headline, a sentence of guidance, the next action), so the
  // slots that pattern needs are declared once here rather than three times.
  /** Label for the primary next action. Rendered only when set; the click is `handleClick`. */
  actionLabel?: string;
  /**
   * Variant for that action button, and it is deliberately UNSET by default. PageNotFound's
   * existing button renders with no library class at all, so defaulting it to "primary" would
   * repaint that button in every consumer as a side effect of a CSS refactor.
   */
  actionVariant?: Variant;
  /**
   * Opt IN to a skeleton placeholder instead of Loading's spinner. Absent means spinner, which
   * is the default on purpose: Loading renders on dozens of consumer surfaces and flipping them
   * all is an owner decision, not a refactor's side effect.
   */
  skeleton?: SkeletonShape;
  /** Rows or lines the opted-in skeleton draws. See SkeletonProps.count. */
  skeletonCount?: number;
}

// ── Loading placeholders (design language 5.10) ─────────────────────────────────
/**
 * The four content shapes a skeleton can stand in for. They exist as an enum rather than a
 * free string because the shape decides the reserved HEIGHT, and a typo would collapse the
 * region to nothing, which defeats the entire point of showing a skeleton.
 */
export type SkeletonShape = "row" | "block" | "page" | "text";
export type SkeletonProps = {
  /** Defaults to "row", the list case. */
  shape?: SkeletonShape;
  /** How many bars to draw. "page" reads this as the number of body lines under its header. */
  count?: number;
  /** Appended to the region's classes, never replacing them. */
  className?: string;
  /** The single thing a screen reader announces for the whole region. Defaults to "Loading". */
  label?: string;
};

// ── The empty-state pattern ─────────────────────────────────────────────────────
/**
 * Props for the one empty/error layout EmptySection, ComingSoon and PageNotFound all render
 * through, so the three cannot drift apart again.
 *
 * The three `*ClassName` escape hatches are not styling sugar: each of those wrappers carried a
 * class before this pattern existed (`.text-max`, `.page-not-found-message`, `.text-center`) that
 * a consumer's CSS may target, and this library cannot see the consumers. They APPEND, so the
 * pattern's own class is always present too.
 */
export type EmptyStateProps = {
  /** Registry key for the small glyph above the headline. No icon renders when unset. */
  icon?: string;
  iconSpin?: string;
  hero?: AssetProps;
  heading?: string;
  message?: string;
  actionLabel?: string;
  actionVariant?: Variant;
  onAction?: () => void;
  className?: string;
  iconClassName?: string;
  messageClassName?: string;
  children?: React.ReactNode;
};
export type ErrorProp = {
  value: { [key: string]: unknown } | unknown;
  code: ErrorCodes | string;
  prop: string;
  component?: string;
  // Extra one-off guidance appended to the panel, for cases the static spec cannot
  // know (e.g. the runtime list of registered icon keys).
  hint?: string;
};
export type ErrorMessageProps = {
  error: ErrorProp;
  /**
   * Force the dev panel on or off for this call, overriding both setDevMode() and the
   * NODE_ENV probe. Pass `false` to guarantee nothing renders in a production bundle
   * whose NODE_ENV the bundler did not replace.
   */
  isDev?: boolean;
};

// ── Component teaching specs (see utils/data/componentSpecs.ts) ──────────────
/** One required prop, described well enough that the reader does not need the docs. */
export type SpecProp = {
  name: string;
  /** The TypeScript type as written in src/@types, e.g. "AssetProps" or "string[] | MenuProp[]". */
  type: string;
  required?: boolean;
  /** A concrete literal of the accepted shape, shown verbatim in the panel. */
  shape?: string;
  description: string;
};
export type ComponentSpec = {
  /** Page slug under DOCS_BASE_URL. Must exist in the live docs catalog. */
  docsSlug: string;
  /** One or two sentences on how the component actually works, not what it is called. */
  summary: string;
  importStatement: string;
  props: SpecProp[];
  /** A copy-pasteable call that would satisfy the requirements above. */
  example: string;
  /** The mistakes that actually produce this error, each paired with its fix. */
  fixes: string[];
};
export type ComponentSpecMap = { [component: string]: ComponentSpec };
