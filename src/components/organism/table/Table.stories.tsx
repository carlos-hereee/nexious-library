import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { TableColumn, TableRowData, TableSortDirection } from "custom-props";
import Table from "./Table";

/**
 * Table is the library's one data table (2026-11 item 337), the nxs-table recipe ported from the
 * platform client's orders-table.
 *
 * Every string is the caller's: the caption (which also names the scroll region), the headers,
 * the cells and the empty state. Cells are React nodes, so a row can hold a link, a badge or a
 * button. Sorting is the caller's too: pass `onSort` and feed each column's `sortDirection` back.
 *
 * Walk it by keyboard: Tab reaches the scroll region (so a wide table can scroll with the arrow
 * keys), then each sort button, then each button in a row. With a screen reader the sortable
 * headers announce their order through aria-sort.
 */
const meta: Meta<typeof Table> = {
  title: "Organisms/Table",
  component: Table,
  tags: ["autodocs"],
  argTypes: {
    isDense: { control: "boolean" },
    isCaptionVisible: { control: "boolean" },
    isStackedOnMobile: { control: "boolean" },
    onSort: { action: "sorted" },
  },
};
export default meta;
type Story = StoryObj<typeof Table>;

const columns: TableColumn[] = [
  { key: "order", header: "Order", isRowHeader: true },
  { key: "status", header: "Status" },
  { key: "placed", header: "Placed" },
  { key: "total", header: "Total", align: "end" },
  { key: "actions", header: <span className="sr-only">Actions</span>, label: "Actions" },
];

const rows: TableRowData[] = [
  {
    id: "1041",
    cells: {
      order: <a href="#order-1041">1041</a>,
      status: <span className="badge">Paid</span>,
      placed: "Nov 11",
      total: "24.00",
      actions: <button type="button">Refund</button>,
    },
  },
  {
    id: "1042",
    cells: { order: <a href="#order-1042">1042</a>, status: <span className="badge">Open</span>, placed: "Nov 12", total: "1,208.50" },
  },
  {
    id: "1043",
    cells: { order: <a href="#order-1043">1043</a>, status: <span className="badge">Refunded</span>, placed: "Nov 12", total: "8.00" },
  },
];

/** Default: a visible caption, a row header, node cells and an end aligned money column. */
export const Default: Story = { args: { caption: "Recent orders", columns, rows } };

/** Dense rows (44px, still clearing the tap floor). */
export const Dense: Story = { args: { caption: "Recent orders", columns, rows, isDense: true } };

/** The caller's empty state spans every column. The Table has no empty copy of its own. */
export const Empty: Story = {
  args: { caption: "Recent orders", columns, rows: [], emptyState: "No orders yet. They show here once a buyer checks out." },
};

/** The caption hidden visually; it still names the table and its scroll region. */
export const HiddenCaption: Story = { args: { caption: "Recent orders", isCaptionVisible: false, columns, rows } };

/** Each row restacks into a labelled card under the tablet breakpoint. Narrow the canvas to see it. */
export const StackedOnMobile: Story = { args: { caption: "Recent orders", columns, rows, isStackedOnMobile: true } };

/** A footer row of totals, passed as the caller's own tr. */
export const WithFooter: Story = {
  args: {
    caption: "Recent orders",
    columns,
    rows,
    footer: (
      <tr>
        <th scope="row" colSpan={3}>
          Total
        </th>
        <td className="nxs-table-cell nxs-table-cell-end">1,240.50</td>
      </tr>
    ),
  },
};

const nextDirection = (current?: TableSortDirection): TableSortDirection =>
  current === "ascending" ? "descending" : "ascending";

const SortableTable = () => {
  const [sort, setSort] = useState<{ key: string; direction: TableSortDirection }>({ key: "total", direction: "descending" });
  const sortable = columns.map((column) =>
    column.key === "placed" || column.key === "total"
      ? { ...column, isSortable: true, sortDirection: column.key === sort.key ? sort.direction : "none" }
      : column
  );
  const sign = sort.direction === "ascending" ? 1 : -1;
  const amount = (row: TableRowData) => Number(String(row.cells.total).replace(/,/g, ""));
  const sorted = [...rows].sort((a, b) =>
    sort.key === "total" ? (amount(a) - amount(b)) * sign : String(a.cells.placed).localeCompare(String(b.cells.placed)) * sign
  );
  return (
    <Table
      caption="Recent orders"
      columns={sortable}
      rows={sorted}
      onSort={(key) => setSort((current) => ({ key, direction: key === current.key ? nextDirection(current.direction) : "ascending" }))}
    />
  );
};

/** Sortable headers are real buttons; aria-sort on the th announces the order. */
export const Sortable: Story = { render: () => <SortableTable /> };
