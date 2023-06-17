// import { CellData, CellTitle } from "@atoms";
// import { CellData, CellTitle } from "@main/main";
// import { CellData } from "@main/main";
// import { CellData } from "@main/main";
import { CellData, CellTitle } from "@nexious-library/atoms/table";
import { CellDataProp } from "@nexious-library/helpers/types";
// import { CellTitle, CellData } from "@atoms";
// import { CellData } from "@nexious-library/atoms/index";
// import { CellData, CellTitle } from "@atoms";
// import { CellData } from "@nexious-library/atoms/index";
// import { CellData, CellTitle } from "@nexious-library/atoms/index";
// import { CellTitle } from "@nexious-library/atoms/index";
// import { CellData, CellTitle } from "@nexious-library/atoms/index";

const TableRow: React.FC<CellDataProp> = ({ data, isHeader }) => {
  return (
    <tr className="table-row">
      {isHeader ? <CellTitle data={data} /> : <CellData data={data} />}
    </tr>
  );
};
export default TableRow;
