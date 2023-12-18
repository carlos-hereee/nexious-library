import { useState } from "react";
import { Heading } from "@nxs-atoms";
import { CartRow, CartCancel } from "@nxs-molecules";
import type { CartProps } from "nxs-cart";

const Cart: React.FC<CartProps> = (props) => {
  // const { data, heading, removeFromCart, onEditDetails } = props;
  const { data, heading, removeFromCart } = props;
  const [cancel, setCancel] = useState<string>("");
  // const [active, setActive] = useState<string>();

  const cancelReq = (e: unknown, isConfirm: boolean) => {
    return isConfirm ? removeFromCart(e) : setCancel("");
  };

  console.log("data :>> ", data);

  const handleCLick = (e: unknown) => {
    const { uid } = e as { uid: string };
    setCancel(uid);
  };
  return (
    <div className="container">
      {heading && <Heading data={heading} />}
      {data.map((c) =>
        cancel === c.uid ? (
          <CartCancel key={c.uid} click={(e) => cancelReq(c, e)} />
        ) : (
          <CartRow
            key={c.uid}
            data={{ ...c, label: "- remove from cart", theme: "btn-main" }}
            onClick={handleCLick}
          />
        )
      )}
    </div>
  );
};

export default Cart;
