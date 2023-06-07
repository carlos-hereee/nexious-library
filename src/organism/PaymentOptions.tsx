// import { useContext } from "react";
// import { AppContext } from "../../utils/context/AppContext";
// import { ServicesContext } from "../../utils/context/ServicesContext";
// import { UserContext } from "../../utils/context/UserContext";
// import Icons from "../icons/Icons";
// import Forms from "../organisms/Forms";
// import IconButton from "./buttons/IconButton";
// import CardHeader from "./card/CardHeader";
// import UserCard from "./card/UserCard";

// const PaymentOptions = ({ data }) => {
//   const { selectPaymentType } = useContext(AppContext);
//   const { cart } = useContext(ServicesContext);
//   const { user, userValues, userSchema, shippingDetails } =
//     useContext(UserContext);
//   // todo add toggle active
//   return (
//     <button
//       type="button"
//       onClick={() => selectPaymentType(data)}
//       className="btn-icons"
//     >
//       <Icons name={data.icon} />
//       <span className="icon-label">{data.name}</span>
//     </button>
//   );
// };

// export default PaymentOptions;
