// import { useContext } from "react";
// import * as yup from "yup";
// import Forms from "../organisms/Forms";
// // import { CalendarContext } from "../../utils/context/CalendarContext";
// // import FollowUs from "./FollowUs";
// import { AppContext } from "../../utils/context/AppContext";
// import CardHeader from "./card/CardHeader";
// import FollowUs from "./FollowUs";
// import CardBody from "./card/CardBody";

// const schema = yup.object().shape({
//   email: yup.string().email().required("*Required field"),
// });
// const values = { email: "" };
// const Newsletter = () => {
//   const { newsletter, footerNewsletter, socials } = useContext(AppContext);
//   // const { socials } = useContext(AppContext);
//   // const socials = ;
//   return (
//     <section className="card">
//       <CardHeader data={footerNewsletter} />
//       <Forms data={{ values, schema, onSubmit: newsletter }} />
//       <CardBody data={footerNewsletter} />
//       <FollowUs socials={socials} />
//     </section>
//   );
// };

// export default Newsletter;
