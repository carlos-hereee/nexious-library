import { CardBody, CardHeader, CTA } from "@nxs-molecules";
import type { CardProps } from "nxs-card";

const MerchCard: React.FC<CardProps> = (props) => {
  const { onClick, theme, data, hero } = props;

  // console.log("data :>> ", data);
  return (
    <div className={`merh-card ${theme || ""}`}>
      <CardHeader data={data} hero={hero} />
      <CardBody data={data} />
      <CTA
        cta={[
          { name: data.title || "", label: "+ add to cart", uid: "+add", theme: "btn-add" },
          { name: "", label: "- remove from cart", uid: "-subtract", theme: "btn-subtract" },
        ]}
        onClick={() => onClick && onClick(data)}
      />
    </div>
  );
};

export default MerchCard;
