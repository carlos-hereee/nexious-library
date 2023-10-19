import { getLabel } from "../form/labels";
import { FieldValueProps } from "nxs-form";
import { useState } from "react";
import { KeyStringProp } from "custom-props";

type ValidateProps = {
  required: string[];
  labels?: KeyStringProp;
};

export const useFormValidation = (props: ValidateProps) => {
  const { labels, required } = props;
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [lightColor, setLightColor] = useState<"red" | "green">("red");

  const checkRequired = (v: FieldValueProps) => {
    const current = v.name;
    // only check if its required
    if (required && required.includes(current)) {
      // check if formErrors have been added
      formErrors
        ? setFormErrors({
            ...formErrors,
            // check if empty
            [current]: v.value ? `${getLabel(current, labels)} is required` : "",
          })
        : setFormErrors({
            [current]: v.value ? `${getLabel(current, labels)} is required` : "",
          });
    }
  };

  return { setFormErrors, formErrors, checkRequired, validationStatus: lightColor };
};

/**
 * 
 * 
 * OTHER VALIDATION
 *  // validate email
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
 */
