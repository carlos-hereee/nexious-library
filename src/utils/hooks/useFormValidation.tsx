import { getLabel } from "../form/labels";
import { FieldValueProps } from "nxs-form";
import { useState } from "react";
import { KeyStringProp } from "custom-props";
import { objLength } from "@nxs-utils/app/objLength";

type ValidateProps = {
  required: string[];
  labels?: KeyStringProp;
};

export const useFormValidation = (props: ValidateProps) => {
  const { labels, required } = props;
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [validationStatus, setStatus] = useState<"red" | "green">("red");

  const addRequireError = (current: string) => {
    setFormErrors({ ...formErrors, [current]: `${getLabel(current, labels)} is required` });
    setStatus("red");
  };
  const removeRequireError = (current: string) => {
    // [current] : _ is used to capture the value associated with current key
    // _ is a throwaway variable when you dont need the value
    const { [current]: _, ...newObj } = formErrors;
    setFormErrors(newObj);
  };
  const checkRequired = (v: FieldValueProps, current: string) => {
    // only check if its required
    if (required.includes(current)) {
      // add error message based on value exists else remove error message
      v.value ? removeRequireError(current) : addRequireError(current);
    }
  };
  const validateForm = (values: FieldValueProps[]) => {
    let errors = {};
    for (let index = 0; index < values.length; index++) {
      const current = values[index];
      if (required.includes(current.name)) {
        const key = current.name;
        // if value is empty
        if (!current.value) {
          errors = { ...errors, [key]: `${getLabel(key, labels)} is required` };
        }
      }
    }
    if (objLength(errors) === 0) setStatus("green");
    else setFormErrors(errors);
  };

  return {
    validationStatus,
    formErrors,
    setFormErrors,
    setStatus,
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
