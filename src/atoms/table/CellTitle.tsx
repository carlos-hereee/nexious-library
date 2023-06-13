import { CellDataProp } from "@nexious-library/helpers/types.tsx";

const CellTitle: React.FC<CellDataProp> = ({ data }) => {
  return <th className="cell-header">{data}</th>;
};
export default CellTitle;
