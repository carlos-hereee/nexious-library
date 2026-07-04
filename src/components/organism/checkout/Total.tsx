import { roundToHundreth } from "@nxs-math/toHundreth";
import type { TotalProps } from "custom-props";

const Total: React.FC<TotalProps> = ({ total, heading, tax, taxRate, currencySymbol, labels }) => {
  // Tax is consumer-driven: a precomputed `tax` wins, else apply `taxRate`, else 0.
  // The old hardcoded 6.25% rendered an incorrect total for every jurisdiction
  // outside one US locale, with no way to override it; a shared checkout primitive
  // must be told the rate rather than inventing one.
  const taxAmount = tax ?? (taxRate ? total * taxRate : 0);
  const symbol = currencySymbol ?? "$";
  const text = { subtotal: "Subtotal:", tax: "Tax:", total: "Total:", ...labels };
  return (
    <>
      {heading && <h3 className="heading">{heading}</h3>}
      <div className="total">
        <div className="cost">
          <p>{text.subtotal}</p>
          <p className="price">
            {symbol}
            {roundToHundreth(total)}
          </p>
        </div>
        {taxAmount > 0 && (
          <div className="cost">
            <p>{text.tax}</p>
            <p className="price">
              {symbol}
              {roundToHundreth(taxAmount)}
            </p>
          </div>
        )}
        <div className="cost">
          <p>{text.total}</p>
          <p className="price">
            {symbol}
            {roundToHundreth(taxAmount + total)}
          </p>
        </div>
      </div>
    </>
  );
};
export default Total;
