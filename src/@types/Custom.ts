import type { PEventDay } from "nxs-calendar";
import type { ReactNode } from "react";

export type KeyStringProp = { [key: string]: string };
// export type FormInitialValues = { [key: string]: unknown };
export type PTableData = { value?: string; isHeader?: boolean; uid?: string; className?: string };
export type OnchangeProps = React.ChangeEvent<HTMLInputElement>;
// ── Table (2026-11 item 337 Session 3) ──
// The table organism takes columns and rows of React node cells, so a cell can hold a link, a
// button or a badge. Every user facing string arrives through these props; the component owns none.

/** A column's sort state as aria-sort spells it. */
export type TableSortDirection = "ascending" | "descending" | "none";
/** Where a column's header and cells sit. "end" is the one for numbers and money. */
export type TableAlign = "start" | "center" | "end";

/** One column of a Table: its key into each row's cells, its header and how it sorts. */
export interface TableColumn {
  key: string;
  header: ReactNode;
  // Plain text the stacked phone layout prints beside each cell, because a stacked cell with no
  // header beside it is an unlabelled value. Defaults to `header` when that is a string.
  label?: string;
  align?: TableAlign;
  // A sortable column carries aria-sort, and its header becomes a button when the Table has onSort.
  isSortable?: boolean;
  sortDirection?: TableSortDirection;
  // Renders this column's body cells as th scope="row", for the cell that names its row.
  isRowHeader?: boolean;
  className?: string;
}

/** One body row: a stable id and a cell per column key. A missing key renders an empty cell. */
export interface TableRowData {
  id: string;
  cells: Record<string, ReactNode>;
  className?: string;
}

export interface TableProps {
  columns: TableColumn[];
  rows: TableRowData[];
  // The table's one caption. It also names the scroll region, so it is required; hide it with
  // isCaptionVisible={false} when a visible heading already says the same thing.
  caption: ReactNode;
  isCaptionVisible?: boolean;
  isDense?: boolean;
  // What the body shows when rows is empty, from the caller (the Table has no copy of its own).
  emptyState?: ReactNode;
  // Rows for the tfoot, as the caller's own tr elements.
  footer?: ReactNode;
  // Fired with a sortable column's key when its header button is pressed. The caller owns the
  // order and passes the new sortDirection back on the columns.
  onSort?: (key: string) => void;
  // Restacks each row into a labelled card on a phone, the client's Orders table behavior.
  isStackedOnMobile?: boolean;
  className?: string;
}

/** The new columns API of TableHeader. */
export interface TableHeaderColumnsProps {
  columns: TableColumn[];
  onSort?: (key: string) => void;
}
/** The 4.x data API of TableHeader, kept for HoursOfOperation. */
export interface TableHeaderLegacyProps {
  data?: PEventDay[];
  // Threaded through so a numeric column's HEADER right-aligns with the figures beneath it.
  numericColumns?: number[];
}
export type TableHeaderProps = TableHeaderColumnsProps | TableHeaderLegacyProps;

export interface TableBodyProps {
  columns: TableColumn[];
  rows: TableRowData[];
  emptyState?: ReactNode;
}

export interface TableFooterProps {
  className?: string;
  children?: ReactNode;
}
export interface SectionProps {
  title?: string;
  subtitle?: string;
  details?: string;
  data?: string;
  body?: string;
  className?: string;
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
  className: string;
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
