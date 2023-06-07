import { TableDataProp } from "src/types/types";

const CellData: React.FC<TableDataProp> = ({ data }) => {
  return <td className="table-cell cell-data">{data}</td>;
};
export default CellData;
