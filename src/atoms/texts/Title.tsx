import { DataStringProp } from "src/types";

const Title = ({ data }: DataStringProp): JSX.Element => {
  return <h3 className="title">{data} </h3>;
};

export default Title;
