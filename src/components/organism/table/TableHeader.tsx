import TableColumn from "@nxs-molecules/table/TableColumn";
import { columnCellClass } from "@nxs-utils/helpers/tableCell";
import type { TableColumn as TableColumnDef, TableHeaderColumnsProps, TableHeaderProps } from "custom-props";

// The columns API is the Table's; the data API is the 4.x shape HoursOfOperation still renders,
// kept byte for byte so its markup does not move (2026-11 item 337 compatibility rule).
// The 4.x English default, kept so HoursOfOperation renders what it always did; overridable
// through `missingDataMessage` so a localized caller is not stuck with it.
const DEFAULT_MISSING_DATA_MESSAGE = "No header data available";

const isColumnsProps = (props: TableHeaderProps): props is TableHeaderColumnsProps => "columns" in props;

type HeaderCellProps = { column: TableColumnDef; onSort?: (key: string) => void };

/** One header cell. A sortable column gets aria-sort, and a button when the Table can sort. */
const HeaderCell = ({ column, onSort }: HeaderCellProps) => {
  const sortDirection = column.isSortable ? column.sortDirection ?? "none" : undefined;
  const cellClass = columnCellClass(column, "nxs-table-header-cell");
  if (!column.isSortable || !onSort) {
    return (
      <th scope="col" className={cellClass} aria-sort={sortDirection}>
        {column.header}
      </th>
    );
  }
  return (
    <th scope="col" className={cellClass} aria-sort={sortDirection}>
      {/* The button is named by the header alone; aria-sort on the th announces the order, so the
          arrow is drawn in CSS and hidden rather than spoken a second time. */}
      <button type="button" className="nxs-table-sort" data-sort={sortDirection} onClick={() => onSort(column.key)}>
        {column.header}
        <span className="nxs-table-sort-icon" aria-hidden="true" />
      </button>
    </th>
  );
};

/**
 * Component: TableHeader
 *
 * The thead of a Table: one th scope="col" per column. Given `data` instead of `columns` it
 * renders the 4.x header HoursOfOperation uses, unchanged.
 */
const TableHeader = (props: TableHeaderProps) => {
  if (isColumnsProps(props)) {
    const { columns, onSort } = props;
    return (
      <thead>
        <tr className="nxs-table-header-row">
          {columns.map((column) => (
            <HeaderCell key={column.key} column={column} onSort={onSort} />
          ))}
        </tr>
      </thead>
    );
  }
  const { data, numericColumns, missingDataMessage = DEFAULT_MISSING_DATA_MESSAGE } = props;
  if (!data) return <p className="error-message">{missingDataMessage}</p>;
  return (
    <thead>
      <TableColumn data={data} isHeader numericColumns={numericColumns} />
    </thead>
  );
};
export default TableHeader;
