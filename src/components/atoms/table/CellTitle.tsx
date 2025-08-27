import type { PTableData } from "custom-props";
import { capFirstCharacter } from "@nxs-utils/data/text";

const CellTitle: React.FC<PTableData> = ({ value }) => {
  return <th className="cell-header">{capFirstCharacter(value || "")}</th>;
};
export default CellTitle;
