import { DataStringProps } from "@nexious-library/helpers/types.tsx";

const CamelSpace: React.FC<DataStringProps> = ({ data }) => {
  return <span> {data.replace(/([a-z0-9])([A-Z])/g, "$1 $2")}</span>;
};
export default CamelSpace;
