import { CardBody, CardHeader, CTA } from "@nxs-molecules";
import type { CardProps } from "nxs-card";

const MerchCard: React.FC<CardProps> = (props) => {
  const { theme, data, hero, canRemove, onRemoveFromCart, onAddToCart, onClick } = props;

  return (
    <div className={`merch-card ${theme || ""}`}>
      <button type="button" className="btn btn-card" aria-label={data.title} onClick={onClick}>
        <CardHeader data={data} hero={hero} />
        <CardBody data={data} />
      </button>
      <div className="buttons-container">
        <CTA
          cta={{
            name: data.title || "",
            label: "+ add to cart",
            uid: "+add",
            theme: "btn-add",
          }}
          onClick={() => onAddToCart && onAddToCart(data)}
        />
        {canRemove && (
          <CTA
            cta={{
              name: data.title || "",
              label: "- remove from cart",
              uid: "-subtract",
              theme: "btn-subtract",
            }}
            onClick={() => onRemoveFromCart && onRemoveFromCart(data)}
          />
        )}
      </div>
    </div>
  );
};

export default MerchCard;
