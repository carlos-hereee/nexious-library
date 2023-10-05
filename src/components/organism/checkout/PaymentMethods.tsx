import { useState } from "react";
import { Form } from "@nxs-organism";
import { Hero } from "@nxs-molecules";
import { Icon } from "@nxs-atoms";
import { PaymentMethodsProps, PaymentType } from "nxs-payment-methods";

const PaymentMethods: React.FC<PaymentMethodsProps> = (props) => {
  const { data, visaPayment, paypalPayment, inStorePayment } = props;
  const [active, setActive] = useState<PaymentType>(data[0]);

  return (
    <div className="flex-d-column">
      <h2 className="heading">Enter Payment Details</h2>
      <div className="flex-j-between">
        {data.map((d) => (
          <button
            className="btn-main btn-payment"
            type="button"
            key={d.uid}
            onClick={() => setActive(d)}
          >
            {active && <Icon icon={active.uid === d.uid ? "check" : "uncheck"} />}
            {d.hero ? (
              <Hero hero={d.hero} theme={`icon hero-${d.icon}`} />
            ) : (
              d.icon && <Icon icon={d.icon} size="3x" name={d.icon} />
            )}
            <span> {d.name}</span>
          </button>
        ))}
      </div>
      {active?.type === "visa/credit" && (
        <Form
          formName=""
          initialValues={{
            cardHolderName: "",
            cardNumber: "",
            expiration: "",
            cvc: "",
          }}
          onSubmit={(e) => visaPayment && visaPayment(e)}
        />
      )}
      {active.type === "paypal" && (
        <button className="btn-cta" onClick={() => paypalPayment && paypalPayment(active)}>
          {active.hero && <Hero hero={active.hero} theme="icon" />}
          <p>Pay with paypal</p>
        </button>
      )}
      {active.type === "in-store" && (
        <button className="btn-cta" onClick={() => inStorePayment && inStorePayment(active)}>
          {active.hero && <Hero hero={active.hero} theme="icon" />}
          <p>Complete Checkout</p>
        </button>
      )}
    </div>
  );
};
export default PaymentMethods;
