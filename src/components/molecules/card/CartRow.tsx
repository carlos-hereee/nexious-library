import { ReadMore } from "@nxs-atoms";
import CardHeader from "./CardHeader";
import { CTA } from "@nxs-molecules";
import { CardProps } from "nxs-card";

const CartRow: React.FC<CardProps> = (props) => {
  const { data, onClick, theme } = props;
  return (
    <div className={`cart-row ${theme ? theme : ""}`}>
      <CardHeader data={data} isRow />
      <div className="cart-column">
        {data.body && <ReadMore data={data.body} uid={data.uid} />}
        {data.cta && <CTA cta={data.cta} onClick={onClick} />}
      </div>
    </div>
  );
};
export default CartRow;
