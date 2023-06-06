import { DataStringProp } from "src/types/types";

const Ribbon: React.FC<DataStringProp> = ({ data, name }) => {
  return <strong className={`ribbon${name ? ` ${name}` : ""}`}>{data}</strong>;
};
export default Ribbon;
