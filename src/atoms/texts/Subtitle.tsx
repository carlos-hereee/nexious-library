import { DataStringProp } from "src/types/types";

const Subtitle: React.FC<DataStringProp> = ({ data }) => {
  return <h3 className="sub-title">{data}</h3>;
};

export default Subtitle;
