import TableCaption from "@nxs-atoms/table/TableCaption";
import TableColumn from "@nxs-molecules/table/TableColumn";
import TableHeader from "@nxs-organism/table/TableHeader";
import type { PHoursOfOperation } from "nxs-navigation";

interface PHours {
  data: PHoursOfOperation;
}
const HoursOfOperation = ({ data }: PHours) => {
  const { days, header, footer } = data;

  return (
    <div className="hours-of-operation-wrapper">
      <table className="table hours-of-operation">
        <TableCaption value={header?.title || ""} theme="table-title" />
        <TableCaption value={header?.subtitle || ""} theme="table-subtitle" />
        <TableHeader data={days.map((day) => ({ ...day, isHeader: true }))} />
        <tbody className="table-body">
          <TableColumn data={days.map((day) => ({ ...day, value: day.details }))} />
        </tbody>
        {footer && (
          <tfoot className="table-footer">
            <TableCaption value={footer?.data || ""} theme="table-footer-caption" />
          </tfoot>
        )}
      </table>
    </div>
  );
};
export default HoursOfOperation;
