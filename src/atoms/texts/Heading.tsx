import { DataStringProp } from "src/types";

const Heading = ({ data }: DataStringProp): JSX.Element => {
  return (
    <div className="heading-container">
      <h3 className="heading">{data.toUpperCase()}</h3>
    </div>
  );
};

export default Heading;
