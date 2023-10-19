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

  const addRequireError = (current: string) => {
    setFormErrors({ ...formErrors, [current]: `${getLabel(current, labels)} is required` });
  };
  const checkRequired = (v: FieldValueProps, current: string) => {
    // only check if its required
    if (required.includes(current)) v.value && addRequireError(current);
  };
  const validateForm = (values: FieldValueProps[]) => {
    let passesCheck = true;
    for (let index = 0; index < values.length; index++) {
      // const v = values[index]
      const current = values[index];
      // only check if its required
      if (required.includes(current.name)) {
        // if any values are empty  it fails pass check
        if (!current.value) {
          addRequireError(current.name);
          passesCheck = false;
        }
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
