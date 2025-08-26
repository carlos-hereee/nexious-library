declare module "nxs-navigation" {
  import type { PEventDay } from "nxs-calendar";
  import type { PCardheader } from "nxs-card";
  import type { AssetProps } from "nxs-assets";
  import type { SectionProps } from "custom-props";

  export type MenuItemProp = {
    name: string;
    label: string;
    value: string;
    theme?: string;
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
    locale?: string;
    theme?: string;
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
    ping?: number;
    heading?: string;
    uniqueId?: string;
    theme?: string;
    layout?: string;
    includeHome?: boolean;
    hideIcons?: boolean;
    logo?: AssetProps;
    themeList?: ThemeList[];
    language?: MenuItemProp;
    updateMenu: (e: MenuProp) => void;
    handleTheme?: (a: string) => void;
    onLogoClick?: () => void;
    onHomeClick?: () => void;
  }

  export interface HoursOfOperation {
    header: PCardheader;
    days: PEventDay[];
    hours: {
      monday: string;
      tuesday: string;
      wednesday: string;
      thursday: string;
      friday: string;
      saturday: string;
      sunday: string;
    };
  }
  export interface FooterProps {
    appName?: string;
    title?: string;
    media?: SectionProps;
    theme?: string;
    hero?: AssetProps;
    hoursOfOperation?: HoursOfOperation;
  }

  export interface NavigationProps {
    onClick?: (key?: MenuProp | string) => void;
    menus: string[] | MenuProp[];
    theme?: string;
    navItemTheme?: string;
    activeTheme?: string;
    active?: string;
  }
  export type NavbarProps = {
    show: { isActive: boolean; isClose: boolean };
    menu: MenuProp[];
    themeList?: ThemeList[];
    theme?: string;
    active?: string;
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
    theme?: string;
    onSelect: (a: MenuProp) => void;
    language?: MenuItemProp;
  }
  export interface FormNavigationProps {
    pageNumber: number;
    onClick: (key: number) => void;
    heading?: string;
    formOrder?: string[];
  }
}
