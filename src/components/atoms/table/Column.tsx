/**
 * Specifies column properties for each column within a <colgroup> element
 * @param span number for many columns to affect with styling
 * @returns
 */

// Renamed from PTableData, which is also the name of an unrelated shared type in custom-props
// with a different shape. Two types, one name, one of them file-local, is a trap for whoever
// edits this next.
interface PColumn {
  data?: string;
  className?: string;
}
// Carries the same base class as CellTitle so a header rendered through either atom gets the
// overline and sticky treatment from the reset, instead of one of the two silently opting out.
const Column: React.FC<PColumn> = ({ data, className }) => (
  <th className={className ? `cell-header ${className}` : "cell-header"} scope="col">
    {data}
  </th>
);

export default Column;
