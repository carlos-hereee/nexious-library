import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconNames } from "@nxs-atoms";
import { HeroProp } from "@nxs-helpers/types";

export interface IconProps {
  icon: IconNames;
  size?: SizeProp;
  spin?: string;
  color?: string;
}
export interface IconButtonProps {
  icon: IconProps;
  hasLabel?: boolean;
  label?: string;
  ping?: number;
  click: React.MouseEventHandler<HTMLButtonElement>;
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
