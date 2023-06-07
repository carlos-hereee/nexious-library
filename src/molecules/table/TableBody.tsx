// import { TableColumnProp } from "src/types/types";

import { TableRowProp } from "src/types/types";
import TableRow from "./TableRow";

type TableBody = {
  data: TableRowProp[];
};
/**
 * element is used in conjunction with the <thead> and <tfoot>
 * elements to specify each part of a table (body, header, footer).
 * @param span array for each section
 * @returns
 */
const TableBody: React.FC<TableBody> = ({ data }) => {
  return (
    <tbody>
      {data.map((d) => (
        <TableRow key={d.uid} data={d.data} />
      ))}
    </tbody>
  );
};
export default TableBody;
