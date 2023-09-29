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
declare module "nxs-header" {
  // Define your exported types here
  export interface HeaderProps {
    menu: MenuProp[];
    ping?: number;
    logo: {
      url: string;
      alt?: string;
      name?: string;
      icon?: string;
      small?: string;
      label?: string;
      credit?: { artistName: string; artistUrl: string; assetUrl: string };
      theme?: string;
      logoId?: string;
    };
    language?: MenuItemProp;
    updateMenu: (e: MenuProp[]) => void;
  }
}
/**
 * Component - Navigation
 * @param menu    array to be iterated
 * @param click   callback to be fired when button is click
 * @returns navbar
 */
declare module "nxs-navigation" {
  export interface NavigationProps {
    onClick?: (key: MenuProp) => void;
    menu: MenuProp[];
    theme?: string;
  }
}
/**
 * Component - Navbar
 * @param show    display navigation
 *                  show: {
 *                            isActive: boolean,
 *                            isClose: boolean
 *                        }
 * @param menu    array tobe iterated
 *                  menu: [{
 *                            uid: string,
 *                            isToggle: boolean,
 *                            isAlt: boolean,
 *                            name: string,
 *                            alt?: string, optional param
 *                         }]
 * @param toggle  callback to be fired when button is click
 * @param click   callback to be fired when button is click
 * @returns navbar
 */
declare module "nxs-navbar" {
  export type NavbarProps = {
    show: { isActive: boolean; isClose: boolean };
    toggle: (a: MenuProp[]) => void;
    click: (a: MenuProp) => void;
    menu: MenuProp[];
    theme?: string;
    language?: MenuItemProp;
  };
}
