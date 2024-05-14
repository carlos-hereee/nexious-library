import { ReadMore } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import type { CardProps } from "nxs-card";
import { Form } from "@nxs-organism";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import type { FormInitialValue } from "nxs-form";

const CartRow: React.FC<CardProps> = ({ data, theme, setQuantity, showPrice }) => {
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
          onChange={(e: FormInitialValue) => setQuantity(parseInt(e as string, 10))}
          types={{ quantity: "number" }}
          fieldHeading={{ quantity: `In stock: ${data.inStock || "OUT OF STOCK"}` }}
          labels={{ quantity: "Quantity" }}
          placeholders={{ quantity: `1` }}
          formId={`${data.name || data.label}-form`}
          schema={{ count: [{ name: "quantity", max: data.inStock, min: 1 }] }}
          hideSubmit
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
