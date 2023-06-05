/// <reference types="react" />
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
export type IconProps = {
    name: string;
    size?: SizeProp;
    spin?: string;
    color?: string;
};
/**
 * Component - Icon
 * @param name specify icon name
 * @param size optional specify size for icon
 * @param spin optional specify if icon should spin
 * @param color optional specify the color for icon
 * @returns JSX.Element
 */
declare const Icon: {
    ({ name, size, spin, color }: IconProps): JSX.Element;
    displayName: string;
};
export default Icon;
