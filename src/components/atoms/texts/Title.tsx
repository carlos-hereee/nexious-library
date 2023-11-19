import type { DataProp } from "nxs-typography";

const Title: React.FC<DataProp> = ({ data }) => {
  return <h3 className="title">{data} </h3>;
};

export default Title;
