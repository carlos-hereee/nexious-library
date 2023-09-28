/**
 * syntax - "my-module" is the name you want to use when importing the
 *           module and should match the name used in import statements
 * */
// regular button

declare module "nxs-button" {
  export interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    name?: string;
    title?: string;
    theme?: string;
    label?: string;
  }
}
/**
 * Icon Button
 * @param icon.name string to specify the name of an icon
 * @param icon.size string to specify the size of an icon
 * @param icon.spin string to specify the spin of an icon
 * @param icon.color string to specify the color of an icon
 * @param ping string to specify a notification count on icon
 * @param click callback fired when button is click
 * @returns button with icon label
 */
type SizeProp = "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl";
type NumSize = "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
declare module "nxs-button-icon" {
  export interface IconButtonProps {
    icon: {
      icon: string;
      size?: SizeProp | NumSize;
      spin?: string;
      color?: string;
      label?: string;
      name?: string;
    };
    ping?: number;
    theme?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
}

//
declare module "nxs-go-back-button" {
  export interface GoBackButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
}
