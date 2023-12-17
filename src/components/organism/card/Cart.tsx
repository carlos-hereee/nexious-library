import { useState } from "react";
import { Heading } from "@nxs-atoms";
import { CartRow, CartCancel } from "@nxs-molecules";
import type { CartProps } from "nxs-cart";

const Cart: React.FC<CartProps> = (props) => {
  // const { data, heading, removeFromCart, onEditDetails } = props;
  const { data, heading, removeFromCart } = props;
  const [cancel, setCancel] = useState<string>("");
  // const [active, setActive] = useState<string>();

  console.log("data :>> ", data);

  const cancelReq = (e: unknown, isConfirm: boolean) => {
    return isConfirm ? removeFromCart(e) : setCancel("");
  };

  return (
    <div className="flex-d-column">
      <Heading data={heading} />
      {data.map((c) =>
        cancel === c.uid ? (
          <CartCancel key={c.uid} click={(e) => cancelReq(c, e)} />
        ) : (
          <CartRow key={c.uid} data={c} />
        )
      )}
    </div>
  );
};

export default Cart;
