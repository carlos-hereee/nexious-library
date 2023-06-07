import { TableData } from "src/atoms";
import { TableDataProp } from "src/types/types";

const TableRow: React.FC<TableDataProp> = ({ data }) => {
  return (
    <tr className="table-row">
      <TableData data={data} />
    </tr>
  );
};
export default TableRow;
