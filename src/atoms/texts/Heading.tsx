import { DataStringProp } from "src/types/types";

const Heading: React.FC<DataStringProp> = ({ data }) => {
  return (
    <div className="heading-container">
      <h3 className="heading">{data}</h3>
    </div>
  );
};

export default Heading;
