import { useState } from "react";
import { Heading } from "@nxs-atoms";
import { CartRow, CartCancel, CTA } from "@nxs-molecules";
import type { CartProps, MerchProps } from "nxs-card";

const Cart: React.FC<CartProps> = (props) => {
  const { data, heading, removeFromCart, setQuantity, theme, readOnly } = props;
  const [cancel, setCancel] = useState<string>("");

  const cancelReq = (e: unknown, isConfirm: boolean) => {
    setCancel("");
    return isConfirm && removeFromCart(e as MerchProps);
  };

  // console.log("data :>> ", data);

  return (
    <div className={theme || "cart"}>
      {heading && <Heading data={heading} />}
      {data.map((c) =>
        cancel === c.uid ? (
          <CartCancel key={c.uid} click={(e) => cancelReq(c, e)} />
        ) : readOnly ? (
          <CartRow data={c} key={c.uid} showPrice showItemTotal />
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
