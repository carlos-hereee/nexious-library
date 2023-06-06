// import { useContext } from "react";
// import { ServicesContext } from "../../../utils/context/ServicesContext";
// import { scrollToCartItem } from "../../../utils/functions/calendar";

// const ButtonNext = ({ click }) => {
//   const { cart, bookingRequired } = useContext(ServicesContext);
//   const handleClick = () => {
//     const isBookingRequired = cart.filter((c) => c.isBookable && !c.isBooked);
//     if (isBookingRequired.length > 0) {
//       click(false);
//       isBookingRequired.forEach((br) => {
//         const idx = cart.findIndex((c) => c.uid === br.uid);
//         if (idx !== -1) {
//           bookingRequired(idx, br);
//         }
//       });
//       // scroll to first instance
//       scrollToCartItem(isBookingRequired[0]);
//     } else click(true);
//   };

//   return (
//     <button
//       type="button"
//       className="btn btn-classic btn-next"
//       onClick={handleClick}
//     >
//       Procced with checkout
//     </button>
//   );
// };
// export default ButtonNext;
