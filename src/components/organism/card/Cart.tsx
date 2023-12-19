import { useState } from "react";
import { Heading } from "@nxs-atoms";
import { CartRow, CartCancel, CTA } from "@nxs-molecules";
import type { CartProps, MerchProps } from "nxs-card";

const Cart: React.FC<CartProps> = (props) => {
  const { data, heading, removeFromCart, setQuantity, theme } = props;
  const [cancel, setCancel] = useState<string>("");

  const cancelReq = (e: unknown, isConfirm: boolean) => {
    return isConfirm ? removeFromCart(e as MerchProps) : setCancel("");
  };

  // console.log("data :>> ", data);

  return (
    <div className={theme || "cart"}>
      {heading && <Heading data={heading} />}
      {data.map((c) =>
        cancel === c.uid ? (
          <CartCancel key={c.uid} click={(e) => cancelReq(c, e)} />
        ) : (
          <div className="container" key={c.uid}>
            <CartRow data={c} setQuantity={(count) => setQuantity(c, count)} showPrice />
            <CTA
              cta={{ ...c, label: "- remove from cart", theme: "btn-main w-full" }}
              onClick={() => setCancel(c.uid)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Cart;
