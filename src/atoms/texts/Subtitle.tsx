import { DataStringProps } from "helpers/types.js";

const Subtitle: React.FC<DataStringProps> = ({ data }) => {
  return <h3 className="sub-title">{data}</h3>;
};

export default Subtitle;
