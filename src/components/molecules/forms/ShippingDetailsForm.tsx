// import { getIn, useFormik } from "formik";
// import { useContext } from "react";
// import { AuthContext } from "../../../utils/context/AuthContext";
// import Icons from "../icons/Icons";
// import { labels } from "../../atoms/forms/labels";
// import { placeholders } from "../../atoms/forms/placeholders";

// const FormShippingDetails = () => {
//   const { shippingValues, shippingSchema, setShipping } =
//     useContext(AuthContext);
//   const { handleSubmit, handleBlur, handleChange, values, errors } = useFormik({
//     initialValues: { shippingValues },
//     onSubmit: (e) => setShipping(e),
//     validationSchema: shippingSchema,
//   });

//   return (
//     <form className="form shipping-form" onSubmit={handleSubmit}>
//       <div className="form-fields">
//         {Object.keys(shippingValues).map((v) => (
//           <div key={v} className="input-wrapper">
//             <div className="label">
//               <label htmlFor={v}>
//                 {labels[v]} <br />
//                 {errors[v] && <span className="required">{errors[v]}</span>}
//               </label>
//             </div>
//             <input
//               type={labels[v]}
//               autoComplete="on"
//               name={v}
//               value={getIn(values, v)}
//               placeholder={placeholders[v]}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className="input"
//             />
//           </div>
//         ))}
//       </div>

//       <button type="submit" className="btn btn-submit">
//         <Icons name="submit" /> Confirm
//       </button>
//     </form>
//   );
// };
// export default FormShippingDetails;
