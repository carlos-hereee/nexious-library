import { ReadMore } from "@nxs-atoms";
import { CTA, Hero } from "@nxs-molecules";
import { uniqueId } from "main";
import type { CardProps } from "nxs-card";
import { useState } from "react";
import { Form } from "@nxs-organism";

const CartRow: React.FC<CardProps> = (props) => {
  const { data, onClick, theme } = props;

  const [count, setCount] = useState(1);
  console.log("data :>> ", data);
  console.log("count :>> ", count);
  return (
    <div className={`cart-row ${theme || ""}`}>
      {/* <CardHeader data={data} /> */}
      {data.hero && (
        <Hero hero={{ url: data.hero, alt: `product ${data.name}` }} theme="thumbnail" />
      )}
      <div className="cart-column">
        {data.body && <ReadMore data={data.body} uid={data.uid || uniqueId()} />}
        {data.quantity ? (
          <>
            {data.cost && <strong className="merch-card-cost">${data.cost}</strong>}
            <p className="quantity">Remaining: {data.quantity}</p>
            <Form
              initialValues={{ quantity: count }}
              onChange={(e) => setCount(e)}
              types={{ quantity: "number" }}
              labels={{ quantity: "Add to order" }}
              placeholders={{ quantity: `${count}` }}
              formId={`${data.name || data.label}-form`}
            />
          </>
        ) : (
          <p>OUT OF STOCK</p>
        )}
        {data.label && onClick && (
          <CTA
            cta={{ label: data.label, name: data.label, theme: data.theme }}
            onClick={() => onClick(data)}
          />
        )}
      </div>
    </div>
  );
};
export default CartRow;
