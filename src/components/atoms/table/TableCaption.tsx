import type { PTableData } from "custom-props";

/**
 * table caption
 * @param param0 table tittle
 * @returns caption
 */
const TableTitle: React.FC<PTableData> = ({ value, theme }) => (
  <caption className={theme || "table-caption"}>{value}</caption>
);
export default TableTitle;
