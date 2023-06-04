import Capitilize from "./CapFirstChar";
import Heading from "./Heading";
import { Hyperlink, HyperlinkProps } from "./Hyperlink";
import Title from "./Title";

export type TextProps = {
  Capitilize: ({ data }: { data: string }) => JSX.Element;
  Heading: ({ data }: { data: string }) => JSX.Element;
  Hyperlink: ({ data }: HyperlinkProps) => JSX.Element;
  Title: ({ data }: { data: string }) => JSX.Element;
};

export const Texts: TextProps = { Capitilize, Heading, Hyperlink, Title };
