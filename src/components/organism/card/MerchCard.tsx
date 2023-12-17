import { CTA, Hero } from "@nxs-molecules";
import { Subtitle } from "@nxs-atoms";
import type { CardProps } from "nxs-card";

const MerchCard: React.FC<CardProps> = (props) => {
  const { theme, data, hero, canRemove, onRemoveFromCart, onAddToCart, onClick } = props;

  return (
    <div className={`merch-card ${theme || ""}`}>
      <button type="button" className="btn btn-card" aria-label={data.title} onClick={onClick}>
        <div className="merch-card-header">
          {data.title && <h3 className="heading">{data.title}</h3>}{" "}
          {data.subtitle && <Subtitle data={data.subtitle} />}
          {hero && <Hero hero={hero} theme="merch-card-hero" />}
        </div>
        <div className="merch-card-body">
          {data.cost && <strong className="merch-card-cost">${data.cost}</strong>}
          {data.quantity ? (
            <p className="quantity">Remaining: {data.quantity}</p>
          ) : (
            <p>OUT OF STOCK</p>
          )}
        </div>
      </button>
      <div className="buttons-container">
        {onAddToCart && (
          <CTA
            cta={{
              name: data.title || "",
              label: "+ add to cart",
              uid: "+add",
              theme: "btn-add",
            }}
            onClick={() => onAddToCart(data)}
          />
        )}
        {canRemove && onRemoveFromCart && (
          <CTA
            cta={{
              name: data.title || "",
              label: "- remove from cart",
              uid: "-subtract",
              theme: "btn-subtract",
            }}
            onClick={() => onRemoveFromCart(data)}
          />
        )}
      </div>
    </div>
  );
};

export default MerchCard;
