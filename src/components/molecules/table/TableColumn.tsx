import CellData from "@nxs-atoms/table/CellData";
import CellTitle from "@nxs-atoms/table/CellTitle";
import type { PEventDay } from "nxs-calendar";

type PColumnGroup = {
  data: PEventDay[];
  isHeader?: boolean;
};
/**
 * Specifies a group of one or more columns in a table for formatting
 * @param data array specifing groups of columns in a table
 * @returns
 */
const TableColumn: React.FC<PColumnGroup> = ({ data, isHeader }) => (
  <tr className="table-column">
    {data.map((d) => (isHeader ? <CellTitle key={d.uid} value={d.value} /> : <CellData key={d.uid} value={d.value} />))}
  </tr>
);
export default TableColumn;
