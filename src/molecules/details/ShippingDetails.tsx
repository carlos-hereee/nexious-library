import { useContext } from "react";
import { UserContext } from "../../../utils/context/UserContext";

const ShippingDetails = () => {
  const { shippingDetails } = useContext(UserContext);
  return (
    <div className="shipping-details">
      <div className="shipping-content">
        <p>
          First Name: <strong> {shippingDetails.firstName}</strong>
        </p>
        <p>
          Last Name: <strong> {shippingDetails.lastName}</strong>
        </p>
      </div>
      <div className="shipping-content">
        <p>
          Street Address: <strong> {shippingDetails.streetAddress}</strong>
        </p>
        <p>
          Apt/Suite: <strong> {shippingDetails.apt}</strong>
        </p>
      </div>
      <div className="shipping-content">
        <p>
          City: <strong> {shippingDetails.city}</strong>
        </p>
        <p>
          State: <strong> {shippingDetails.state}</strong>
        </p>
      </div>
      <div className="shipping-content">
        <p>
          Postal Code: <strong> {shippingDetails.postalCode}</strong>
        </p>
      </div>
    </div>
  );
};
export default ShippingDetails;
