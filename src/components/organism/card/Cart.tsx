import { useState } from "react";
import { Heading } from "@nxs-atoms";
import { CartRow, CartCancel } from "@nxs-molecules";

type CartProps = {
  data: any[];
  heading: string;
  active: any;
  removeFromCart: (e: any) => void;
  setActive: (value: any) => void;
};
const Cart: React.FC<CartProps> = (props) => {
  const { data, heading, removeFromCart, setActive, active } = props;
  const [cancel, setCancel] = useState<{ uid?: string }>();
  const cancelReq = (e: any, isConfirm: boolean) => {
    isConfirm ? removeFromCart(e) : setCancel({});
  };

  return (
    <div className="flex-d-column scroll-y">
      <Heading data={heading} />
      {data.map((c) =>
        cancel && cancel.uid === c.uid ? (
          <CartCancel key={c.uid} click={(e) => cancelReq(c, e)} />
        ) : (
          <CartRow
            key={c.uid}
            data={c}
            setCancel={() => setCancel(c)}
            setActive={setActive}
            active={active}
          />
        )
      )}
    </div>
  );
};

export default Cart;
