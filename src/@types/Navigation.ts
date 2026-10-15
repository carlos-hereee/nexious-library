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
