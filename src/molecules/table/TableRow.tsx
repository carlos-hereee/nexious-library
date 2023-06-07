import { CellData } from "src/atoms";
import { TableDataProp } from "src/types/types";

const TableRow: React.FC<TableDataProp> = ({ data }) => {
  return (
    <tr className="table-row">
      <CellData data={data} />
    </tr>
  );
};
export default TableRow;
