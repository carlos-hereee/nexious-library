import { ReadMore } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import type { CardProps } from "nxs-card";
import { Form } from "@nxs-organism";
import { uniqueId } from "@nxs-utils/data/uniqueId";

const CartRow: React.FC<CardProps> = (props) => {
  const { data, theme, setQuantity, showPrice } = props;

  return (
    <div className={`cart-row ${theme || ""}`}>
      {data.hero && <Hero hero={{ url: data.hero, alt: `product ${data.name}` }} theme="thumbnail" />}
      <div className="container">
        <h3 className="sub-title">Details:</h3>
        {data.body && <ReadMore data={data.body} uid={data.uid || uniqueId()} />}
      </div>
      {data.inStock && setQuantity ? (
        <Form
          initialValues={{ quantity: data.quantity || 1 }}
          onChange={(e) => setQuantity(e)}
          types={{ quantity: "number" }}
          fieldHeading={{ quantity: `In stock: ${data.inStock || "OUT OF STOCK"}` }}
          labels={{ quantity: "Quantity" }}
          placeholders={{ quantity: `1` }}
          formId={`${data.name || data.label}-form`}
          countSchema={{ quantity: { max: data.inStock } }}
          noScroll
        />
      ) : (
        <p>OUT OF STOCK</p>
      )}

      {showPrice && (
        <div className="container">
          <h3 className="sub-title">Cost:</h3>
          {data.cost && (
            <p>
              <strong>${data.cost}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default CartRow;
