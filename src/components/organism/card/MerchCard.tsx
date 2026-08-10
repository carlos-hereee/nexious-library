import { CTA, CardHeader, Hero } from "@nxs-molecules";
import type { CardProps } from "nxs-card";

const MerchHeader = ({ data, hero }: CardProps) => {
  return (
    <div className="merch-card-header">
      {data && <CardHeader data={data} />}
      {hero && hero.url && <Hero hero={hero} className="merch-card-hero" />}
    </div>
  );
};
const MerchBody = ({ data, hidePrice }: CardProps) => {
  const price = `${hidePrice ? "Price: " : ""}$${data?.cost || 0}`;

  return (
    <div className="merch-card-body">
      {data.description && <p className="text-max">Details: {data.description}</p>}
      {data.cost && hidePrice ? <p>{price}</p> : <strong className="merch-card-cost">{price}</strong>}
      {data.inStock ? <p className="quantity">In stock: {data.inStock}</p> : <p>OUT OF STOCK</p>}
    </div>
  );
};
const MerchCard: React.FC<CardProps> = (props) => {
  const { className, data, hero, canRemove, onRemoveFromCart, onAddToCart, onClick, hideButtons, children } = props;

  if (hideButtons) {
    if (!data) return <p>Missing data</p>;
    return (
      <div className={className || "container"}>
        {data.title && <MerchHeader data={data} hero={hero} />}
        <MerchBody data={data} hidePrice />
        {children}
      </div>
    );
  }
  return (
    <div className={`merch-card ${className || ""}`}>
      <button type="button" className="btn btn-card" aria-label={data.title} onClick={onClick}>
        {(data.title || data.hero) && <MerchHeader data={data} hero={hero} />}
        <MerchBody data={data} /> {children}
      </button>
      {!hideButtons && (
        <div className="flex-center">
          {canRemove
            ? onRemoveFromCart && (
                <CTA
                  cta={{
                    name: data.title || "",
                    label: "- remove from cart",
                    uid: "-subtract",
                    className: "btn-main btn-subtract",
                  }}
                  onClick={() => onRemoveFromCart(data)}
                />
              )
            : onAddToCart &&
              (typeof data.inStock === "number" && data.inStock > 0 ? (
                <CTA
                  cta={{
                    name: data.title || "",
                    label: "+ add to cart",
                    uid: "+add",
                    className: "btn-main btn-add",
                  }}
                  onClick={() => onAddToCart(data)}
                />
              ) : (
                <p className="text-fit text-center">SOLD OUT</p>
              ))}
        </div>
      )}
    </div>
  );
};

export default MerchCard;
