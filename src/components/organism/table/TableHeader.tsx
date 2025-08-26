import TableRow from "@nxs-molecules/table/TableRow";
import type { PEventDay } from "nxs-calendar";
import type { PCardheader } from "nxs-card";

type TableHeaderProp = {
  header: PCardheader;
  data?: PEventDay[];
};
/**
 * element is used in conjunction with the <thead> and <tfoot>
 * elements to specify each part of a table (body, header, footer).
 * @param span array for each section
 * @returns
 */
const TableHeader: React.FC<TableHeaderProp> = ({ data, header }) => {
  console.log("header", header);
  console.log("data", data);
  if (!data) return null;
  return (
    <thead>
      {data.map((d) => (
        <TableRow key={d.uid} data={d.details} isHeader={d.isHeader} />
      ))}
    </thead>
  );
};
export default TableHeader;
