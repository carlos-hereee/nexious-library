import { TableDataProp } from "src/types/types";

const TableHeader: React.FC<TableDataProp> = ({ data }) => {
  return <th className="table-header">{data}</th>;
};
export default TableHeader;
