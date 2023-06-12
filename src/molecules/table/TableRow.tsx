// import { CellData, CellTitle } from "@atoms/index.js";
// import { CellData, CellTitle } from "@main/main.js";
// import { CellData } from "@main/main.js";
// import { CellData } from "@main/main.js";
import { CellDataProp } from "@nexious-library/helpers/types.js";
import { CellData, CellTitle } from "main.js";
// import { CellTitle, CellData } from "@atoms/index.js";
// import { CellData } from "main.js";
// import { CellData, CellTitle } from "@atoms/index.js";
// import { CellData } from "main.js";
// import { CellData, CellTitle } from "main.js";
// import { CellTitle } from "main.js";
// import { CellData, CellTitle } from "main.js";

const TableRow: React.FC<CellDataProp> = ({ data, isHeader }) => {
  return (
    <tr className="table-row">
      {isHeader ? <CellTitle data={data} /> : <CellData data={data} />}
    </tr>
  );
};
export default TableRow;
