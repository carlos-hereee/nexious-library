import { useContext } from "react";
import { ServicesContext } from "../../../utils/context/ServicesContext";

const AddToCart = ({ data }) => {
  const { addToCart } = useContext(ServicesContext);
  return (
    <>
      <strong className="ribbon">${data.cost}</strong>
      <button
        type="button"
        className="btn btn-green"
        onClick={() => addToCart(data)}
      >
        Add to cart
      </button>
    </>
  );
};

export default AddToCart;
