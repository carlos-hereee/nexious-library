// import { KeyStringProp } from "@nxs-utils/helpers/types";
// import { useFormValidation } from "../hooks/useFormValidation";
// import { initLabels } from "./labels";

// type HandleFormChangeProps = {
//   values: { [key: string]: string };
//   touched: string[];
//   event: any;
//   schema?: { required: string[] };
//   label?: { [key: string]: string };
// };

// export const handleFormChange = (props: HandleFormChangeProps) => {
//   const { values, touched, event, schema, label } = props;
//   // key variables
//   const key = event.target.name;
//   const value = event.currentTarget.value;
//   // validate touched
//   const validate: KeyStringProp = {};
//   Object.keys(values).forEach((p) => {
//     if (touched.includes(p) || p === key) validate[key] = value;
//   });
//   return useFormValidation({ values, schema, label });
// };
