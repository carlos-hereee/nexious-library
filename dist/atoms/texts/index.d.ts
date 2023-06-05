/// <reference types="react" />
import { HyperlinkProps } from "./Hyperlink";
export type TextProps = {
    Capitilize: ({ data }: {
        data: string;
    }) => JSX.Element;
    Heading: ({ data }: {
        data: string;
    }) => JSX.Element;
    Hyperlink: ({ data }: HyperlinkProps) => JSX.Element;
    Title: ({ data }: {
        data: string;
    }) => JSX.Element;
};
export declare const Texts: TextProps;
