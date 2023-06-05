import { DataStringProp } from "src/types";

const Capitalize = ({ data }: DataStringProp): JSX.Element => (
  <span>
    {data.charAt(0).toUpperCase()}
    {data.slice(1)}
  </span>
);

export default Capitalize;
