/// <reference types="react" />
import { IconProps } from "./Icon";
export type IconDataProps = {
    Icons: ({ name, size, spin, color }: IconProps) => JSX.Element;
};
export declare const Icon: IconDataProps;
