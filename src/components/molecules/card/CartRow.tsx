import { ReadMore } from "@nxs-atoms";
import { CTA, CardHeader } from "@nxs-molecules";
import { uniqueId } from "main";
import type { CardProps } from "nxs-card";

const CartRow: React.FC<CardProps> = (props) => {
  const { data, onClick, theme } = props;
  return (
    <div className={`cart-row ${theme || ""}`}>
      <CardHeader data={data} />
      <div className="cart-column">
        {data.body && <ReadMore data={data.body} uid={data.uid || uniqueId()} />}
        {data.cta &&
          onClick &&
          data.cta.map((c) => <CTA key={c.uid} cta={c} onClick={() => onClick(c)} />)}
      </div>
    </div>
  );
};
export default CartRow;
