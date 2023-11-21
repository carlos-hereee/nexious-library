import { useState } from "react";
import { Form } from "@nxs-organism";
import { Hero } from "@nxs-molecules";
import { Icon } from "@nxs-atoms";
import type { PaymentMethodsProps, PaymentType } from "nxs-cart";

const PaymentMethods: React.FC<PaymentMethodsProps> = (props) => {
  const { data, visaPayment, paypalPayment, inStorePayment } = props;
  const [active, setActive] = useState<PaymentType>(data[0]);

  const handlePaypal = () => paypalPayment && paypalPayment(active);
  const handleStore = () => inStorePayment && inStorePayment(active);
  return (
    <div className="flex-d-column">
      <h2 className="heading">Enter Payment Details</h2>
      <div className="flex-j-between">
        {data.map((d: PaymentType) => (
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
          formId=""
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
        <button type="button" className="btn-cta" onClick={handlePaypal}>
          {active.hero && <Hero hero={active.hero} theme="icon" />}
          Pay with paypal
        </button>
      )}
      {active.type === "in-store" && (
        <button type="button" className="btn-cta" onClick={handleStore}>
          {active.hero && <Hero hero={active.hero} theme="icon" />}
          Complete Checkout
        </button>
      )}
    </div>
  );
};
export default PaymentMethods;
