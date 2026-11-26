import { memo } from "react";
import CellData from "@nxs-atoms/table/CellData";
import CellTitle from "@nxs-atoms/table/CellTitle";
import type { PTableData } from "custom-props";

// className lands on the CELL, not on the tr, because the one thing it is for is opting a cell
// into `.cell-numeric`, and alignment set on a row loses to the explicit `th, td` rule in the
// reset rather than inheriting into it.
const TableRow: React.FC<PTableData> = ({ value, isHeader, className }) => (
  <tr className="table-row">
    {isHeader ? <CellTitle value={value} className={className} /> : <CellData value={value} className={className} />}
  </tr>
);
// Pure leaf with stable props (value/isHeader/className, no handlers), memo lets a TableBody
// re-render skip every row whose value is unchanged, instead of re-rendering all rows.
export default memo(TableRow);
