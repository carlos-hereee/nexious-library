import { SizeProp } from "@fortawesome/fontawesome-svg-core";
export type IconProps = {
    name: string;
    size: SizeProp;
    spin: string;
    color: string;
};
declare const Icons: ({ name, size, spin, color }: IconProps) => JSX.Element;
export default Icons;
