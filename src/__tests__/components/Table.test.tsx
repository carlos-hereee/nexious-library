import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import Table from "@nxs-organism/table/Table";
import TableHeader from "@nxs-organism/table/TableHeader";
import TableFooter from "@nxs-organism/table/TableFooter";
import HoursOfOperation from "@nxs-template/HoursOfOperation";
import type { TableColumn, TableRowData } from "custom-props";
import { Table as RootTable, TableBody as RootTableBody } from "../../main";

// ── Table (2026-11 item 337 Session 3) ──
// The columns and rows table: node cells, one caption, th scope, aria-sort, a labelled scroll
// region, density, the caller's empty state, and no copy of its own. HoursOfOperation still
// renders TableHeader's 4.x data API, pinned at the end.

expect.extend(toHaveNoViolations);

const AXE_OPTIONS = { rules: { region: { enabled: false } } };

const columns: TableColumn[] = [
  { key: "order", header: "Order", isRowHeader: true },
  { key: "status", header: "Status" },
  { key: "total", header: "Total", align: "end", isSortable: true, sortDirection: "descending" },
  { key: "placed", header: "Placed", isSortable: true },
  { key: "actions", header: <span className="sr-only">Actions</span>, label: "Actions" },
];

const rows: TableRowData[] = [
  {
    id: "1041",
    cells: {
      order: "1041",
      status: <span className="badge">Paid</span>,
      total: "24.00",
      placed: "Nov 11",
      actions: <button type="button">Refund 1041</button>,
    },
  },
  { id: "1042", cells: { order: "1042", status: <span className="badge">Open</span>, total: "8.50", placed: "Nov 12" } },
];

