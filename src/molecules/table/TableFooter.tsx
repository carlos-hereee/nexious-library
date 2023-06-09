// import { TableColumnProp } from "types/types";

import { CellDataProp } from "helpers/types.js";
import TableRow from "./TableRow.js";

type TableBodyProp = {
  data: CellDataProp[];
};
/**
 * element is used in conjunction with the <thead> and <tfoot>
 * elements to specify each part of a table (body, header, footer).
 * @param span array for each section
 * @returns
 */
const TableFooter: React.FC<TableBodyProp> = ({ data }) => {
  return (
    <tfoot>
      {data.map((d) => (
        <TableRow key={d.uid} data={d.data} />
      ))}
    </tfoot>
  );
};
export default TableFooter;
