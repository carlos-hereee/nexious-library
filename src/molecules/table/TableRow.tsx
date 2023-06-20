import { CellData, CellTitle } from "@nexious/atoms";
import { CellDataProp } from "@nexious-helpers/types";

const TableRow: React.FC<CellDataProp> = ({ data, isHeader }) => {
  return (
    <tr className="table-row">
      {isHeader ? <CellTitle data={data} /> : <CellData data={data} />}
    </tr>
  );
};
export default TableRow;
