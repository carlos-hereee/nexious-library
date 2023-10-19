import { validateEmail } from "./validateEmail";
import { isMatch } from "./matchingPassword";
import { getLabel } from "./labels";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { FormFieldValues } from "nxs-form";

type ValidateProps = {
  values: { [key: string]: any };
  schema?: { required: string[] };
  label?: KeyStringProp;
};

export const validateForm = (props: ValidateProps) => {
  const { values, label, schema } = props;
  let err: { [key: string]: string } = {};
  if (!values) return err;
  if (schema) {
    const required = schema.required;
    // TODO: include custom labels
    const updateError = (key: string, message: string) => {
      err[key] = getLabel(key, label) + " " + message;
    };
    values.forEach((key: FormFieldValues) => {
      // only check if its required
      if (required.includes(key.name)) {
        // check if empty
        console.log("values", key.name, ":", values[key.name]);
        if (!values[key.name]) {
          return updateError(key.name, "is a required field");
        }
        // validate email
        if (key.name === "email" && !validateEmail(values[key.name])) {
          return updateError(key.name, "should be a valid email address");
        }
        // confirm matching passwords
        if (key.name === "newPassword") {
          if (isMatch(values["oldPassword"], values["newPassword"])) {
            return updateError(key.name, "must be different than previous password");
          }
        }
        if (key.name === "confirmNewPassword") {
          if (!isMatch(values["newPassword"], values["confirmNewPassword"])) {
            return updateError(key.name, "must match new password");
          }
        }
        if (key.name === "confirmPassword") {
          if (!isMatch(values["password"], values[key.name])) {
            return updateError(key.name, " must match password");
          }
        }
      }
    });
  }
  return err;
};
