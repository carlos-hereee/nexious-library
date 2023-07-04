import { useState } from "react";
import { Heading } from "@nxs-atoms";
import { CartRow, CartCancel } from "@nxs-molecules";

type CartProps = {
  data: any[];
  heading: string;
  removeFromCart: (e: any) => void;
};
const Cart: React.FC<CartProps> = (props) => {
  const { data, heading, removeFromCart } = props;
  const [cancel, setCancel] = useState<{ uid?: string }>();
  const cancelReq = (e: any, isConfirm: boolean) => {
    isConfirm ? removeFromCart(e) : setCancel({});
  };

  return (
    <div className="flex-d-column scroll-y p-sm flex-1">
      <Heading data={heading} />
      {data.map((c) =>
        cancel && cancel.uid === c.uid ? (
          <CartCancel key={c.uid} click={(e) => cancelReq(c, e)} />
        ) : (
          <CartRow key={c.uid} data={c} setCancel={() => setCancel(c)} />
        )
      )}
    </div>
  );
};

export default Cart;
