import { DataStringProp } from "src/types";

const Capitalize: React.FC<DataStringProp> = ({ data }) => (
  <span>
    {data.charAt(0).toUpperCase()}
    {data.slice(1)}
  </span>
);

export default Capitalize;
