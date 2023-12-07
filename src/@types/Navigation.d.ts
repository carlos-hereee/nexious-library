declare module "nxs-navigation" {
  import type { AssetProps } from "nxs-assets";
  import type { SectionProps } from "custom-props";

  export type MenuItemProp = {
    name: string;
    label: string;
    value: string;
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
    icon: string;
    link: string;
    locale?: string;
    label?: string;
    isToggle?: boolean;
    isPrivate?: boolean;
    active: MenuItemProp;
    alternatives: MenuItemProp[];
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
    logo?: AssetProps;
    themeList?: ThemeList[];
    language?: MenuItemProp;
    updateMenu: (e: MenuProp) => void;
    handleTheme?: (a: string) => void;
    onLogoClick?: () => void;
  }
  export interface FooterProps {
    appName: string;
    media: SectionProps;
    hero: AssetProps;
  }
  export interface NavigationProps {
    onClick?: (key: MenuProp) => void;
    menu: MenuProp[];
    theme?: string;
  }
  export type NavbarProps = {
    show: { isActive: boolean; isClose: boolean };
    click: (a: MenuProp) => void;
    handleTheme?: (a: string) => void;
    menu: MenuProp[];
    themeList?: ThemeList[];
    theme?: string;
    active?: string;
    language?: MenuItemProp;
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
