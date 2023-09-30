// /**
//  * syntax - "my-module" is the name you want to use when importing the
//  *           module and should match the name used in import statements
//  * */
// // regular button

type SizeProp = "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl";
type NumSize = "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
type IconProp = {
  icon: string;
  size?: SizeProp | NumSize;
  spin?: string;
  color?: string;
  label?: string;
  name?: string;
};
declare module "nxs-button" {
  export type IconProps = IconProp;
  export interface ButtonProps {
    // optional
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onSubmit?: (key: any) => void;
    children?: React.ReactNode;
    name?: string;
    title?: string;
    theme?: string;
    isDisable?: boolean;
    label?: string;
    data?: string;
  }
  export interface IconButtonProps {
    // all of button props
    name?: string;
    title?: string;
    theme?: string;
    isDisable?: boolean;
    isBurger?: boolean;
    label?: string;
    // notification count
    ping?: number;
    // icon props
    icon: IconProp;
    // optional onclick event handler
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
  export interface BurgerButtonProps {
    isBurger?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    // notification count
    ping?: number;
  }
}
