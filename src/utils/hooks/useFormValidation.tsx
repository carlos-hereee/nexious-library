import { validateEmail } from "../form/validateEmail";
import { isMatch } from "../form/matchingPassword";
import { getLabel } from "../form/labels";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { FormFieldValues } from "nxs-form";
import { useEffect, useState } from "react";

type ValidateProps = {
  values: { [key: string]: any };
  schema?: { required: string[] };
  label?: KeyStringProp;
};

export const useFormValidation = (props: ValidateProps) => {
  const { values, label, schema } = props;
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  useEffect(() => {
    const required = schema?.required || [];
    // TODO: include custom labels
    values.forEach((key: FormFieldValues) => {
      // only check if its required
      if (required.includes(key.name)) {
        const current = key.name;
        // check if empty
        console.log("values", current, ":", values[current]);
        if (!values[current]) {
          return getLabel(current, label) + " " + "is a required field";
        }
        // validate email
        if (current === "email" && !validateEmail(values[current])) {
          return getLabel(current, label) + " " + "should be a valid email address";
        }
        // confirm matching passwords
        if (current === "newPassword") {
          if (isMatch(values["oldPassword"], values["newPassword"])) {
            return getLabel(current, label) + " " + "must be different than previous password";
          }
        }
        if (current === "confirmNewPassword") {
          if (!isMatch(values["newPassword"], values["confirmNewPassword"])) {
            return getLabel(current, label) + " " + "must match new password";
          }
        }
        if (current === "confirmPassword") {
          if (!isMatch(values["password"], values[current])) {
            return getLabel(current, label) + " " + " must match password";
          }
        }
      }
    });
  });
  return { setFormErrors, formErrors };
};
