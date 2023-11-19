import { useState } from "react";
import { Heading } from "@nxs-atoms";
import { CartRow, CartCancel } from "@nxs-molecules";
import { CartProps } from "nxs-cart";

const Cart: React.FC<CartProps> = (props) => {
  // const { data, heading, removeFromCart, onEditDetails } = props;
  const { data, heading, removeFromCart } = props;
  const [cancel, setCancel] = useState<string>();
  // const [active, setActive] = useState<string>();
  const cancelReq = (e: any, isConfirm: boolean) => {
    isConfirm ? removeFromCart(e) : setCancel("");
  };

  return (
    <div className="flex-d-column">
      <Heading data={heading} />
      {data.map((c) =>
        cancel && cancel === c.service.uid ? (
          <CartCancel key={c.service.uid} click={(e) => cancelReq(c, e)} />
        ) : (
          <CartRow key={c.service.uid} data={c} />
        )
      )}
    </div>
  );
};

export default Cart;
