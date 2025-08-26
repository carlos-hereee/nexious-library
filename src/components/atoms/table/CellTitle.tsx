import type { PTableData } from "custom-props";

const CellTitle: React.FC<PTableData> = ({ data }) => {
  return <th className="cell-header">{data}</th>;
};
export default CellTitle;
