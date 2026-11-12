import { columnCellClass, stackedCellLabel } from "@nxs-utils/helpers/tableCell";
import type { TableBodyProps } from "custom-props";

/**
 * Component: TableBody
 *
 * One tr per row and one cell per column, in column order, so a row cannot render its cells out
 * of step with the header. With no rows it renders the caller's emptyState in one cell that
 * spans every column, because a message in no cell is invalid markup and reads as a broken grid.
 */
const TableBody = ({ columns, rows, emptyState }: TableBodyProps) => {
  if (rows.length === 0) {
    return (
      <tbody>
        {emptyState ? (
          <tr className="nxs-table-empty-row">
            <td className="nxs-table-cell nxs-table-empty" colSpan={Math.max(columns.length, 1)}>
              {emptyState}
            </td>
          </tr>
        ) : null}
      </tbody>
    );
  }
  return (
    <tbody>
      {rows.map((row) => (
        <tr key={row.id} className={row.className ? `nxs-table-row ${row.className}` : "nxs-table-row"}>
          {columns.map((column) => {
            const cellClass = columnCellClass(column, "nxs-table-cell");
            const label = stackedCellLabel(column);
            if (column.isRowHeader) {
              return (
                <th key={column.key} scope="row" className={cellClass} data-label={label}>
                  {row.cells[column.key]}
                </th>
              );
            }
            return (
              <td key={column.key} className={cellClass} data-label={label}>
                {row.cells[column.key]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
export default TableBody;
