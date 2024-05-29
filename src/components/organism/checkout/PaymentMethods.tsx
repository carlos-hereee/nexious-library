import { Hero } from "@nxs-molecules";
import { Icon } from "@nxs-atoms";
import type { PaymentMethodsProps, PaymentType } from "nxs-card";
import { useState } from "react";

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ data, onClick, heading, errorMessage }) => {
  const [activeType, setActive] = useState<PaymentType>();

  const handleClick = (type: PaymentType) => {
    setActive(type);
    onClick(type);
  };
  return (
    <div className="container">
      <h3 className="heading">{heading || "Pay with"}</h3>
      {errorMessage && <strong className="error-message text-max text-center">{errorMessage}</strong>}
      <div className="buttons-container">
        {data.map((d: PaymentType) => (
          <button
            className={activeType && activeType?.uid === d.uid ? "btn-main btn-cta" : "btn-main btn-payment"}
            type="button"
            key={d.uid}
            onClick={() => handleClick(d)}
          >
            {d.hero ? (
              <Hero hero={d.hero} theme={`icon hero-icon icon-${d.icon}`} />
            ) : (
              d.icon && <Icon icon={d.icon} name={d.icon} theme="hero-icon" />
            )}
            <span> {d.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export default PaymentMethods;
