import { TableColumnProp } from "helpers/types.js";
import Column from "../../atoms/table/Column.js";

type CoulmnGroup = {
  data: TableColumnProp[];
};
/**
 * Specifies a group of one or more columns in a table for formatting
 * @param data array specifing groups of columns in a table
 * @returns
 */
const ColumnGroup: React.FC<CoulmnGroup> = ({ data }) => {
  return (
    <colgroup>
      {data.map((d) => (
        <Column key={d.uid} name={d.name} span={d.span} />
      ))}
    </colgroup>
  );
};
export default ColumnGroup;
