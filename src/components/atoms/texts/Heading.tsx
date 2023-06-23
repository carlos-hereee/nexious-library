import { DataStringProps } from "@nxs-helpers/types";

/**
 * Heading - div > h3(classname=heading)
 * @param data Heading component
 * @returns JSX div > h3 (classname=heading)
 */
const Heading: React.FC<DataStringProps> = ({ data }) => {
  return <h2 className="heading">{data}</h2>;
};

export default Heading;
