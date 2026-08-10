import TableCaption from "@nxs-atoms/table/TableCaption";
import TableBody from "@nxs-organism/table/TableBody";
import TableHeader from "@nxs-organism/table/TableHeader";
import type { TableProps } from "custom-props";

const Table = ({ headerData, className, list, bodyData }: TableProps) => {
  if (!list || list.length === 0) return <p className="error-message">No data available</p>;
  return (
    <table className={className ? `${className} table` : "table"}>
      <TableCaption value={headerData?.title || ""} className="table-title" />
      <TableCaption value={headerData?.subtitle || ""} className="table-subtitle" />
      <TableHeader data={list.map((l) => ({ ...l, isHeader: true }))} />
      <TableBody data={bodyData} />
      {/* <TableFooter data={footerData} /> */}
    </table>
  );
};
export default Table;
