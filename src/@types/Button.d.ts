declare module "nxs-button" {
  export type SizeProp = "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl";
  export type NumSize = "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
  export type IconProps = {
    icon?: string;
    size?: SizeProp | NumSize;
    spin?: string;
    color?: string;
    label?: string;
    name?: string;
    className?: string;
  };
  export interface ButtonProps {
    // optional
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onSubmit?: (key: unknown) => void;
    children?: React.ReactNode;
    name?: string;
    title?: string;
    theme?: string;
    isDisable?: boolean;
    label?: string;
    data?: string;
    active?: string;
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
    icon: IconProps;
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
