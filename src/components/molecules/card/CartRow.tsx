import { ReadMore } from "@nxs-atoms";
import CardHeader from "./CardHeader";
import { CardProp } from "@nxs-utils/helpers/types";
import { CardFooter, IconButton } from "..";

type CartRowProps = {
  data: CardProp;
  click: (value: any) => void;
};
const CartRow: React.FC<CartRowProps> = (props) => {
  const { data, click } = props;
  return (
    <div className="cart-row">
      <CardHeader data={data} isRow />
      {data.body && <ReadMore data={data.body} uid={data.uid} />}
      {data.cta && <CardFooter data={data.cta} click={click} />}
    </div>
  );
};
export default CartRow;
