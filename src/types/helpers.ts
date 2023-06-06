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
  children: JSX.Element;
  name?: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
}
