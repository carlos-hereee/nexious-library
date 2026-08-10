import CellData from "@nxs-atoms/table/CellData";
import CellTitle from "@nxs-atoms/table/CellTitle";
import type { PEventDay } from "nxs-calendar";

type PColumnGroup = {
  data: PEventDay[];
  isHeader?: boolean;
  // Zero-based indexes of the columns that hold numbers, so their cells get tabular figures and
  // right alignment. Addressed by INDEX because alignment is a property of the column, not of one
  // row's datum, and because PEventDay (shared with the calendar) carries no per-cell class to
  // hang it on.
  numericColumns?: number[];
};
/**
 * Specifies a group of one or more columns in a table for formatting
 * @param data array specifing groups of columns in a table
 * @returns
 */
const TableColumn: React.FC<PColumnGroup> = ({ data, isHeader, numericColumns }) => (
  <tr className="table-column">
    {data.map((d, columnIndex) => {
      const cellClass = numericColumns?.includes(columnIndex) ? "cell-numeric" : undefined;
      return isHeader ? (
        <CellTitle key={d.uid} value={d.value} className={cellClass} />
      ) : (
        <CellData key={d.uid} value={d.value} className={cellClass} />
      );
    })}
  </tr>
);
export default TableColumn;
