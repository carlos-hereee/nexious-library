// Class and label helpers the Table's header and body share, so a column's alignment and its
// stacked label are decided in one place and the header cell can never sit apart from the cells
// beneath it (2026-11 item 337). Pure: no component imports.
import type { TableColumn } from "custom-props";

// The alignment class a cell takes from its column. Start is the default and needs none.
const ALIGN_CLASS = { start: "", center: "nxs-table-cell-center", end: "nxs-table-cell-end" } as const;

/** Joins the base class, the column's alignment class and its own className for one cell. */
export const columnCellClass = (column: TableColumn, base: string): string =>
  [base, ALIGN_CLASS[column.align ?? "start"], column.className ?? ""].filter(Boolean).join(" ");

/** The plain text a stacked phone cell prints beside its value: the label, or a string header. */
export const stackedCellLabel = (column: TableColumn): string | undefined => {
  if (column.label) return column.label;
  return typeof column.header === "string" ? column.header : undefined;
};
