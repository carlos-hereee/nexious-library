import { DataStringProps } from "@nexious-library/helpers/types";

const Title: React.FC<DataStringProps> = ({ data }) => {
  return <h3 className="title">{data} </h3>;
};

export default Title;
