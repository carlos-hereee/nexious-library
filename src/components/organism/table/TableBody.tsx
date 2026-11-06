import TableCaption from "@nxs-atoms/table/TableCaption";
import TableRow from "@nxs-molecules/table/TableRow";
import type { PTableData } from "custom-props";

type TableBodyProp = {
  data?: PTableData[];
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
      {data && data.length > 0 ? (
        // isHeader is deliberately NOT forwarded: it would turn a body cell into a th, and any
        // caller that set it on body data today is getting a td and expecting one.
        data.map((d) => <TableRow key={d.uid} value={d.value} className={d.className} />)
      ) : (
        <tr className="table-row">
          <TableCaption value="No data available" />
        </tr>
      )}
    </tbody>
  );
};
export default TableBody;
