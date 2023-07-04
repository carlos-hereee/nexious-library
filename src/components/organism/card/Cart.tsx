import { useState } from "react";
import { Heading } from "@nxs-atoms";
import { CartRow } from "@nxs-molecules";
// import CancelRow from "../molecules/card/CancelRow";
// import CartRow from "../molecules/cart/CartRow";
// import Heading from "../atoms/texts/Heading";

type CartProps = {
  data: any[];
  heading: string;
};
const Cart: React.FC<CartProps> = (props) => {
  const { data, heading } = props;
  // const { removeFromCart, cart } = useContext(ServicesContext);
  const [cancel, setCancel] = useState<{ uid: string }>();

  // const cancelReq = (e, isConfirm) => {
  //   isConfirm ? removeFromCart(cart, e) : setCancel({});
  // };

  return (
    <div className="flex-d-column scroll-y p-sm flex-1">
      <Heading data={heading} />
      {data.map((c) =>
        cancel && cancel.uid === c.uid ? (
          // <CancelRow data={c} key={c.uid} click={cancelReq} />
          "to do cancel row"
        ) : (
          <CartRow key={c.uid} data={c} setCancel={setCancel} />
        )
      )}
    </div>
  );
};

export default Cart;
