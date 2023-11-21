import type { DataProp } from "nxs-typography";

const CamelSpace: React.FC<DataProp> = ({ data }) => {
  if (!data) return <span />;
  return <span> {data.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}</span>;
};
export default CamelSpace;
