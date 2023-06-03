import * as yup from "yup";

export const validation = {
  name: yup.string().required("*Required field"),
  email: yup.string().required("*Required field"),
  phone: yup.number().required("*Required field"),
  username: yup.string().required("*Required field"),
  password: yup.string().required("*Required field"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("*Required field"),
};
