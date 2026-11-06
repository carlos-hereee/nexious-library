import TableColumn from "@nxs-molecules/table/TableColumn";
import type { PEventDay } from "nxs-calendar";

type TableHeaderProp = {
  data?: PEventDay[];
  // Threaded through so a numeric column's HEADER right-aligns with the figures beneath it.
  // A right-aligned number under a left-aligned label reads as a mistake.
  numericColumns?: number[];
};
/**
 * element is used in conjunction with the <thead> and <tfoot>
 * elements to specify each part of a table (body, header, footer).
 * @param span array for each section
 * @returns
 */
const TableHeader: React.FC<TableHeaderProp> = ({ data, numericColumns }) => {
  if (!data) return <p className="error-message">No header data available</p>;
  return (
    <thead>
      <TableColumn data={data} isHeader numericColumns={numericColumns} />
    </thead>
  );
};
export default TableHeader;
