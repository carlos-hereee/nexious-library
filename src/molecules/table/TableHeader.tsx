// import { TableColumnProp } from "types/types";

import { CellDataProp } from "helpers/types.js";
import TableRow from "./TableRow.js";

type TableHeaderProp = {
  data: CellDataProp[];
};
/**
 * element is used in conjunction with the <thead> and <tfoot>
 * elements to specify each part of a table (body, header, footer).
 * @param span array for each section
 * @returns
 */
const TableHeader: React.FC<TableHeaderProp> = ({ data }) => {
  return (
    <thead>
      {data.map((d) => (
        <TableRow key={d.uid} data={d.data} isHeader={d.isHeader} />
      ))}
    </thead>
  );
};
export default TableHeader;
