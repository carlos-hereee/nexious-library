import { DataStringProps } from "@nexious-helpers/types";

const Capitalize: React.FC<DataStringProps> = ({ data }) => (
  <span>
    {data.charAt(0).toUpperCase()}
    {data.slice(1)}
  </span>
);

export default Capitalize;
