import { memo } from "react";
import CellData from "@nxs-atoms/table/CellData";
import CellTitle from "@nxs-atoms/table/CellTitle";
import type { PTableData } from "custom-props";

const TableRow: React.FC<PTableData> = ({ value, isHeader }) => (
  <tr className="table-row">{isHeader ? <CellTitle value={value} /> : <CellData value={value} />}</tr>
);
// Pure leaf with stable props (value/isHeader, no handlers) — memo lets a TableBody
// re-render skip every row whose value is unchanged, instead of re-rendering all rows.
export default memo(TableRow);
