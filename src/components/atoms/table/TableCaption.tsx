import type { PTableData } from "custom-props";

/**
 * table caption
 * @param param0 table tittle
 * @returns caption
 */
const TableCaption: React.FC<PTableData> = ({ value, className }) => (
  <caption className={className || "table-caption"}>{value}</caption>
);
export default TableCaption;
