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

// ── MetricRow (2026-11 item 337, Phase 5) ─────────────────────────────────────────
/** The direction of a metric's change, which picks the delta's tone. */
export type MetricTrend = "up" | "down" | "flat";

/**
 * One tile of a MetricRow. The caller formats every value (money, counts, locale), so the library
 * bakes in no currency or number format.
 */
export type MetricRowEntry = {
  /** Stable id, unique within the row; also rendered as `data-metric`. */
  id: string;
  /** The tile's label, already translated. */
  label: React.ReactNode;
  /** The formatted value. Absent renders `emptyText` in its place (a metric with no number). */
  value?: React.ReactNode;
  /** The formatted change ("+4.2%"), shown as a toned chip. */
  delta?: React.ReactNode;
  /** Picks the delta's tone; "flat" or absent is neutral. */
  trend?: MetricTrend;
  /**
   * The words a screen reader hears before the delta ("Up from last month"), because the tone
   * alone is color. Optional; without it the delta's text is read as is.
   */
  trendLabel?: string;
  /** A quiet line under the value (why it is derived, what it counts). */
  hint?: React.ReactNode;
  /** Shown instead of the value when `value` is absent ("Not available yet"). */
  emptyText?: React.ReactNode;
};

/**
 * The band of stat tiles that answers "how is this doing", ported from the client's
 * features/dashboard/components/MetricRow.tsx and its `cu-metric-row` and `cu-stat` primitives.
 */
export type MetricRowProps = {
  entries: readonly MetricRowEntry[];
  /** One trailing cell that is a status rather than a number, aligned with the tiles. */
  trailing?: React.ReactNode;
  /** Keeps the tiles on one line and scrolls the band sideways on a narrow screen. */
  isScrollable?: boolean;
  /** Names the band as a group for assistive tech ("This month"). Optional. */
  ariaLabel?: string;
  /** Appended to the band's classes. */
  className?: string;
};

// ── Phase 5 repair ports from the client (2026-11 item 337) ─────────────────────
/**
 * One attention item as a row: a link whose accessible name leads with the severity word, plus an
 * optional dismiss control outside the link. Every string arrives translated.
 */
export interface AttentionRowProps {
  /** The visible title, already interpolated. */
  title: string;
  /** The optional second line. */
  detail?: string;
  /** The severity word ("Revenue blocked"); it leads the link's accessible name. */
  severityLabel: string;
  /** The action verb ("Connect Stripe"), read after the severity word. */
  actionLabel?: string;
  /**
   * Replaces the composed accessible name. Without it the link reads
   * "severity. action: title. detail", joined with plain punctuation.
   */
  ariaLabel?: string;
  /** Where the row goes. Routed through `linkComponent` (receiving `to`) or a plain anchor. */
  href: string;
  /** A router link component; it receives `to`, `className` and `aria-label`. */
  linkComponent?: React.ElementType;
  /** The decorative glyph in the lead slot (hidden from assistive technology). */
  lead?: React.ReactNode;
  /** Appended to the lead's wrapper classes, for the caller's severity tone. */
  leadClassName?: string;
  /** Renders the dismiss control when set together with `dismissLabel`. */
  onDismiss?: () => void;
  /** The dismiss control's accessible name, already translated. */
  dismissLabel?: string;
  /** The dismiss glyph. Defaults to a multiplication sign hidden from speech. */
  dismissIcon?: React.ReactNode;
  /** "li" by default, inside the caller's list. */
  as?: "div" | "li";
  className?: string;
}

/** The official announcement as a feed card: a badge, the body, an optional link and a dismiss. */
export interface AnnouncementCardProps {
  /** The badge text that marks the card official ("Platform update"), already translated. */
  badgeLabel: string;
  /** A decorative glyph inside the badge. */
  badgeIcon?: React.ReactNode;
  body: React.ReactNode;
  /**
   * The optional external link, opened in a new tab; the href goes through safeUrl. `newTabHint`
   * ("opens in a new tab") is read after the label by a screen reader only.
   */
  link?: { href: string; label: string; newTabHint?: string };
  /** Renders the dismiss control when set together with `dismissLabel`; one press disables it. */
  onDismiss?: () => void;
  /** The dismiss control's accessible name, already translated. */
  dismissLabel?: string;
  /** The dismiss glyph. Defaults to a multiplication sign hidden from speech. */
  dismissIcon?: React.ReactNode;
  className?: string;
}

/** One ranked row: a label, an optional second line and a right aligned, already formatted figure. */
export interface RankListRow {
  /** The row's own id, used as the React key. */
  id: string;
  label: string;
  meta?: string;
  value: string;
}
export interface RankListProps {
  rows: RankListRow[];
  /** Shown instead of the list when there are no rows, already translated. */
  emptyLabel: string;
  /** Names the list for assistive technology. Optional. */
  ariaLabel?: string;
  className?: string;
}

