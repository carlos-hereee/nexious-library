import { DataStringProps } from "@nxs-helpers/types";

/**
 * Component - Subtitle
 * @param param0 string;
 * @returns
 */
const Subtitle: React.FC<DataStringProps> = ({ data }) => {
  return <h3 className="sub-title">{data}</h3>;
};

export default Subtitle;
