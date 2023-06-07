import { TableDataProp } from "src/types/types";

const TableData: React.FC<TableDataProp> = ({ data }) => {
  return <td className="table-cell cell-data">{data}</td>;
};
export default TableData;
