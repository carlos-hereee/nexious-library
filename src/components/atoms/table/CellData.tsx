import type { PTableData } from "custom-props";

const CellData: React.FC<PTableData> = ({ data }) => {
  return <td className="table-cell cell-data">{data}</td>;
};
export default CellData;
