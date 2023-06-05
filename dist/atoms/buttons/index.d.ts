/// <reference types="react" />
import { ButtonProps } from "./Button";
export type AtomButtonProps = {
    Button: ({ data, name, click }: ButtonProps) => JSX.Element;
};
export declare const Buttons: AtomButtonProps;
