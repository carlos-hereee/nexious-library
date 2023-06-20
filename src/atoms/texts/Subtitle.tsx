import { DataStringProps } from "@nexious-helpers/types";

const Subtitle: React.FC<DataStringProps> = ({ data }) => {
  return <h3 className="sub-title">{data}</h3>;
};

export default Subtitle;
