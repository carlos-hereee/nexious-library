import { CellData, CellTitle } from "@nxs-atoms";
import { CellDataProp } from "@nxs-utils/helpers/types";

const TableRow: React.FC<CellDataProp> = ({ data, isHeader }) => {
  return (
    <tr className="table-row">
      {isHeader ? <CellTitle data={data} /> : <CellData data={data} />}
    </tr>
  );
};
export default TableRow;
