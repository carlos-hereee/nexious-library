import { labels } from "@nxs-atoms/forms/labels";

export type DataStringProps = { data: string; name?: string };
export type LinkProp = { data: string; isLink: boolean };
export type HeroProp = {
  url: string;
  alt?: string;
  name?: string;
  isIcon?: boolean;
  icon?: string;
  small?: string;
  credit?: { artistName: string; artistUrl: string; assetUrl: string };
};
export type LabelValueProps = { key: string | number; value: string | number };
export type MessageProp = { message: string };
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
  uid?: string;
};
export type CardBodyProps = {
  body: string;
  features?: {
    hasList: boolean;
    list: string[];
    title: string;
  }[];
  hyperlink: { word: string; link: string }[];
  hasLink?: boolean;
  uid: string;
};
export type CardFooterProps = {
  body?: string;
  cta?: {
    uid: string;
    name: string;
    icon: string;
  }[];
};
export type IconItemProp = {
  uid: string;
  name: string;
  icon: string;
  isAlt?: boolean;
  alt?: string;
};
export type MenuItemProp = {
  uid: string;
  name: string;
  icon: string;
  lang: string;
  label?: string;
  isToggle?: boolean;
  isPrivate?: boolean;
  active: { name: string; label: string; icon: string; uid: string };
  alternatives: {
    name: string;
    label: string;
    icon: string;
    uid: string;
    language: string;
  }[];
};
export type CalendarDayProps = {
  dayIdx: number;
  month: number;
  year: number;
  date: number;
  maxDays: number;
  weeks: number;
  start: number;
  day: string;
  yyyyddmm: string;
};
export type CalendarEventProp = {
  uid: string;
  response: string;
  isOpen: boolean;
  date: string;
  start: number;
  end: number;
};
export type CalendarDayEventProp = {
  date: string;
  list: CalendarEventProp[];
};
