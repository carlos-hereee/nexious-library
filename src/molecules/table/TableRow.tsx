import { CellData, CellTitle } from "src/atoms";
import { CellDataProp } from "src/types/types";

const TableRow: React.FC<CellDataProp> = ({ data, isHeader }) => {
  return (
    <tr className="table-row">
      {isHeader ? <CellTitle data={data} /> : <CellData data={data} />}
    </tr>
  );
};
export default TableRow;
