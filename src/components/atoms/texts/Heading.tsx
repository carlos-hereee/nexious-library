import type { DataProp } from "nxs-typography";

/**
 * Component - Heading
 * @param data string
 * @returns JSX h2 with classname=heading
 */
const Heading: React.FC<DataProp> = ({ data }) => {
  return <h2 className="heading">{data}</h2>;
};

export default Heading;