/** One bar: a stable id, its short axis label (caller formatted) and its numeric value. */
export interface BarChartPoint {
  id: string;
  /** The short label under the bar and in the text equivalent ("3/4"), already localized. */
  label: string;
  value: number;
}
export interface BarChartProps {
  points: BarChartPoint[];
  /** Names the chart image and captions its text equivalent, already translated. */
  ariaLabel: string;
  /** The precise readout (bar tooltip and the text equivalent). Defaults to the plain number. */
  formatValue?: (value: number) => string;
  /** The compact readout under each bar. Defaults to the plain number. */
  formatTick?: (value: number) => string;
  /** One bar's tooltip. Defaults to the bar's id, a colon and its formatted value. */
  formatTooltip?: (point: BarChartPoint) => string;
  /** How many bars still get their own tick before the axis collapses to a range. 10 by default. */
  maxTickLabels?: number;
  className?: string;
}

/** One activity row: an order, a booking, a notice. Every string arrives translated. */
export interface ActivityListItem {
  id: string;
  title: string;
  description?: string;
  /** Where the row's title links. Without it the title is plain text. */
  href?: string;
  /** A decorative glyph before the text. */
  icon?: React.ReactNode;
  /** A timestamp, printed through the caller's `formatTimestamp`. */
  timestamp?: string;
  /** Echoed on `data-activity-type` for the caller's styling. */
  type?: string;
}
export interface ActivityListProps {
  items: ActivityListItem[];
  /** Prints a row's timestamp; the library carries no locale. An empty string prints nothing. */
  formatTimestamp: (timestamp: string) => string;
  /** Shows only the first `limit` items. */
  limit?: number;
  /** A router link component; it receives `to` and `className`. */
  linkComponent?: React.ElementType;
  /** Names the list for assistive technology. Optional. */
  ariaLabel?: string;
  className?: string;
}

/** The tone a status pill paints from the token triples. */
export type StatusPillTone = "neutral" | "info" | "success" | "warning" | "danger";
/** A status as a badge: the word and a shape, never color alone. */
export interface StatusPillProps {
  /** The status word, already translated. Required, so color never carries the state alone. */
  label: string;
  /** "neutral" by default. */
  tone?: StatusPillTone;
  /** A decorative glyph before the word (the shape that survives greyscale). */
  icon?: React.ReactNode;
  /** "small" for a table cell (the default), "medium" for a detail header. */
  size?: "small" | "medium";
  /** A supplementary tooltip. The word stays the accessible content; a title is never the only carrier. */
  title?: string;
  className?: string;
}

/**
 * A standing badge on StatusPill: one rung of a caller's ladder (a tier or a role) as a pill whose
 * colors the caller sets per tier through custom properties, rendering nothing without a word.
 */
export interface StatusBadgeProps {
  /**
   * The rung's word, already translated. Empty or null renders nothing, so a caller that cannot
   * name a key (one it does not know) passes nothing rather than the raw key.
   */
  label?: string | null;
  /**
   * The rung's key ("legend", "owner"), emitted as the hook class nxs-status-badge-<tier> after
   * reducing it to lowercase letters, digits and hyphens. The caller's stylesheet sets
   * --nxs-status-badge-bg, -fg and -border on that class.
   */
  tier?: string;
  /** A decorative glyph before the word (the shape that survives greyscale). */
  glyph?: React.ReactNode;
  /** "medium" for a surface (the default), "small" for inline chrome. */
  size?: "small" | "medium";
  /** A supplementary tooltip, already translated. */
  title?: string;
  className?: string;
}

/** One compact money line under a total ("Member discount (20% off)" then "-$4.00"). */
export interface DiscountNoteProps {
  /** The description, already translated. */
  label: string;
  /** The amount, already formatted by the caller. */
  amount: string;
  className?: string;
}

/** A titled section whose heading can take focus, holding a CardGrid or a one line empty hint. */
export interface GridSectionProps {
  /** The section's id; the heading's id is `${id}-title`. */
  id: string;
  title: string;
  /** The supporting line under the title. */
  supporting?: string;
  /** Rendered in the header's trailing area (a filter strip). */
  action?: React.ReactNode;
  /** Rendered between the header and the grid (an upgrade card). */
  notice?: React.ReactNode;
  /** One line shown instead of the grid; the header stays so the section remains a landmark. */
  emptyHint?: string | null;
  /** 3 by default. */
  headingLevel?: CardHeadingLevel;
  /** Appended to the section's classes. */
  className?: string;
  children?: React.ReactNode;
}
