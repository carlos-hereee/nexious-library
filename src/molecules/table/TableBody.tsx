// import { TableColumnProp } from "types/types";

import { CellDataProp } from "helpers/types";
import TableRow from "./TableRow";

type TableBodyProp = {
  data: CellDataProp[];
};
/**
 * element is used in conjunction with the <thead> and <tfoot>
 * elements to specify each part of a table (body, header, footer).
 * @param span array for each section
 * @returns
 */
const TableBody: React.FC<TableBodyProp> = ({ data }) => {
  return (
    <tbody>
      {data.map((d) => (
        <TableRow key={d.uid} data={d.data} />
      ))}
    </tbody>
  );
};
export default TableBody;
