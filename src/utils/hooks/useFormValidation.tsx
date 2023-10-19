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

  const checkRequired = (v: FieldValueProps, current: string) => {
    // only check if its required
    if (required.includes(current)) {
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
  const validateForm = (values: FieldValueProps[]) => {
    let passesCheck = true;
    for (let index = 0; index < values.length; index++) {
      const current = values[index].name;
      // only check if its required
      if (required.includes(current)) {
        // if any values are empty  it fails pass check
        if (!values[index].value) passesCheck = false;
      }
    }
    passesCheck ? setLightColor("green") : setLightColor("red");
    return passesCheck;
  };

  return {
    formErrors,
    validationStatus: lightColor,
    setFormErrors,
    checkRequired,
    validateForm,
  };
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
