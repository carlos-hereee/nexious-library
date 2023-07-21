import { useState } from "react";
import { Hero, Icon } from "@nxs-atoms/index";
import { HeroProp } from "@nxs-helpers/types";
import { Form } from "@nxs-organism";

type PaymentType = {
  uid?: string;
  type?: string;
  name?: string;
  icon?: string;
  hero?: HeroProp;
};
type PaymentMethodsProps = {
  data: PaymentType[];
  submit: (a: any) => void;
  paypalPayment?: (e: any) => void;
};
const PaymentMethods: React.FC<PaymentMethodsProps> = (props) => {
  const { data, submit, paypalPayment } = props;
  const [active, setActive] = useState<PaymentType>(data[1]);
  console.log("active", active);
  return (
    <div className="flex-d-column">
      <h2 className="heading">Enter Payment Details</h2>
      <div className="flex-j-between">
        {data.map((d) => (
          <button
            className="btn btn-main flex-1"
            type="button"
            key={d.uid}
            onClick={() => setActive(d)}
          >
            {active && active.uid === d.uid ? (
              <Icon icon="check" />
            ) : (
              <Icon icon="uncheck" />
            )}
            {d.hero && <Hero hero={d.hero} name={`icon hero-${d.icon}`} />}
            {d.name}
          </button>
        ))}
      </div>
      {active?.type === "visa/credit" && (
        <Form
          values={{
            cardHolderName: "",
            cardNumber: "",
            expiration: "",
            cvc: "",
          }}
          submit={submit}
        />
      )}
      {active.type === "paypal" && (
        <button
          className="btn btn-cta btn-payment"
          onClick={() => paypalPayment && paypalPayment(active)}
        >
          {active.hero && <Hero hero={active.hero} name="icon" />}
          <p>Pay with paypal</p>
        </button>
      )}
      {/* <button className="btn btn-cta">Pay now</button> */}
    </div>
  );
};
export default PaymentMethods;
