import { IconProps } from "@nxs-atoms/assets/Icon";
import { HeroProp } from "@nxs-utils/helpers/types";

export interface IconButtonProps {
  icon: IconProps;
  label?: string;
  ping?: number;
  theme?: string;
  click?: React.MouseEventHandler<HTMLButtonElement>;
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
