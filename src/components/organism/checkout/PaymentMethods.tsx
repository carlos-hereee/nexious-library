import { Hero } from "@nxs-molecules";
import { Button, Icon } from "@nxs-atoms";
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
        {/* The chosen method reads as the primary nxs-btn and the others as secondary (2026-11 item
            337); btn-main, btn-cta and btn-payment stay beside them until 2026-11 item 339. */}
        {data.map((d: PaymentType) => (
          <Button
            variant={activeType && activeType?.uid === d.uid ? "primary" : "secondary"}
            className={activeType && activeType?.uid === d.uid ? "btn-main btn-cta" : "btn-main btn-payment"}
            key={d.uid}
            onClick={() => handleClick(d)}
          >
            {d.hero ? (
              <Hero hero={d.hero} className={`icon hero-icon icon-${d.icon}`} />
            ) : (
              d.icon && <Icon icon={d.icon} name={d.icon} className="hero-icon" />
            )}
            <span> {d.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
export default PaymentMethods;
