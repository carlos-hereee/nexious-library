import { DataStringProps } from "@nexious-library/helpers/types";

const Ribbon: React.FC<DataStringProps> = ({ data, name }) => {
  return <strong className={`ribbon${name ? ` ${name}` : ""}`}>{data}</strong>;
};
export default Ribbon;
