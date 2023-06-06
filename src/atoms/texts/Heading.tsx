import { DataStringProps } from "src/types/types";

const Heading: React.FC<DataStringProps> = ({ data }) => {
  return (
    <div className="heading-container">
      <h3 className="heading">{data}</h3>
    </div>
  );
};

export default Heading;
