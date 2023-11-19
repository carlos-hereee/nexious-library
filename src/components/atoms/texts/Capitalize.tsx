import type { DataProp } from "nxs-typography";

/**
 * Component - Capitalize
 * @param data string; capitalize the first letter on the string
 * @returns span; capitalized
 */
const Capitalize: React.FC<DataProp> = (props) => {
  const { data } = props;
  if (!data) return;
  return (
    <span>
      {data.charAt(0).toUpperCase()}
      {data.slice(1)}{" "}
    </span>
  );
};

export default Capitalize;
