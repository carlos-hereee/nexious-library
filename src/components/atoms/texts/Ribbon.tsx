import type { DataProp } from "nxs-typography";

const Ribbon: React.FC<DataProp> = ({ data, name }) => {
  return <strong className={`ribbon${name ? ` ${name}` : ""}`}>{data}</strong>;
};
export default Ribbon;
