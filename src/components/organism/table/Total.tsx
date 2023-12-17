import { roundToHundreth } from "@nxs-math/toHundreth";
import type { TotalProps } from "custom-props";

const Total: React.FC<TotalProps> = (props) => {
  const { total } = props;
  const tax = total * 0.0625;
  return (
    <div className="total">
      <div className="cost">
        <p>Subtotal:</p>
        <p className="price">${roundToHundreth(total)}</p>
      </div>
      <div className="cost">
        <p>Tax:</p>
        <p className="price">${roundToHundreth(tax)}</p>
      </div>
      <div className="cost">
        <p>Total:</p>
        <p className="price">${roundToHundreth(tax + total)}</p>
      </div>
    </div>
  );
};
export default Total;
