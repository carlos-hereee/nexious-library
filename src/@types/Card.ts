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
  // The hint's labels ride along so a consumer can localize the toggle and close controls.
  hint?: { title: string; body: string; toggleLabel?: string; closeLabel?: string };
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
// ── Card (nxs-card) and ListRow ───────────────────────────────────────────────────
/** The heading level a card's or row's title renders at, so it fits the page's outline. */
export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6;
/**
 * The nxs-card recipe: optional top media, a title and a supporting line, the body as children,
 * and a footer of actions. The card is never a button itself; to make the whole card clickable,
 * pass a link or button with the `nxs-card-link` class as (or inside) the `title`, and its
 * overlay covers the card while the title stays its accessible name.
 *
 * `data` must be absent: a `data` prop selects the 4.x legacy markup (`CardProps`).
 */
export interface CardContentProps {
  data?: undefined;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Rendered first, in `nxs-card-media`; an image here carries its own alt (empty when decorative). */
  media?: React.ReactNode;
  /** Actions at the card's foot, raised above a stretched title link so they stay pressable. */
  footer?: React.ReactNode;
  /** 3 by default. The title renders as this heading, or as nothing when there is no title. */
  headingLevel?: CardHeadingLevel;
  /** The selected look; announce the state on the child control (aria-pressed or aria-current). */
  isSelected?: boolean;
  /** "div" by default; "article" for a self contained item, "li" inside a list. */
  as?: "div" | "article" | "li";
  /** Appended to the root's classes. */
  className?: string;
  /** The card's body. */
  children?: React.ReactNode;
}
/**
 * One row of a list: a lead (icon, avatar or thumbnail), a body of a title, a supporting line and
 * any extra children, a meta slot and an actions slot. Flush, never a box; put rows in an
 * `nxs-list-row-group` (a `ul` when each row is an `li`) for the dividers. Like Card, a row is
 * clickable only through a child link or button with the `nxs-list-row-link` class in its title.
 */
export interface ListRowProps {
  /** Decorative by default (hidden); give an image its own alt when it carries meaning. */
  lead?: React.ReactNode;
  /** Whether the lead is hidden from assistive technology. True by default. */
  isLeadDecorative?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Trailing facts (a time, a count, a status pill). */
  meta?: React.ReactNode;
  /** Trailing controls, raised above a stretched title link so they stay pressable. */
  actions?: React.ReactNode;
  /** Renders the title as this heading; by default the title is plain text, as most rows are. */
  headingLevel?: CardHeadingLevel;
  isDense?: boolean;
  /** The selected look; announce the state on the child control (aria-pressed or aria-current). */
  isSelected?: boolean;
  /** "div" by default; "li" inside a `ul.nxs-list-row-group`. */
  as?: "div" | "li";
  /** Appended to the root's classes. */
  className?: string;
  /** Extra body content after the title and subtitle. */
  children?: React.ReactNode;
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

// ── BoardCard and EventCard (2026-11 item 337, Session 4b) ──

/** One column a BoardCard can move to: the value `onMove` receives and the name the menu shows. */
export interface BoardCardMoveOption {
  value: string;
  label: string;
}
/**
 * One card on a kanban board, on the nxs-card recipe. It renders the card and its Move to select,
 * the single pointer alternative to dragging that WCAG 2.2 SC 2.5.7 requires; dragging itself stays
 * with the caller, which wraps the card in its own draggable element.
 */
export interface BoardCardProps {
  /** The card's name, a heading. Put the opener here (a button or link with `nxs-card-link`). */
  title: React.ReactNode;
  /** Facts under the title (a customer, a price, a due day), in `nxs-board-card-meta`. */
  meta?: React.ReactNode;
  /** Status pills, in `nxs-board-card-badges`. */
  badges?: React.ReactNode;
  /** Anything else in the body, after the badges. */
  children?: React.ReactNode;
  /** Every column the board has, or only the legal targets; `currentColumn` is left out of the menu. */
  moveOptions?: BoardCardMoveOption[];
  /** The column the card sits in now, by value. */
  currentColumn?: string;
  /** Fired with the chosen column's value. With no `onMove`, or no other column, there is no select. */
  onMove?: (value: string) => void;
  /** The select's accessible name and its placeholder row ("Move to"). Required with `onMove`. */
  moveLabel?: string;
  /** Unique on the page; the select's id derives from it. A generated id when absent. */
  id?: string;
  /** 3 by default, as on Card. */
  headingLevel?: CardHeadingLevel;
  /** Dims the card while the caller drags it. */
  isDragging?: boolean;
  isSelected?: boolean;
  /** "div" by default; "li" inside a column's list. */
  as?: "div" | "article" | "li";
  /** Appended to the root's classes. */
  className?: string;
}

/** The one event an EventCard shows, already shaped by the caller. */
export interface EventCardEvent {
  title: React.ReactNode;
  /** An ISO date time, a bare YYYY-MM-DD day (read as that local day), or a Date. */
  start: string | Date;
  end?: string | Date;
  /** The dates are days: `dateTime` carries YYYY-MM-DD and the formatter is told so. */
  isAllDay?: boolean;
  location?: React.ReactNode;
  badges?: React.ReactNode;
  /** Makes the title a link; passed through safeUrl. */
  href?: string;
}
/** Which end of the event a formatted date is, so a caller can word the end ("until 9 PM"). */
export type EventCardDatePart = "start" | "end";
/**
 * One event as a card (`density="card"`, on Card) or a row (`density="row"`, on ListRow). Every
 * visible date goes through the caller's `formatDate`, so the library bakes in no locale or time
 * zone, and each one sits in a `time` element whose `dateTime` a machine can read.
 */
export interface EventCardProps {
  event: EventCardEvent;
  /** Turns a date into the text a reader sees. Called once per date shown. */
  formatDate: (date: Date, part: EventCardDatePart, isAllDay: boolean) => string;
  /** "card" by default. */
  density?: "card" | "row";
  /** Card: 3 by default. Row: the title is plain text unless this is set. */
  headingLevel?: CardHeadingLevel;
  /** Shown between the start and the end. A visual arrow, hidden from speech, when absent. */
  rangeSeparator?: React.ReactNode;
  /** A badge for an all day event ("All day"); nothing extra when absent. */
  allDayLabel?: string;
  /** Read before the location by a screen reader only ("Location"). */
  locationLabel?: string;
  /** The caller's router link; it receives `to`. A plain anchor when absent. */
  linkComponent?: React.ElementType;
  /** Card footer, or the row's actions slot. */
  actions?: React.ReactNode;
  /** A row's lead slot (an icon or a date block); unused by the card density. */
  lead?: React.ReactNode;
  /** "article" by default for a card, "div" for a row; "li" inside a list. */
  as?: "div" | "article" | "li";
  /** Appended to the root's classes. */
  className?: string;
  /** A description or anything else, after the location. */
  children?: React.ReactNode;
}
