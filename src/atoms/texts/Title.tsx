import { DataStringProp } from "src/types";

const Title: React.FC<DataStringProp> = ({ data }) => {
  return <h3 className="title">{data} </h3>;
};

export default Title;
