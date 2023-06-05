/// <reference types="react" />
import { HyperlinkProps } from "./Hyperlink";
import { NavProps } from "./Navlink";
type DataProp = {
    data: string;
};
export type TextProps = {
    Capitilize: ({ data }: DataProp) => JSX.Element;
    Heading: ({ data }: DataProp) => JSX.Element;
    Hyperlink: ({ data }: HyperlinkProps) => JSX.Element;
    Title: ({ data }: DataProp) => JSX.Element;
    Navlink: ({ data, link }: NavProps) => JSX.Element;
};
export declare const Texts: TextProps;
export {};
