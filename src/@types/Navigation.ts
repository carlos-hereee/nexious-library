import type { PEventDay } from "nxs-calendar";
import type { PCardheader } from "nxs-card";
import type { AssetProps } from "nxs-assets";
import type { SectionProps } from "custom-props";

export type MenuItemProp = {
  name: string;
  label: string;
  value: string;
  className?: string;
  uid?: string;
  menuItemId?: string;
  url?: string;
  icon?: string;
  locale?: string;
  link?: string;
};
export type Colors = {
  primary: string;
  secondary: string;
  altPrimary: string;
  altSecondary: string;
};
export type ThemeList = {
  name: string;
  value: string;
  label: string;
  uid: string;
  colors: Colors;
  backgroundColors: Colors;
};

export type MenuProp = {
  uid?: string;
  menuId?: string;
  name: string;
  active?: MenuItemProp;
  alternatives?: MenuItemProp[];
  icon?: string;
  link?: string;
  href?: string;
  external?: boolean;
  locale?: string;
  className?: string;
  label?: string;
  value?: string;
};
export type UnsplashAsset = {
  artistName: string;
  artistUrl: string;
  assetUrl: string;
};
// Define your exported types here
export interface HeaderProps {
  menu: MenuProp[];
  // See HeroProps.isDev, overrides dev-panel visibility for this component.
  isDev?: boolean;
  ping?: number;
  heading?: string;
  uniqueId?: string;
  className?: string;
  layout?: string;
  includeHome?: boolean;
  hideIcons?: boolean;
  logo?: AssetProps;
  themeList?: ThemeList[];
  language?: MenuItemProp;
  activePath?: string;
  utilities?: React.ReactNode;
  updateMenu: (e: MenuProp) => void;
  handleTheme?: (a: string) => void;
  onLogoClick?: () => void;
  onHomeClick?: () => void;
}

export interface PHoursOfOperation {
  header: PCardheader;
  days: PEventDay[];
  footer: {
    data: string;
  };
}
export interface FooterLink {
  label: string;
  href: string;
}
export interface FooterProps {
  appName?: string;
  title?: string;
  media?: SectionProps;
  className?: string;
  hero?: AssetProps;
  hoursOfOperation?: PHoursOfOperation;
  links?: FooterLink[];
}

export interface NavigationProps {
  onClick?: (key?: MenuProp | string) => void;
  menus: string[] | MenuProp[];
  // See HeroProps.isDev, overrides dev-panel visibility for this component.
  isDev?: boolean;
  className?: string;
  navItemTheme?: string;
  activeTheme?: string;
  active?: string;
}
export type NavbarProps = {
  show: { isActive: boolean; isClose: boolean };
  menu: MenuProp[];
  themeList?: ThemeList[];
  className?: string;
  active?: string;
  activePath?: string;
  navLayout?: string;
  language?: MenuItemProp;
  includeHome?: boolean;
  hideIcons?: boolean;
  click: (a: MenuProp) => void;
  handleTheme?: (a: string) => void;
  onHomeClick?: () => void;
};
export interface NavigationToggleProps {
  data: MenuProp;
  className?: string;
  onSelect: (a: MenuProp) => void;
  language?: MenuItemProp;
}
export interface FormNavigationProps {
  pageNumber: number;
  onClick: (key: number) => void;
  heading?: string;
  formOrder?: string[];
}

// ── StepProgress ─────────────────────────────────────────────────────────────────
/**
 * The progress header of a paginated form. Every string arrives already translated, so each form
 * keeps its own copy and the library ships no English.
 */
export type StepProgressProps = {
  /** Stable step ids, in order. Each is a React key, so they must be unique. */
  steps: readonly string[];
  /** Zero based index of the current step. */
  current: number;
  /** The visible label for a step id. */
  labelFor: (stepId: string) => string;
  /** The accessible name of the step list and of the bar. */
  progressLabel: string;
  /** The "Step X of N" sentence for the current step, shown under the bar and announced. */
  stepOfText: string;
  /** Appended to the root's classes. */
  className?: string;
  /** `root` REPLACES the root's default `nxs-step-progress` class. */
  classNames?: { root?: string };
};

// ── ActiveSelectionBar ───────────────────────────────────────────────────────────
/**
 * The thin bar that says which item is active ("Studying: Fractions") with a button to change
 * it, and room for the caller's own controls before that button.
 */
