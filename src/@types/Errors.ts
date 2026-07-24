import type { AssetProps } from "nxs-assets";

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
  isAProp: boolean;
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
}
export type ErrorProp = {
  value: { [key: string]: unknown } | unknown;
  code: ErrorCodes | string;
  prop: string;
  component?: string;
  isAProp?: boolean;
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
