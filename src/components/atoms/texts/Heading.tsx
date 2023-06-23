import { DataStringProps } from "@nxs-helpers/types";

/**
 * Heading - div > h3(classname=heading)
 * @param data Heading component
 * @returns JSX div > h3 (classname=heading)
 */
const Heading: React.FC<DataStringProps> = ({ data }) => {
  return (
    <div className="heading-container">
      <h3 className="heading">{data}</h3>
    </div>
  );
};

export default Heading;
