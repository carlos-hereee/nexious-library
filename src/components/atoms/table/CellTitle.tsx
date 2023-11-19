import type { CellDataProp } from "custom-props";

const CellTitle: React.FC<CellDataProp> = ({ data }) => {
  return <th className="cell-header">{data}</th>;
};
export default CellTitle;
