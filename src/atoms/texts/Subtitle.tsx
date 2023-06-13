import { DataStringProps } from "@nexious-library/helpers/types.tsx";

const Subtitle: React.FC<DataStringProps> = ({ data }) => {
  return <h3 className="sub-title">{data}</h3>;
};

export default Subtitle;
