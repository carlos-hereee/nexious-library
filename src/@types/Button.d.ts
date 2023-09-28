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
//
declare module "nxs-go-back-button" {
  export interface GoBackButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
}
