/// <reference types="react" />
import { ButtonProps } from "./Button";
export type AtomButtonProps = {
    ButtonLink: ({ data }: {
        data: string;
    }) => JSX.Element;
    Button: ({ data, name, click }: ButtonProps) => JSX.Element;
};
export declare const Buttons: AtomButtonProps;
