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
   * The heading's level, forwarded to EmptyState, which defaults to 3. Read by PageNotFound only:
   * a 404 is the whole page, so its consumer passes 1 and the page gets the one h1 it needs.
   */
  headingLevel?: EmptyStateProps["headingLevel"];
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
  /**
   * The root element. "div" by default, which is what every existing caller renders. A gate that
   * stands in for a whole page region passes "section" or "article" so the region is a landmark
   * a screen reader can reach, rather than an anonymous box.
   */
  as?: "div" | "section" | "article";
  /**
   * The heading's level, 3 by default for the same reason as `as`. A gate that replaces a page's
   * main content sits directly under the page title, so it needs an h2 or the document outline
   * skips a level.
   */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * One slot per part. A key that is set REPLACES that part's default class, for a consumer that
   * styles the part with its own system (a design-system button, a hint paragraph) and must not
   * inherit the library rule underneath it. Unlike the `*ClassName` props, which APPEND.
   */
  classNames?: {
    root?: string;
    icon?: string;
    heading?: string;
    message?: string;
    action?: string;
    actions?: string;
  };
  /**
   * Rendered as given after the icon and before the heading, with no wrapper. For a glyph the
   * icon registry does not hold (an emoji, an illustration); `icon` still covers registry keys.
   */
  media?: React.ReactNode;
  /**
   * A row of the caller's own controls, for a surface with more than one next step or an action
   * only some readers get. When set it renders in `.empty-state-actions` and the single
   * `actionLabel` button is NOT rendered, so the two can never stack.
   */
  actions?: React.ReactNode;
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
/** The dev only teaching panel a component renders when it was called wrong. */
export type DevErrorMessageProps = {
  error: ErrorProp;
  /**
   * Force the dev panel on or off for this call, overriding both setDevMode() and the
   * NODE_ENV probe. Pass `false` to guarantee nothing renders in a production bundle
   * whose NODE_ENV the bundler did not replace.
   */
  isDev?: boolean;
  message?: undefined;
  className?: undefined;
};
/**
 * The user facing error line (2026-11 item 337, reconciled from nexious-client's
 * features/app/components/ErrorMessage.tsx): a `role="alert"` paragraph that renders in every
 * mode, so a failed submit is announced the moment it appears.
 */
export type InlineErrorMessageProps = {
  /** The error sentence, already translated. */
  message: string;
  /** Appended to `error-message nxs-error-message`. */
  className?: string;
  error?: undefined;
  isDev?: undefined;
};
/**
 * ErrorMessage has two modes chosen by its props: `error` renders the dev only teaching panel
 * (the 4.x contract, unchanged), `message` renders the user facing alert line.
 */
export type ErrorMessageProps = DevErrorMessageProps | InlineErrorMessageProps;

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

// ── The store states in front of a money surface (2026-11 item 337, Phase 5) ────
/** The six strings StripeReadyGate shows, already translated by the caller. */
export interface StripeReadyGateCopy {
  storeMissingTitle: string;
  storeMissingBody: string;
  storeMissingAction: string;
  stripeTitle: string;
  stripeBody: string;
  stripeAction: string;
}
export interface StripeReadyGateProps {
  /** The app has no store: only the set up link renders. */
  storeMissing: boolean;
  /** The store exists but its Stripe account is unfinished: the content renders view only. */
  storeNotReady: boolean;
  /** Where the set up link goes. */
  setUpStorePath: string;
  /** Sends the owner into Stripe's hosted onboarding. */
  finishStripe: () => void;
  copy: StripeReadyGateCopy;
  /** A router link component for the set up link; it receives `to` and `className`. */
  linkComponent?: React.ElementType;
  /** The glyph above the no store heading. */
  storeMissingMedia?: React.ReactNode;
  /** The glyph above the unfinished Stripe heading. */
  stripeMedia?: React.ReactNode;
  /** The empty state's class, so each caller keeps its own spacing. */
  className?: string;
  /** Replaces the Finish Stripe button's class (a caller inside a dialog passes its button class). */
  actionClassName?: string;
  /** The content behind the gate; `viewOnly` is true while Stripe is unfinished. */
  children: (viewOnly: boolean) => React.ReactNode;
}
