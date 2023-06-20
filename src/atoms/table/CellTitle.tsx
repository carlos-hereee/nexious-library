import { CellDataProp } from "@nexious-helpers/types";

const CellTitle: React.FC<CellDataProp> = ({ data }) => {
  return <th className="cell-header">{data}</th>;
};
export default CellTitle;
