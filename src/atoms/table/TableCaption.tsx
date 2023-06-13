import { CellDataProp } from "@nexious-library/helpers/types.tsx";

/**
 * table caption
 * @param param0 table tittle
 * @returns caption
 */
const TableTitle: React.FC<CellDataProp> = ({ data }) => {
  return <caption className="table-caption">{data}</caption>;
};
export default TableTitle;
