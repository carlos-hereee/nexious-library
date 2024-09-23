import type { DataProp } from "nxs-typography";

/**
 * Component - Heading
 * @param data string
 * @returns JSX h2 with classname=heading
 */
const Heading: React.FC<DataProp> = ({ data, scale }) => {
  if (scale === 2) return <h2 className="heading">{data}</h2>;
  if (scale === 3) return <h3 className="heading">{data}</h3>;
  if (scale === 4) return <h4 className="heading">{data}</h4>;
  if (scale === 5) return <h5 className="heading">{data}</h5>;
  if (scale === 6) return <h6 className="heading">{data}</h6>;
  return <h1 className="heading">{data}</h1>;
};

export default Heading;
