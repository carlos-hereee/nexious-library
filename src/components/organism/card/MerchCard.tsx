import { CTA, CardHeader, Hero } from "@nxs-molecules";
import type { CardProps } from "nxs-card";

const MerchHeader = ({ data, hero }: CardProps) => {
  return (
    <div className="merch-card-header">
      <CardHeader data={data} />
      {hero && hero.url && <Hero hero={hero} theme="merch-card-hero" />}
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
  const { theme, data, hero, canRemove, onRemoveFromCart, onAddToCart, onClick, hideButtons, children } = props;

  if (hideButtons) {
    if (!data) return <p>Missing data</p>;
    return (
      <div className={theme || "container"}>
        {data.title && <MerchHeader data={data} hero={hero} />}
        <MerchBody data={data} hidePrice />
        {children}
      </div>
    );
  }
  return (
    <div className={`merch-card ${theme || ""}`}>
      <button type="button" className="btn btn-card" aria-label={data.title} onClick={onClick}>
        {data.title && <MerchHeader data={data} hero={hero} />}
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
                    theme: "btn-main btn-subtract",
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
                    theme: "btn-main btn-add",
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
