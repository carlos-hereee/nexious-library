import type { PTableData } from "custom-props";

const CellData: React.FC<PTableData> = ({ value }) => {
  return <td className="table-cell cell-data">{value}</td>;
};
export default CellData;
