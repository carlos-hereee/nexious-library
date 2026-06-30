import type { PEventDay } from "nxs-calendar";
import type { PCardheader } from "nxs-card";

export type KeyStringProp = { [key: string]: string };
// export type FormInitialValues = { [key: string]: unknown };
export type PTableData = { value?: string; isHeader?: boolean; uid?: string; theme?: string };
export type OnchangeProps = React.ChangeEvent<HTMLInputElement>;
export interface TableProps {
  theme?: string;
  headerData?: PCardheader;
  list?: PEventDay[];
  bodyData?: PTableData[];
  columns?: number;
  //   footerData?: PTableData[];
}
export interface SectionProps {
  title?: string;
  subtitle?: string;
  details?: string;
  data?: string;
  body?: string;
  theme?: string;
  hasCta?: boolean;
  hasBoolean?: boolean;
  uid?: string;
  heroId?: string;
  _id?: string;
  sections?: { [key: string]: string }[];
  medias?: { [key: string]: string }[];
}
export interface TotalProps {
  total: number;
  theme: string;
  heading?: string;
  // Precomputed tax amount (same unit as total). Wins over taxRate when both set.
  tax?: number;
  // Tax rate as a fraction (e.g. 0.0625 for 6.25%), applied when tax is omitted.
  // No default rate is invented: a multi-jurisdiction primitive must be told.
  taxRate?: number;
  // Currency symbol prefix for displayed amounts. Defaults to "$".
  currencySymbol?: string;
  // Row labels, for i18n. Default to English Subtotal/Tax/Total.
  labels?: { subtotal?: string; tax?: string; total?: string };
}
export type ObjectToArray<P> = (obj?: { [key: string]: P }) => { [key: string]: P }[] | [];
export type AddArrayInObject<T = KeyStringProp> = {
  obj: { [key: string]: T };
  key: string;
  value: T;
};
