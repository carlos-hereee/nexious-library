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
  const [cancel, setCancel] = useState<string>();
  const [active, setActive] = useState<string>();
  const cancelReq = (e: any, isConfirm: boolean) => {
    console.log("e, ", e);
    isConfirm ? removeFromCart(e) : setCancel("");
  };
  console.log("data", data);
  const handleEditDetails = (e: any) => {
    console.log("e", e);
  };
  return (
    <div className="flex-d-column">
      <Heading data={heading} />
      {data.map((c) =>
        cancel && cancel === c.service.uid ? (
          <CartCancel key={c.service.uid} click={(e) => cancelReq(c, e)} />
        ) : (
          <CartRow
            key={c.service.uid}
            data={c}
            service={c.service}
            meeting={c.meeting}
            setCancel={() => setCancel(c.service.uid)}
            setActive={() => setActive(c.service.uid)}
            editDetails={() => handleEditDetails(c)}
            active={active}
          />
        )
      )}
    </div>
  );
};

export default Cart;
