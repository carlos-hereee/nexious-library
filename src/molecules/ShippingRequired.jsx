import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../utils/context/UserContext";
import ToggleOpen from "./buttons/ToggleOpen";
import ShippingDetails from "./details/ShippingDetails";
import FormShippingDetails from "./forms/ShippingDetailsForm";

const ShippingRequired = () => {
  const { shippingDetails } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);
  const setData = () => {
    return isOpen ? (
      <p>Close shipping details</p>
    ) : (
      <p>Enter Shipping Details</p>
    );
  };
  return (
    <>
      <div className="card-header">
        <h3>Shipping Details</h3>
      </div>
      {shippingDetails.uid ? (
        <ShippingDetails />
      ) : isOpen ? (
        <div>
          <ToggleOpen data={setData()} click={handleClick} />
          <FormShippingDetails />
        </div>
      ) : (
        <ToggleOpen data={setData()} click={handleClick} />
      )}
    </>
  );
};

export default ShippingRequired;
