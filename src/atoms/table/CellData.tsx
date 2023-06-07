import { CellDataProp } from "src/types/types";

const CellData: React.FC<CellDataProp> = ({ data }) => {
  return <td className="table-cell cell-data">{data}</td>;
};
export default CellData;
