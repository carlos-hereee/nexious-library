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
  // children: JSX.Element[] | JSX.Element | boolean | undefined;
  children: JSX.Element[] | JSX.Element;
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
export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  hasHero?: boolean;
  hero: { link: string; name: string };
}
export interface CardButtonProps {
  data: any;
  click: React.MouseEventHandler<HTMLButtonElement>;
  hasHero?: boolean;
  hero: { link: string; name: string };
}
export interface RequiredProps {
  data: { title: string; value: string };
  message?: string;
}
