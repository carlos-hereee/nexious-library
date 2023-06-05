/// <reference types="react" />
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
export type IconProps = {
    name: string;
    size: SizeProp;
    spin: string;
    color: string;
};
export declare const Icons: ({ name, size, spin, color }: IconProps) => JSX.Element;
