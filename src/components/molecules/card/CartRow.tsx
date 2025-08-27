import { ReadMore } from "@nxs-atoms";
import { Hero } from "@nxs-molecules";
import type { CardProps } from "nxs-card";
import { Form } from "@nxs-organism";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import type { FormInitialValue } from "nxs-form";

const CartRow: React.FC<CardProps> = ({ data, theme, setQuantity, showPrice, showItemTotal }) => {
  const description = data.description || data.body;
  return (
    <div className={`cart-row ${theme || ""}`}>
      {data.hero && <Hero hero={data.hero} theme="thumbnail" />}
      <div className="container">
        <h3 className="sub-title">{data.name} details: </h3>
        {description && <ReadMore data={description} uid={data.uid || uniqueId()} />}
      </div>
      {data.inStock && setQuantity && (
        <Form
          initialValues={{ quantity: data.quantity || 1 }}
          onChange={(e: FormInitialValue) => setQuantity(parseInt(e as string, 10))}
          types={{ quantity: "number" }}
          fieldHeading={{ quantity: `In stock: ${data.inStock || "OUT OF STOCK"}` }}
          labels={{ quantity: "Quantity" }}
          placeholders={{ quantity: `1` }}
          formId={`${data.name || data.label}-form`}
          schema={{ count: { quantity: { max: data.inStock, min: 1 } } }}
          hideSubmit
        />
      )}

      {showPrice && (
        <div className="container">
          <h3 className="sub-title">Price:</h3>
          {data.cost && (
            <p>
              <strong>${data.cost}</strong>
            </p>
          )}
        </div>
      )}
      {showItemTotal && data.quantity && (
        <div className="container">
          <h3 className="sub-title">Total:</h3>
          {data.cost && (
            <p>
              <strong>${data.cost * data.quantity || 1}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default CartRow;
