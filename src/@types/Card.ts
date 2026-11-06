import type { AssetProps, UserProps } from "nxs-assets";

export type DialogProps = {
  className?: string;
  label?: string;
  toggleLabel?: string;
  toggleShow?: boolean;
  onDialogClose?: () => void;
  onConfirmClick?: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
  header?: { heading?: string; subtitle?: string; data?: string };
  // Opt-in modal semantics. When true Dialog adds role="dialog" + aria-modal, traps
  // focus, and closes on Escape. Defaults off so consumers that already wrap Dialog in
  // their own modal shell (e.g. a DialogOverlay with its own focus trap) are unaffected
  // and do not get nested dialog roles or double Escape handling.
  asModal?: boolean;
};
export type CTAProp = {
  name: string;
  className?: string;
  label: string;
  icon?: string;
  uid?: string;
  sharedKey?: string;
  heroId?: string;
  // onClick?: (key: unknown) => void;
};
export interface BannerProps {
  className?: string;
  message?: string;
  children?: React.ReactNode;
}
export interface ItemDetailProps {
  label?: string;
  value?: string;
  hint?: { title: string; body: string };
  labelLayout?: "bolden";
  children?: React.ReactNode;
}
export interface MerchProps {
  cost: number;
  inStock: number;
  quantity: number;
  name: string;
  body: string;
  hero?: AssetProps;
  uid: string;
}
export interface PCardheader {
  title?: string;
  subtitle?: string;
  className?: string;
  details?: string;
  hero?: AssetProps;
}
export interface CardProp {
  title?: string;
  tagline?: string;
  body?: string;
  description?: string;
  name?: string;
  className?: string;
  label?: string;
  hero?: AssetProps;
  uid?: string;
  subtitle?: string;
  hasHero?: boolean;
  hasFeatures?: boolean;
  isForSale?: boolean;
  isBookable?: boolean;
  isAccessory?: boolean;
  quantity?: number;
  inStock?: number;
  count?: number;
  cost?: number;
  hyperlink?: { word: string; link: string }[];
  features?: { uid: string; title: string; hasList: boolean; list: string[] }[];
  cta?: CTAProp[];
}
export interface CardProps {
  data: CardProp;
  className?: string;
  canRemove?: boolean;
  hero?: AssetProps;
  showPrice?: boolean;
  showItemTotal?: boolean;
  hidePrice?: boolean;
  hideButtons?: boolean;
  children?: React.ReactNode;
  // NOTE: used inconsistently, Card.tsx calls onClick(cta: CTAProp) while MerchCard.tsx passes
  // it straight to a <button onClick> (a MouseEvent). The `unknown` masks the conflict; narrowing
  // it needs Card and MerchCard reconciled to one contract first (FUTURE_PLANS item 80 #6).
  onClick?: (key: unknown) => void;
  onRemoveFromCart?: (key: unknown) => void;
  onAddToCart?: (key: unknown) => void;
  setQuantity?: (key: number) => void;
}
export interface HeroCardProps {
  data: CardProp;
  hero?: AssetProps;
  className?: string;
  onClick?: (key: unknown) => void;
  viewAsPreview?: boolean;
}
export interface CTAProps {
  cta: CTAProp;
  onClick?: (key: unknown) => void;
  // onClick?: (key: unknown) => void;
  viewAsPreview?: boolean;
}
export interface CardSectionProps {
  hero?: AssetProps;
  hideReadMore?: boolean;
  data?: string;
  className?: string;
}
export interface Section {
  title: string;
  uid: string;
  subtitle: string;
  details: string;
  body: string;
  className?: string;
  sharedKey?: string;
  heroId?: string;
  sectionHero?: AssetProps;
  hero?: AssetProps;
}
export interface CardSectionList {
  sections: Section[];
  className?: string;
  handleClick: (link: unknown) => void;
}

export interface UserCardProps {
  hideLabels?: boolean;
  hideHero?: boolean;
  className?: string;
  user: UserProps;
  // See HeroProps.isDev, overrides dev-panel visibility for this component.
  isDev?: boolean;
}

export type PaymentType = {
  uid: string;
  type: string;
  hero?: AssetProps;
  name?: string;
  icon?: string;
};
export type PaymentMethodsProps = {
  data: PaymentType[];
  active: PaymentType;
  heading?: string;
  errorMessage?: string;
  onClick: (e: PaymentType) => void;
  visaPayment?: (a: unknown) => void;
  paypalPayment?: (e: unknown) => void;
  inStorePayment?: (a: unknown) => void;
};
export interface CartProps {
  data: MerchProps[];
  heading: string;
  removeFromCart: (e: MerchProps) => void;
  onEditDetails: (e: MerchProps) => void;
  setQuantity: (e: MerchProps, count: number) => void;
  className?: string;
  readOnly?: boolean;
  showItemTotal?: boolean;
}

// ── CardGrid and SelectCard ──────────────────────────────────────────────────────
/** A responsive grid of cards that collapses to one column on its own, with no breakpoint. */
export type CardGridProps = {
  /**
   * "div" by default. "nav" when the cards are the way through a section (a quick nav), so the
   * grid is a navigation landmark; give it an `ariaLabel` then, or two navs read the same.
   */
  as?: "div" | "nav";
  ariaLabel?: string;
  /** Appended to the root's classes, for a page's own grid modifier. */
  className?: string;
  /** `root` REPLACES the default `nxs-card-grid` class. */
  classNames?: { root?: string };
  children: React.ReactNode;
};
/**
 * A clickable card: an icon, a title, a supporting line and room for a badge. The element is
 * chosen from the props, so a card is a link, a button or an inert tile without the caller
 * branching: `href` and `linkAs` render the router's link with `to`, `href` alone a plain
 * anchor, `onClick` a button, and anything else (including `disabled`) an inert div that
 * announces itself as disabled.
 */
export type SelectCardProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Rendered inside a hidden wrapper; the title names the card, never the glyph. */
  icon?: React.ReactNode;
  /** Rendered after the subtitle, for a badge or a status pill. */
  children?: React.ReactNode;
  onClick?: () => void;
  /** Passed through safeUrl, like every anchor the library renders. */
  href?: string;
  /**
   * The consumer's router link (react-router's Link, for example). It receives `to`, so an
   * in-app destination navigates without a full page reload. The library imports no router.
   */
  linkAs?: React.ElementType;
  /** Renders the inert branch whatever else is set. */
  disabled?: boolean;
  selected?: boolean;
  /** The card's accessible name when the visible title alone is not enough. */
  ariaLabel?: string;
  ariaCurrent?: React.AriaAttributes["aria-current"];
  /** Appended to the root's classes. */
  className?: string;
  /**
   * One slot per part. A key that is set REPLACES that part's default class, so a consumer with
   * its own card system does not inherit the library card underneath it. `selected` replaces the
   * class added while `selected` is true.
   */
  classNames?: { root?: string; icon?: string; title?: string; subtitle?: string; selected?: string };
};
