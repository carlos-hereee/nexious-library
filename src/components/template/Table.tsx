// import TableBody from "@nxs-organism/table/TableBody";
// import TableFooter from "@nxs-organism/table/TableFooter";
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
// const Table = ({ headerData, bodyData, footerData, theme, list }: TableProps) => {
const Table = ({ headerData, theme, list }: TableProps) => {
  return (
    <div className={theme || "table-responsive"}>
      {headerData && <TableHeader header={headerData} data={list} />}
      {/* <TableBody data={bodyData} />
      <TableFooter data={footerData} /> */}
    </div>
  );
};
export default Table;
