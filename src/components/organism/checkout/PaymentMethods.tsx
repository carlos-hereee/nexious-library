// import { useState } from "react";
// import { Form } from "@nxs-organism";
import { Hero } from "@nxs-molecules";
import { Icon } from "@nxs-atoms";
import type { PaymentMethodsProps, PaymentType } from "nxs-card";

const PaymentMethods: React.FC<PaymentMethodsProps> = (props) => {
  const { data, onClick, active } = props;
  // const { data, visaPayment, paypalPayment, inStorePayment, onClick } = props;
  // const [active, setActive] = useState<PaymentType>(data[0]);

  // const handlePaypal = () => paypalPayment && paypalPayment(active);
  // const handleStore = () => inStorePayment && inStorePayment(active);

  // console.log("data :>> ", data);
  return (
    <div className="container">
      <h2 className="heading">Enter Payment Details</h2>
      <div className="buttons-container">
        {data.map((d: PaymentType) => (
          <button
            className={active?.uid === d.uid ? "btn-main btn-cta" : "btn-main btn-payment"}
            type="button"
            key={d.uid}
            onClick={() => onClick(d)}
          >
            {/* {active && <Icon icon={active.uid === d.uid ? "check" : "uncheck"} />} */}
            {d.hero ? (
              <Hero hero={d.hero} theme={`icon hero-icon icon-${d.icon}`} />
            ) : (
              d.icon && <Icon icon={d.icon} name={d.icon} theme="hero-icon" />
            )}
            <span> {d.name}</span>
          </button>
        ))}
      </div>
      {/* {active?.type === "visa/credit" && (
        <Form
          formId="payment-methods"
          initialValues={{
            cardHolderName: "",
            cardNumber: "",
            expiration: "",
            cvc: "",
          }}
          onSubmit={(e) => visaPayment && visaPayment(e)}
        />
      )} */}
      {/* {active.type === "visa/credit" && (
        <div className="flex-center">
          <button type="button" className="btn-main btn-cta" onClick={handlePaypal}>
            {active.hero && <Hero hero={active.hero} theme="icon" />}
            Continue with credit/debit
          </button>
        </div>
      )}

      {active.type === "paypal" && (
        <div className="flex-center">
          <button type="button" className="btn-main btn-cta" onClick={handlePaypal}>
            {active.hero && <Hero hero={active.hero} theme="icon" />}
            Pay with paypal
          </button>
        </div>
      )}

      {active.type === "in-store" && (
        <div className="flex-center">
          <button type="button" className="btn-main btn-cta" onClick={handleStore}>
            {active.hero && <Hero hero={active.hero} theme="icon" />}
            Complete Checkout
          </button>
        </div>
      )} */}
    </div>
  );
};
export default PaymentMethods;
