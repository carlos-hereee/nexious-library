import { TableDataProp } from "src/types/types";

/**
 * table caption
 * @param param0 table tittle
 * @returns caption
 */
const TableTitle: React.FC<TableDataProp> = ({ data }) => {
  return <caption className="table-caption">{data}</caption>;
};
export default TableTitle;
