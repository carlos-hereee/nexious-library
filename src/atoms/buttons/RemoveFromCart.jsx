import { useContext } from "react";
import { ServicesContext } from "../../../utils/context/ServicesContext";

const RemoveFromCart = ({ data }) => {
  const { removeFromCart, active } = useContext(ServicesContext);
  return (
    <>
      <strong className="ribbon">${data.cost}</strong>
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => removeFromCart(data, active)}>
        Remove from cart
      </button>
    </>
  );
};

export default RemoveFromCart;
