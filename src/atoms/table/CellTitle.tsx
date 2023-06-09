import { CellDataProp } from "helpers/types.js";

const CellTitle: React.FC<CellDataProp> = ({ data }) => {
  return <th className="cell-header">{data}</th>;
};
export default CellTitle;
