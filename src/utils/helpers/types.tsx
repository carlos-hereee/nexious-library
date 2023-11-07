import { initLabels } from "@nxs-utils/form/labels";

export type FormDataProps = {
  [key: string]: string | number | File;
};
export type DefaultPageComponent = {
  title: string;
  subtitle?: string;
  body: string;
  hero?: HeroProp;
};

export type UnsplashProps = {
  artistName: string;
  artistUrl: string;
  assetUrl: string;
};
export type DataStringProps = { data: string; name?: string };
export type LinkProp = { data: string; isLink: boolean };
export type LabelValueProps = { key: string | number; value: string | number };
export type MessageProp = { message: string };
export type KeyStringProp = { [key: string]: string };
export type OptionProp = {
  name: string;
  value: string;
  isDisabled?: boolean;
  uid?: string;
  themeId?: string;
};
export type CellDataProp = { data: string; isHeader?: boolean; uid?: string };
export type TableColumnProp = { span: number; name: string; uid?: string };
export type LabelKeys = keyof typeof initLabels;
export type NavlinkProp = { data: string; link: string };
export type CardHeaderProps = {
  title: string;
  subtitle?: string;
  tagline?: string;
  hero?: HeroProp;
  uid?: string;
};

export type IconItemProp = {
  uid: string;
  name: string;
  icon: string;
  isAlt?: boolean;
  alt?: string;
};
export type MenuItemProp = {
  name: string;
  label: string;
  uid?: string;
  menuItemId?: string;
  url: string;
  icon: string;
  locale?: string;
  link?: string;
};
export type MenuProp = {
  uid?: string;
  menuId?: string;
  name: string;
  icon: string;
  link: string;
  locale?: string;
  label?: string;
  isToggle?: boolean;
  isPrivate?: boolean;
  active: MenuItemProp;
  alternatives: MenuItemProp[];
};
export type CalendarDayProps = {
  dayIdx: number;
  month: number;
  year: number;
  date: string;
  maxDays: number;
  weeks: number;
  start: number;
  day: number;
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
