import type { PTableData } from "custom-props";

// className was already on PTableData and was being dropped on the floor here, which is why a
// caller had no way to mark a column numeric. It APPENDS rather than replaces: nexious-client
// selects on .table-cell and .cell-data, and this is a published component in a repo we cannot
// see the consumers of, so the base classes are not ours to swap out.
const CellData: React.FC<PTableData> = ({ value, className }) => {
  return <td className={className ? `table-cell cell-data ${className}` : "table-cell cell-data"}>{value}</td>;
};
export default CellData;