describe("Table", () => {
  it("is exported from the package root with its parts", () => {
    expect(RootTable).toBe(Table);
    expect(RootTableBody).toBeDefined();
  });

  it("renders one caption that also names the scroll region", () => {
    const { container } = render(<Table caption="Orders" columns={columns} rows={rows} />);

    expect(container.querySelectorAll("caption")).toHaveLength(1);
    expect(screen.getByRole("table", { name: "Orders" })).toBeInTheDocument();
    const region = screen.getByRole("region", { name: "Orders" });
    expect(region).toHaveClass("nxs-table-scroll");
    expect(region).toHaveAttribute("tabIndex", "0");
  });

  it("hides the caption visually but keeps it as the name when asked", () => {
    render(<Table caption="Orders" isCaptionVisible={false} columns={columns} rows={rows} />);

    expect(screen.getByText("Orders")).toHaveClass("sr-only");
    expect(screen.getByRole("table", { name: "Orders" })).toBeInTheDocument();
  });

  it("gives every column header scope col and a row header scope row", () => {
    const { container } = render(<Table caption="Orders" columns={columns} rows={rows} />);

    const headers = container.querySelectorAll("thead th");
    expect(headers).toHaveLength(5);
    headers.forEach((cell) => expect(cell).toHaveAttribute("scope", "col"));
    expect(screen.getByRole("rowheader", { name: "1041" })).toHaveAttribute("scope", "row");
  });

  it("renders a row with a button, a badge and a sortable header", () => {
    render(<Table caption="Orders" columns={columns} rows={rows} onSort={jest.fn()} />);

    const firstRow = screen.getAllByRole("row")[1];
    expect(within(firstRow).getByRole("button", { name: "Refund 1041" })).toBeInTheDocument();
    expect(within(firstRow).getByText("Paid")).toHaveClass("badge");
    expect(screen.getByRole("columnheader", { name: "Total" })).toHaveAttribute("aria-sort", "descending");
    expect(screen.getByRole("columnheader", { name: "Placed" })).toHaveAttribute("aria-sort", "none");
    // A column that does not sort carries no aria-sort at all, so it is not announced as sortable.
    expect(screen.getByRole("columnheader", { name: "Status" })).not.toHaveAttribute("aria-sort");
  });

  it("sorts through a real header button, by keyboard as well as by click", () => {
    const onSort = jest.fn();
    render(<Table caption="Orders" columns={columns} rows={rows} onSort={onSort} />);

    const sortTotal = screen.getByRole("button", { name: "Total" });
    expect(sortTotal.tagName).toBe("BUTTON");
    expect(sortTotal).toHaveAttribute("type", "button");
    sortTotal.focus();
    expect(sortTotal).toHaveFocus();
    // A native button turns Enter and Space into a click; jsdom does not, so the click is what
    // the keyboard path reaches.
    fireEvent.click(sortTotal);
    expect(onSort).toHaveBeenCalledWith("total");
    expect(screen.queryByRole("button", { name: "Status" })).not.toBeInTheDocument();
  });

  it("renders no sort buttons without onSort, keeping aria-sort", () => {
    render(<Table caption="Orders" columns={columns} rows={rows} />);

    expect(screen.queryByRole("button", { name: "Total" })).not.toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Total" })).toHaveAttribute("aria-sort", "descending");
  });

  it("aligns an end column's header and cells together", () => {
    render(<Table caption="Orders" columns={columns} rows={rows} />);

    expect(screen.getByRole("columnheader", { name: "Total" })).toHaveClass("nxs-table-cell-end");
    expect(screen.getByText("24.00")).toHaveClass("nxs-table-cell", "nxs-table-cell-end");
  });

  it("labels each cell for the stacked phone layout", () => {
    render(<Table caption="Orders" columns={columns} rows={rows} isStackedOnMobile />);

    expect(screen.getByRole("table")).toHaveClass("nxs-table", "nxs-table-stacked");
    expect(screen.getByText("Nov 11")).toHaveAttribute("data-label", "Placed");
    // A node header falls back to the column's plain label.
    expect(screen.getByRole("button", { name: "Refund 1041" }).closest("td")).toHaveAttribute("data-label", "Actions");
  });

  it("renders the dense modifier and keeps the caller's class last", () => {
    render(<Table caption="Orders" columns={columns} rows={rows} isDense className="orders-table" />);

    expect(screen.getByRole("table")).toHaveAttribute("class", "nxs-table nxs-table-dense orders-table");
  });

  it("renders a missing cell as an empty cell so the row keeps its columns", () => {
    const { container } = render(<Table caption="Orders" columns={columns} rows={rows} />);

    expect(container.querySelectorAll("tbody tr")[1].children).toHaveLength(5);
  });

  it("puts the caller's empty state in one cell spanning every column", () => {
    const { container } = render(
      <Table caption="Orders" columns={columns} rows={[]} emptyState={<p>No orders yet</p>} />
    );

    const cell = screen.getByText("No orders yet").closest("td");
    expect(cell).toHaveAttribute("colSpan", "5");
    expect(container.querySelectorAll("tbody tr")).toHaveLength(1);
  });

  it("owns no copy: with no rows and no empty state the body is empty", () => {
    const { container } = render(<Table caption="Orders" columns={columns} rows={[]} />);

    expect(container.querySelectorAll("tbody tr")).toHaveLength(0);
    expect(container.querySelector("tbody")?.textContent).toBe("");
  });

  it("renders the caller's footer rows in a tfoot", () => {
    render(
      <Table
        caption="Orders"
        columns={columns}
        rows={rows}
        footer={
          <tr>
            <td colSpan={2}>Total</td>
            <td>32.50</td>
          </tr>
        }
      />
    );

    expect(screen.getByText("32.50").closest("tfoot")).toHaveClass("nxs-table-footer");
  });

  it("has no violations with sortable headers, node cells and the stacked layout", async () => {
    const { container } = render(
      <Table caption="Orders" columns={columns} rows={rows} onSort={jest.fn()} isStackedOnMobile />
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });

  it("has no violations empty, dense and with a hidden caption", async () => {
    const { container } = render(
      <Table caption="Orders" isCaptionVisible={false} isDense columns={columns} rows={[]} emptyState="No orders yet" />
    );
    expect(await axe(container, AXE_OPTIONS)).toHaveNoViolations();
  });
});

describe("Table parts", () => {
  it("TableFooter appends the caller's class", () => {
    render(
      <table>
        <TableFooter className="totals">
          <tr>
            <td>Sum</td>
          </tr>
        </TableFooter>
      </table>
    );
    expect(screen.getByText("Sum").closest("tfoot")).toHaveAttribute("class", "nxs-table-footer totals");
  });

  it("TableHeader keeps the 4.x data markup HoursOfOperation renders", () => {
    const { container } = render(
      <table>
        <TableHeader data={[{ uid: "mon", value: "monday" }]} numericColumns={[0]} />
      </table>
    );
    expect(container.querySelector("thead")?.innerHTML).toBe(
      '<tr class="table-column"><th class="cell-header cell-numeric" scope="col">Monday</th></tr>'
    );
  });

  it("TableHeader keeps the 4.x missing data message by default and takes the caller's", () => {
    const { rerender } = render(<TableHeader data={undefined} />);
    expect(screen.getByText("No header data available")).toHaveClass("error-message");

    rerender(<TableHeader data={undefined} missingDataMessage="Sin datos de encabezado" />);
    expect(screen.getByText("Sin datos de encabezado")).toHaveClass("error-message");
  });

  it("HoursOfOperation still renders its 4.x table", () => {
    const { container } = render(
      <HoursOfOperation
        data={{ days: [{ uid: "mon", value: "monday", details: "9 to 5" }], header: { title: "Hours" }, footer: { data: "Closed on holidays" } }}
      />
    );
    expect(container.querySelector("table")).toHaveClass("table", "hours-of-operation");
    expect(container.querySelector("thead th")).toHaveClass("cell-header");
    expect(screen.getByText("9 to 5")).toHaveClass("table-cell", "cell-data");
  });
});
