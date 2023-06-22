import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconNames } from "@nxs/atoms";

export interface HyperlinkProps {
  data: {
    responseArr: [string, string];
    isLink?: boolean;
    link: string;
    word: string;
  };
}

export interface IconProps {
  name: IconNames;
  size?: SizeProp;
  spin?: string;
  color?: string;
}

export interface IconButtonProps {
  name: IconNames;
  hasLabel?: boolean;
  children?: JSX.Element;
  label?: string;
  ping?: number;
  size?: SizeProp;
  spin?: string;
  color?: string;
  click: React.MouseEventHandler<HTMLButtonElement>;
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
export interface InputProps {
  value: string;
  type?: string;
  min?: number;
  max?: number;
  change: () => void;
  blur: () => void;
  submit?: () => void;
}