export type ActiveSelectionBarProps = {
  /** Already translated. Rendered as "{label}: " before the value. */
  label: string;
  /** The active item, rendered in a <strong>. */
  value: React.ReactNode;
  /** The visible text of the change button, already translated. */
  changeLabel: string;
  onChange: () => void;
  /**
   * The change button's accessible name when its visible text is not enough on its own ("Change"
   * beside a deck title reads fine on screen and says nothing out of context). Rendered as
   * aria-label only when set, so a caller that is content with the visible text gets no attribute.
   */
  changeAriaLabel?: string;
  /** The caller's own controls, rendered before the change button inside the actions group. */
  actions?: React.ReactNode;
  /** Appended to the root's classes. */
  className?: string;
  /** One slot per part. A key that is set REPLACES that part's default class. */
  classNames?: { root?: string; label?: string; actions?: string; change?: string };
};

// ── Navigation pieces ported from nexious-client (2026-11 item 337, Phase 4) ─────────
// SectionedRail, PillTabStrip, PillNav, MobileTabBar and MoreSheet. Every string arrives already
// translated and every glyph arrives as a node, so the library ships no English and no icon set.

/**
 * The router link a navigation piece renders for an item with an `href`. It receives `to`, the
 * same contract SelectCard's `linkAs` uses, so react-router's `Link` passes in unwrapped.
 */
export type NavLinkComponent = React.ElementType;

/** Whether a rail swaps panels in place (`tablist`) or changes the page (`nav`). */
export type RailSemantics = "tablist" | "nav";

/** One entry of a rail, a tab bar, a pill strip or a sheet. */
export type NavItem = {
  /** Stable id, unique across the whole piece. The value `onSelect` reports. */
  id: string;
  /** The visible label, already translated. */
  label: React.ReactNode;
  /** A decorative glyph drawn before the label and hidden from assistive technology. */
  icon?: React.ReactNode;
  /** A destination. In `nav` semantics the item renders as a link; a tablist ignores it. */
  href?: string;
  /** Called when this item is chosen, before the piece's own `onSelect`. */
  onSelect?: () => void;
};

/** A group of items under one overline. */
export type NavSection = {
  id: string;
  /** The overline, already translated. Null or absent renders no overline for this section. */
  label?: React.ReactNode | null;
  items: readonly NavItem[];
};

/**
 * The attention badge slot every piece shares. A ping is looked up by item id and an item with no
 * entry renders nothing, so a quiet item never shows a zero. The rendered node sits INSIDE the
 * item after its label, so the item's accessible name composes ("Orders, 3 need action").
 */
export type NavPingProps<TPing> = {
  pings?: Readonly<Partial<Record<string, TPing>>>;
  renderPing?: (ping: TPing, item: NavItem) => React.ReactNode;
};

// ── SectionedRail ────────────────────────────────────────────────────────────────
/**
 * A vertical side rail of sectioned items, ported from the client's OwnerRail. In `tablist`
 * semantics it is ONE roving tablist across every section; in `nav` semantics it is a nav
 * landmark whose current item carries `aria-current="page"`.
 */
export type SectionedRailProps<TPing = unknown> = NavPingProps<TPing> & {
  /** The sections in rail order, with only the items to show. An empty section renders nothing. */
  sections: readonly NavSection[];
  /** Defaults to `tablist`. */
  semantics?: RailSemantics;
  /** The selected (tablist) or current (nav) item, or null when none is. */
  activeId?: string | null;
  /**
   * The tablist's one tab stop. Defaults to `activeId`, and to the first item when neither names
   * a rendered item, so a rail with nothing selected (an attention path) stays reachable.
   */
  focusId?: string | null;
  /** The accessible name of the tablist or the nav landmark, already translated. */
  ariaLabel: string;
  /** Called with the chosen item's id, after the item's own `onSelect`. */
  onSelect?: (id: string) => void;
  /**
   * Runs before the rail's own arrow, Home and End handling. Call `event.preventDefault()` to
   * take a key over; the rail then leaves it alone.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>, item: NavItem) => void;
  /** The DOM id of an item, so a tabpanel's `aria-labelledby` can point at it. */
  itemElementId?: (id: string) => string;
  /** The tabpanel every tab controls (tablist semantics). */
  panelId?: string;
  /** The router link for `nav` items with an `href`. A plain `a` when absent. */
  linkComponent?: NavLinkComponent;
  /** Rendered under the last section, pinned to the rail's foot. */
  footer?: React.ReactNode;
  /** Appended to the root's classes. */
  className?: string;
};

