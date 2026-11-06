import TableCaption from "@nxs-atoms/table/TableCaption";
import TableBody from "@nxs-organism/table/TableBody";
import TableHeader from "@nxs-organism/table/TableHeader";
import type { TableProps } from "custom-props";

// isDense and numericColumns are declared here instead of on TableProps because that interface
// lives in the shared @types barrel next to unrelated props; widening it locally keeps every
// other reader of TableProps the same shape.
type PTable = TableProps & {
  // Swaps the row height from --row-height (52px) to --row-height-dense (44px). Both clear the
  // tap floor, which is why the density toggle is safe to expose at all.
  isDense?: boolean;
  numericColumns?: number[];
};

const Table = ({ headerData, className, list, bodyData, isDense, numericColumns }: PTable) => {
  if (!list || list.length === 0) return <p className="error-message">No data available</p>;
  // Consumer class stays FIRST, exactly as before, so a selector or a test that matched the old
  // `${className} table` string still matches.
  const tableClass = [className, "table", isDense && "table-dense"].filter(Boolean).join(" ");
  return (
    // The wrapper is the component's job, not the consumer's: the sticky header needs a
    // scrollport to pin against and a wide table needs somewhere to overflow that is not the
    // page. See the .table-scroll block in vars/reset/_table.scss for why the two are the same
    // element and why it carries a height cap.
    <div className="table-scroll">
      <table className={tableClass}>
        <TableCaption value={headerData?.title || ""} className="table-title" />
        <TableCaption value={headerData?.subtitle || ""} className="table-subtitle" />
        <TableHeader data={list.map((l) => ({ ...l, isHeader: true }))} numericColumns={numericColumns} />
        <TableBody data={bodyData} />
        {/* <TableFooter data={footerData} /> */}
      </table>
    </div>
  );
};
export default Table;
