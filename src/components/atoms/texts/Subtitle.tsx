import type { DataProp } from "nxs-typography";

/**
 * Component - Subtitle
 * @param param0 string;
 * @returns
 */
const Subtitle: React.FC<DataProp> = ({ data }) => {
  return <h4 className="sub-title">{data}</h4>;
};

export default Subtitle;
