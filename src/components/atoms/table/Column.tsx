/**
 * Specifies column properties for each column within a <colgroup> element
 * @param span number for many columns to affect with styling
 * @returns
 */

interface PTableData {
  data?: string;
  className?: string;
}
const Column: React.FC<PTableData> = ({ data, className }) => (
  <th className={className} scope="col">
    {data}
  </th>
);

export default Column;
