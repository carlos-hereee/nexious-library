import { DataStringProps } from "@nxs-helpers/types";

/**
 * Component - Subtitle
 * @param param0 string;
 * @returns
 */
const Subtitle: React.FC<DataStringProps> = ({ data }) => {
  return <h4 className="sub-title">{data}</h4>;
};

export default Subtitle;
