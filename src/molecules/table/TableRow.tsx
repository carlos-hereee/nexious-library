// import { CellDataProp } from "~/helpers/types";
// import { CellData, CellTitle } from "~/atoms";

import { CellData, CellTitle } from "~/atoms";
import { CellDataProp } from "~/helpers/types";

const TableRow: React.FC<CellDataProp> = ({ data, isHeader }) => {
  return (
    <tr className="table-row">
      {isHeader ? <CellTitle data={data} /> : <CellData data={data} />}
    </tr>
  );
};
export default TableRow;
