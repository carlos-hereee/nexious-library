import { ReadMore } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import { uniqueId } from "main";
import type { CardProps } from "nxs-card";
import { Form } from "@nxs-organism";

const CartRow: React.FC<CardProps> = (props) => {
  const { data, theme, setQuantity } = props;

  return (
    <div className={`cart-row ${theme || ""}`}>
      {data.hero && (
        <Hero hero={{ url: data.hero, alt: `product ${data.name}` }} theme="thumbnail" />
      )}
      <div className="container">
        <h3 className="sub-title">Details:</h3>
        {data.body && <ReadMore data={data.body} uid={data.uid || uniqueId()} />}
      </div>
      <div className="cart-column">
        {data.quantity && setQuantity ? (
          <Form
            initialValues={{ quantity: data.quantity || 1 }}
            onChange={(e) => setQuantity(e)}
            types={{ quantity: "number" }}
            fieldHeading={{ quantity: `In stock: ${data.inStock || "OUT OF STOCK"}` }}
            labels={{ quantity: "Quantity" }}
            placeholders={{ quantity: `1` }}
            formId={`${data.name || data.label}-form`}
            noScroll
          />
        ) : (
          <p>OUT OF STOCK</p>
        )}
      </div>
    </div>
  );
};
export default CartRow;
