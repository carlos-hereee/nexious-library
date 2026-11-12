import type { PTableData } from "custom-props";
import { capFirstCharacter } from "@nxs-utils/data/text";

// The stylesheet uppercases a thead cell, so capFirstCharacter looks redundant here. It is not:
// this component also renders header cells outside a thead, where the overline rule does not
// apply, and text-transform never touches the accessible name a screen reader announces.
const CellTitle: React.FC<PTableData> = ({ value, className }) => {
  return (
    <th className={className ? `cell-header ${className}` : "cell-header"} scope="col">
      {capFirstCharacter(value || "")}
    </th>
  );
};
export default CellTitle;
