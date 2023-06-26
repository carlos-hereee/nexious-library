import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconNames } from "@nxs-atoms";
import { HeroProp, IconItemProp } from "@nxs-helpers/types";

export interface IconProps {
  name: IconNames;
  size?: SizeProp;
  spin?: string;
  color?: string;
}
export interface IconButtonProps {
  icon: IconProps;
  name: IconNames;
  hasLabel?: boolean;
  children?: JSX.Element;
  label?: string;
  ping?: number;
  size?: SizeProp;
  spin?: string;
  color?: string;
  data: IconItemProp;
  click: (e: IconItemProp) => void;
}
export interface CardButtonProps {
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
