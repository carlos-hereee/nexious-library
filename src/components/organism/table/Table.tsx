// Reuse record: companyuno-growth/product-planning/DESIGNS/reusable-components/table/README.md
// The library's one data table, written for 2026-11 item 337 over the 4.x folder, styled as
// nxs-table from the platform client's orders-table. It lays out columns and rows the caller
// passes and owns no data, no sorting and no copy: the order, the empty message and the caption
// all arrive through props. Exported from main.ts with its parts.
import { useId } from "react";
import TableBody from "@nxs-organism/table/TableBody";
import TableFooter from "@nxs-organism/table/TableFooter";
import TableHeader from "@nxs-organism/table/TableHeader";
import type { TableProps } from "custom-props";

/**
 * Component: Table
 *
 * Renders a labelled scroll region holding one table: one caption (visible or screen reader
 * only), a header row of th scope="col" with aria-sort on sortable columns, a body of the rows'
 * node cells (or the caller's emptyState across every column) and an optional footer.
 */
const Table = (props: TableProps) => {
  const { columns, rows, caption, isCaptionVisible = true, isDense, emptyState, footer, onSort } = props;
  const { isStackedOnMobile, className } = props;
  const captionId = `${useId()}-caption`;
  const tableClass = [
    "nxs-table",
    isDense ? "nxs-table-dense" : "",
    isStackedOnMobile ? "nxs-table-stacked" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // The region is the component's job: a wide table must scroll in its own box rather than
    // widen the page, and a keyboard user can only scroll that box if it takes focus, which is
    // also why it needs a name (WCAG 2.1.1, axe scrollable-region-focusable). The caption names
    // it so the table and its scroll box can never be called two different things.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    <div className="nxs-table-scroll" role="region" aria-labelledby={captionId} tabIndex={0}>
      <table className={tableClass}>
        <caption id={captionId} className={isCaptionVisible ? "nxs-table-caption" : "nxs-table-caption sr-only"}>
          {caption}
        </caption>
        <TableHeader columns={columns} onSort={onSort} />
        <TableBody columns={columns} rows={rows} emptyState={emptyState} />
        {footer ? <TableFooter>{footer}</TableFooter> : null}
      </table>
    </div>
  );
};
export default Table;
