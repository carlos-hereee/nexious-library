import { SizeProp } from "@fortawesome/fontawesome-svg-core";

export interface HyperlinkProps {
  data: {
    responseArr: [string, string];
    isLink?: boolean;
    link: string;
    word: string;
  };
}
export interface NavProps {
  data: string;
  link: string;
}
export interface IconProps {
  name: string;
  size?: SizeProp;
  spin?: string;
  color?: string;
}
export interface ButtonProps {
  children: JSX.Element[] | JSX.Element | boolean | undefined;
  name?: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
}
export interface IconButtonProps {
  children: JSX.Element;
  name: string;
  hasLabel?: boolean;
  label?: string;
  ping?: number;
  size?: SizeProp;
  spin?: string;
  color?: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
}
