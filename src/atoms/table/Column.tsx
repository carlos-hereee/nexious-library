import { TableColumnProp } from "helpers/types";

/**
 * Specifies column properties for each column within a <colgroup> element
 * @param span number for many columns to affect with styling
 * @returns
 */
const Column: React.FC<TableColumnProp> = ({ span, name }) => {
  return <col span={span} className={name} />;
};
export default Column;
