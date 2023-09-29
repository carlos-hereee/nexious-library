import { ReadMore } from "@nxs-atoms";
import CardHeader from "./CardHeader";
import { CardProp } from "@nxs-utils/helpers/types";
import { CardFooter } from "..";

type CartRowProps = {
  data: CardProp;
  click?: (value: any) => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, click } = props;
  return (
    <div className="cart-row">
      <CardHeader data={data} isRow />
      <div className="cart-column">
        {data.body && <ReadMore data={data.body} uid={data.uid} />}
        {data.cta && <CardFooter cta={data.cta} onClick={click} />}
      </div>
    </div>
  );
};
export default CartRow;
