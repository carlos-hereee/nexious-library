import { DataStringProp } from "src/types";

const Capitalize = ({ data }: DataStringProp): string => {
  return data.charAt(0).toUpperCase() + data.slice(1);
};

export default Capitalize;
