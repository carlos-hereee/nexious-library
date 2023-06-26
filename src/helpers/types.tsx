import { labels } from "@nxs-atoms/forms/labels";

export type DataStringProps = { data: string; name?: string };
export type LinkProp = { isLink: boolean; str: string; link: string };
export type HeroProp = { url: string; alt?: string; name?: string };
export type LabelValueProps = { key: string | number; value: string | number };
export type MessageProp = { message: string };
export type PageNotFoundProps = { message: string; hero: HeroProp };
export type KeyStringProp = { [key: string]: string };
export type OptionProp = {
  name: string;
  value: string;
  isDisabled: boolean;
  uid?: string;
};
export type CellDataProp = { data: string; isHeader?: boolean; uid?: string };
export type TableColumnProp = { span: number; name: string; uid?: string };
export type LabelKeys = keyof typeof labels;
export type NavlinkProp = { data: string; link: string };
export type CardHeaderProps = {
  title: string;
  subtitle?: string;
  hero?: { name: string; url: string; alt: string };
  hasHero?: boolean;
};
export type CardBodyProps = {
  response: string;
  hyperlink: { word: string; link: string }[];
  hasLink?: boolean;
  uid: string;
};
