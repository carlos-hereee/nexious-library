import TableColumn from "@nxs-molecules/table/TableColumn";
import type { PEventDay } from "nxs-calendar";

type TableHeaderProp = {
  data?: PEventDay[];
};
/**
 * element is used in conjunction with the <thead> and <tfoot>
 * elements to specify each part of a table (body, header, footer).
 * @param span array for each section
 * @returns
 */
const TableHeader: React.FC<TableHeaderProp> = ({ data }) => {
  if (!data) return <p className="error-message">No header data available</p>;
  return (
    <thead>
      <TableColumn data={data} isHeader />
    </thead>
  );
};
export default TableHeader;
