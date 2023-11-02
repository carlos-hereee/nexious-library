// /**
//  * syntax - "my-module" is the name you want to use when importing the
//  *           module and should match the name used in import statements
//  * */
type MenuItemProp = {
  name: string;
  label: string;
  uid?: string;
  menuItemId?: string;
  url: string;
  icon: string;
  locale?: string;
  link?: string;
};
type MenuProp = {
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
type UnsplashAsset = {
  artistName: string;
  artistUrl: string;
  assetUrl: string;
};

declare module "nxs-navigation" {
  // Define your exported types here
  export interface HeaderProps {
    menu: MenuProp[];
    ping?: number;
    heading?: string;
    logo: {
      url: string;
      alt?: string;
      name?: string;
      icon?: string;
      small?: string;
      label?: string;
      credit?: UnsplashAsset;
      theme?: string;
      logoId?: string;
    };
    language?: MenuItemProp;
    updateMenu: (e: MenuProp) => void;
  }
  export interface FooterProps {
    appName: string;
  }
  export interface NavigationProps {
    onClick?: (key: MenuProp) => void;
    menu: MenuProp[];
    theme?: string;
  }
  export type NavbarProps = {
    show: { isActive: boolean; isClose: boolean };
    click: (a: MenuProp) => void;
    menu: MenuProp[];
    theme?: string;
    language?: MenuItemProp;
  };
  export interface NavigationToggleProps {
    data: MenuProp;
    onSelect: (a: any) => void;
    language?: MenuItemProp;
  }
  export interface FormNavigationProps {
    formOrder: string[];
    pageNumber: number;
    heading?: string;
    onClick: (key: number) => void;
  }
}
