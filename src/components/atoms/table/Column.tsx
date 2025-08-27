/**
 * Specifies column properties for each column within a <colgroup> element
 * @param span number for many columns to affect with styling
 * @returns
 */

interface PTableData {
  data?: string;
  theme?: string;
}
const Column: React.FC<PTableData> = ({ data, theme }) => <th className={theme}>{data}</th>;

export default Column;
