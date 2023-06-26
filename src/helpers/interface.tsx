import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconNames } from "@nxs-atoms";
import { HeroProp } from "./types";

export interface HyperlinkProps {
  data: {
    responseArr: string[];
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
  data: {
    uid: string;
    name: string;
    icon: IconNames;
    isAlt: boolean;
    alt?: string;
  };
  click: (e: {
    uid: string;
    name: string;
    icon: IconNames;
    isAlt: boolean;
    alt?: string;
  }) => void;
}
export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  hasHero?: boolean;
  hero?: HeroProp;
}
export interface CardButtonProps {
  data: any;
  click: React.MouseEventHandler<HTMLButtonElement>;
  hasHero?: boolean;
  hero: HeroProp;
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
