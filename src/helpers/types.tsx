import { labels } from "@nxs-atoms/forms/labels";

export type DataStringProps = { data: string; name?: string };
export type IconNameProp = "";
export type String = string;
export type HeroProps = { url: string; alt?: string };
export type LabelValueProps = { key: string | number; value: string | number };
export type MessageProp = { message: string };
export type PageNotFoundProps = { message: string; hero: HeroProps };
export type KeyStringProps = { [key: string]: string };
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
