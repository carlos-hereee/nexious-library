import { CardBody, CardHeader, CTA } from "@nxs-molecules";
import type { CardProps } from "nxs-card";

const MerchCard: React.FC<CardProps> = (props) => {
  const { theme, data, hero, canRemove, onRemoveFromCart, onAddToCart, onClick } = props;

  // console.log("data :>> ", data);
  const addButton = [
    {
      name: data.title || "",
      label: "+ add to cart",
      uid: "+add",
      theme: "btn-add",
      onClick: onAddToCart,
    },
  ];
  const removalButton = [
    {
      name: data.title || "",
      label: "+ add to cart",
      uid: "+add",
      theme: "btn-add",
      onClick: onAddToCart,
    },
    {
      name: "",
      label: "- remove from cart",
      uid: "-subtract",
      theme: "btn-subtract",
      onClick: onRemoveFromCart,
    },
  ];
  return (
    <div className={`merch-card ${theme || ""}`}>
      <button type="button" className="btn btn-card" aria-label={data.title} onClick={onClick}>
        <CardHeader data={data} hero={hero} />
        <CardBody data={data} />
      </button>
      <CTA cta={canRemove ? removalButton : addButton} />
    </div>
  );
};

export default MerchCard;
