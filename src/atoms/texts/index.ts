import Capitilize from "./CapFirstChar";
import Heading from "./Heading";
import { Hyperlink, HyperlinkProps } from "./Hyperlink";
import Title from "./Title";
import { Navlink, NavProps } from "./Navlink";

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

export const Texts: TextProps = {
  Capitilize,
  Heading,
  Hyperlink,
  Title,
  Navlink,
};
