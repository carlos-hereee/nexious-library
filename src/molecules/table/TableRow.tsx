// import { CellData, CellTitle } from "@atoms/index.tsx";
// import { CellData, CellTitle } from "@main/main.tsx";
// import { CellData } from "@main/main.tsx";
// import { CellData } from "@main/main.tsx";
import { CellDataProp } from "@nexious-library/helpers/types.tsx";
import { CellData, CellTitle } from "@nexious-library/atoms/index.tsx";
// import { CellTitle, CellData } from "@atoms/index.tsx";
// import { CellData } from "main.tsx";
// import { CellData, CellTitle } from "@atoms/index.tsx";
// import { CellData } from "main.tsx";
// import { CellData, CellTitle } from "main.tsx";
// import { CellTitle } from "main.tsx";
// import { CellData, CellTitle } from "main.tsx";

const TableRow: React.FC<CellDataProp> = ({ data, isHeader }) => {
  return (
    <tr className="table-row">
      {isHeader ? <CellTitle data={data} /> : <CellData data={data} />}
    </tr>
  );
};
export default TableRow;
