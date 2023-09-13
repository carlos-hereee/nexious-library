import { validateEmail } from "./validateEmail";
import { isMatch } from "./matchingPassword";
import { getLabel } from "./labels";
import { KeyStringProp } from "@nxs-utils/helpers/types";
// import { objLength } from "@nxs-utils/app/objLength";

type ValidateProps = {
  values: { [key: string]: any };
  schema?: { required: string[] };
  labels?: KeyStringProp;
};

export const validateForm = (props: ValidateProps) => {
  const { values, labels, schema } = props;
  let isValidated: boolean = true;
  let err: { [key: string]: string } = {};

  const updateError = (key: string, message: string) => {
    if (isValidated) isValidated = false;
    err[key] = getLabel(key, labels) + " " + message;
  };
  Object.keys(values).forEach((key: string) => {
    if (schema?.required.includes(key)) {
      // check if empty
      if (!values[key]) {
        return updateError(key, "is a required field");
      }
      // validate email
      if (key === "email" && !validateEmail(values[key])) {
        return updateError(key, "should be a valid email address");
      }
      // confirm matching passwords
      if (key === "newPassword") {
        if (isMatch(values["oldPassword"], values["newPassword"])) {
          return updateError(key, "must be different than previous password");
        }
      }
      if (key === "confirmNewPassword") {
        if (!isMatch(values["newPassword"], values["confirmNewPassword"])) {
          return updateError(key, "must match new password");
        }
      }
      if (key === "confirmPassword") {
        if (!isMatch(values["password"], values[key])) {
          return updateError(key, " must match password");
        }
      }
    }
  });
  return { isValidated, errors: err };
};