// ── PillTabStrip ─────────────────────────────────────────────────────────────────
/**
 * The horizontal pill tablist for swapping panels in place, ported from the client's
 * PillTabStrip. The caller owns the ids, their labels and the panels.
 */
export type PillTabStripProps<T extends string> = {
  tabs: readonly T[];
  active: T;
  onSelect: (tab: T) => void;
  /** The tablist's accessible name, already translated. */
  ariaLabel: string;
  /** The visible label of a tab, already translated. */
  labelFor: (tab: T) => React.ReactNode;
  /** Shared by the tab and its panel so `aria-controls` and `aria-labelledby` resolve. */
  tabId: (tab: T) => string;
  panelId: (tab: T) => string;
  /** Appended to the root's classes. */
  className?: string;
};

// ── PillNav ──────────────────────────────────────────────────────────────────────
/**
 * The same pills as PillTabStrip, as NAVIGATION: each is a link and the current one carries
 * `aria-current="page"`. Ported from the client's PluginTabNav. Kept apart from PillTabStrip
 * because a link that changes the route is not a tab.
 */
export type PillNavProps = {
  /** Every item needs an `href`; an item without one is skipped. */
  items: readonly NavItem[];
  /** The current item, or null when none matches the route. */
  activeId?: string | null;
  /** The nav landmark's accessible name, already translated. */
  ariaLabel: string;
  /** The router link. A plain `a` when absent. */
  linkComponent?: NavLinkComponent;
  /** Appended to the root's classes. */
  className?: string;
};

// ── MobileTabBar ─────────────────────────────────────────────────────────────────
/** The tab bar's More button, rendered only when items remain for the sheet. */
export type MobileTabBarMore = {
  /** The visible label, already translated. */
  label: React.ReactNode;
  /** Whether the sheet is open (`aria-expanded`). */
  isOpen: boolean;
  /** The active item lives in the sheet, so More renders in its active look. */
  isSelected?: boolean;
  /** The sheet's element id, for `aria-controls`. */
  sheetId: string;
  onToggle: () => void;
  /** The More glyph, decorative. */
  icon?: React.ReactNode;
  /** One summary badge for every hidden item that needs attention. */
  ping?: React.ReactNode;
  /** Hidden text read after the badge, saying the work is inside the sheet, already translated. */
  pingLabel?: string;
};

/**
 * The bottom tab bar a compact viewport renders instead of a rail: a nav landmark holding one
 * roving tablist of labelled tabs and, outside it, a More button for the sheet.
 */
export type MobileTabBarProps<TPing = unknown> = NavPingProps<TPing> & {
  /** At most five tabs (four when More renders). */
  tabs: readonly NavItem[];
  /** The selected tab, or null when none is (the sheet holds it, or an attention path). */
  activeId?: string | null;
  /** The tab stop, with SectionedRail's fallback: `activeId`, then the first tab. */
  focusId?: string | null;
  onSelect?: (id: string) => void;
  /** Runs before the bar's own arrow, Home and End handling; `preventDefault()` takes a key over. */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>, item: NavItem) => void;
  itemElementId?: (id: string) => string;
  panelId?: string;
  more?: MobileTabBarMore;
  /** The nav landmark's and the tablist's accessible name, already translated. */
  ariaLabel: string;
  /**
   * The root custom property the bar publishes its height on while mounted, so fixed elements
   * outside it can clear it. Defaults to `--nxs-tabbar-height`.
   */
  heightProperty?: string;
  /** Appended to the root's classes. */
  className?: string;
};

// ── MoreSheet ────────────────────────────────────────────────────────────────────
/**
 * The modal bottom sheet behind the tab bar's More button: the remaining sections as grids of
 * labelled items. Choosing an item closes the sheet first, then selects it.
 */
export type MoreSheetProps<TPing = unknown> = NavPingProps<TPing> & {
  /** The sheet's element id, the one the More button's `aria-controls` names. */
  id: string;
  isOpen: boolean;
  /** The sheet's heading, already translated; it names the dialog. */
  title: React.ReactNode;
  /** The close button's accessible name, already translated. */
  closeLabel: string;
  /** The close button's glyph, decorative. Defaults to a multiplication sign. */
  closeIcon?: React.ReactNode;
  sections: readonly NavSection[];
  /** The current item, marked `aria-current="page"`. */
  activeId?: string | null;
  onSelect?: (id: string) => void;
  onClose: () => void;
  /** Rendered under the sections. */
  footer?: React.ReactNode;
  /** Appended to the sheet's classes. */
  className?: string;
};
