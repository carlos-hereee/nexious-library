// import TableBody from "@nxs-organism/table/TableBody";
// import TableFooter from "@nxs-organism/table/TableFooter";
import TableTitle from "@nxs-atoms/table/TableCaption";
// import { CardHeader } from "@nxs-molecules/index";
import TableHeader from "@nxs-organism/table/TableHeader";
import type { PEventDay } from "nxs-calendar";
// import type { PTableData } from "custom-props";
import type { PCardheader } from "nxs-card";

interface TableProps {
  theme?: string;
  headerData?: PCardheader;
  list?: PEventDay[];
  //   bodyData?: PTableData[];
  //   footerData?: PTableData[];
}
const Table = ({ headerData, theme, list }: TableProps) => {
  if (!list || list.length === 0) return <p className="error-message">No data available</p>;
  return (
    <div>
      {/* {headerData && <CardHeader data={headerData} />} */}
      <table className={theme ? `${theme} table` : "table"}>
        <TableTitle value={headerData?.title || ""} theme="table-title" />
        <TableTitle value={headerData?.subtitle || ""} theme="table-details" />
        <TableHeader data={list.map((l) => ({ ...l, isHeader: true }))} />
        {/* <TableBody data={bodyData} />
      <TableFooter data={footerData} /> */}
      </table>
    </div>
  );
};
export default Table;
