import { DataStringProps } from "helpers/types.js";

const Ribbon: React.FC<DataStringProps> = ({ data, name }) => {
  return <strong className={`ribbon${name ? ` ${name}` : ""}`}>{data}</strong>;
};
export default Ribbon;
