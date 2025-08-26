import type { PTableData } from "custom-props";

/**
 * table caption
 * @param param0 table tittle
 * @returns caption
 */
const TableTitle: React.FC<PTableData> = ({ data }) => {
  return <caption className="table-caption">{data}</caption>;
};
export default TableTitle;
