import { useState } from "react";
import { Hero, Icon } from "@nxs-atoms/index";
import { HeroProp } from "@nxs-helpers/types";

type PaymentType = {
  uid?: string;
  name?: string;
  type?: string;
};
type PaymentMethodsProps = {
  data: {
    uid: string;
    name: string;
    type: string;
    icon: string;
    hero: HeroProp;
  }[];
};
const PaymentMethods: React.FC<PaymentMethodsProps> = (props) => {
  const { data } = props;
  const [active, setActive] = useState<PaymentType>();
  console.log("active", data);
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
            <Hero hero={d.hero} name={`icon hero-${d.icon}`} />
            {d.name}
          </button>
        ))}
      </div>
      <button className="btn btn-cta">Pay now</button>
    </div>
  );
};
export default PaymentMethods;
