import { TableDataProp } from "src/types/types";

const CellTitle: React.FC<TableDataProp> = ({ data }) => {
  return <th className="table-header">{data}</th>;
};
export default CellTitle;
