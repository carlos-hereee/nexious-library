declare module "nxs-button" {
  import type { CardinalDirectionProps } from "nxs-typography";

  export type SizeProp = "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl";
  export type NumSize = "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
  export type IconProps = {
    icon: string;
    isNum?: boolean;
    size?: SizeProp | NumSize;
    spin?: string;
    color?: string;
    label?: string;
    name?: string;
    hideHints?: boolean;
    theme?: string;
    layout?: string;
  };
  export interface ButtonProps {
    // optional
    onClick?: (data?: string) => void;
    onSubmit?: () => void;
    children?: React.ReactNode;
    theme?: string;
    isDisable?: boolean;
    hideIcon?: boolean;
    icon?: string;
    confirmSubmit?: boolean;
    title?: string;
    toggleLabel?: string;
    label?: string;
    activeTheme?: string;
    ping?: number;
    name?: string;
    data?: string;
    body?: string;
    active?: CardinalDirectionProps;
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
  export interface CopyToClipboardProps {
    heading?: string;
    label?: string;
    labelLayout?: string;
    theme?: string;
    data: string;
    isCopy?: boolean;
  }
}
