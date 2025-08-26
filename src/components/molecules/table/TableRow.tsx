import CellData from "@nxs-atoms/table/CellData";
import CellTitle from "@nxs-atoms/table/CellTitle";
import type { PTableData } from "custom-props";

const TableRow: React.FC<PTableData> = ({ data, isHeader }) => {
  return <tr className="table-row">{isHeader ? <CellTitle data={data} /> : <CellData data={data} />}</tr>;
};
export default TableRow;
