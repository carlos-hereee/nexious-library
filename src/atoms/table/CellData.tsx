import { CellDataProp } from "helpers/types.js";

const CellData: React.FC<CellDataProp> = ({ data }) => {
  return <td className="table-cell cell-data">{data}</td>;
};
export default CellData;
