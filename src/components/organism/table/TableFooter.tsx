import TableRow from "@nxs-molecules/table/TableRow";
import type { PTableData } from "custom-props";

type TableBodyProp = {
  data: PTableData[];
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
