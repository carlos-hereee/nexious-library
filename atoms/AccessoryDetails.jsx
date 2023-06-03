import CardHeader from "../molecules/card/CardHeader";
import ReadMore from "../molecules/ReadMore";

const AccessoryDetails = ({ data }) => (
  <div className="details-wrapper">
    <div className="details">
      <CardHeader data={data} />
      <ReadMore data={data.response} />
    </div>
    <div className="in-stock">
      <strong>In Stock: {data.inStock}</strong>
    </div>
  </div>
);
export default AccessoryDetails;
