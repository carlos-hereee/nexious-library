import CellData from "@nxs-atoms/table/CellData";
import CellTitle from "@nxs-atoms/table/CellTitle";
import type { PTableData } from "custom-props";

const TableRow: React.FC<PTableData> = ({ value, isHeader }) => (
  <tr className="table-row">{isHeader ? <CellTitle value={value} /> : <CellData value={value} />}</tr>
);
export default TableRow;
