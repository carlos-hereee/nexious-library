import { Icons, IconProps } from "./Icon";

export type IconDataProps = {
  Icons: ({ name, size, spin, color }: IconProps) => JSX.Element;
};

export const Icon: IconDataProps = { Icons };
