import type { CellDataProp } from "custom-props";

/**
 * table caption
 * @param param0 table tittle
 * @returns caption
 */
const TableTitle: React.FC<CellDataProp> = ({ data }) => {
  return <caption className="table-caption">{data}</caption>;
};
export default TableTitle;
