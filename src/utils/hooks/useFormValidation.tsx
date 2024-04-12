import type { FieldValueProps, ValidateProps } from "nxs-form";
import { useEffect, useState } from "react";
import type { KeyStringProp } from "custom-props";
import { objLength } from "@nxs-utils/app/objLength";
import { emojis } from "@nxs-utils/data/emojis";
import { scrollToError } from "@nxs-utils/app/scrollToElement";

export const useFormValidation = (props: ValidateProps) => {
  const { required, unique } = props;
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [formMessage, setFormMessage] = useState<KeyStringProp>({});
  const [validationStatus, setStatus] = useState<"red" | "yellow" | "green" | null>(null);
  const require = required || [];
  const uniqueList = unique || [{ name: "", list: [] }];

  useEffect(() => {
    if (validationStatus) {
      if (objLength(formErrors) === 0) setStatus("yellow");
      else {
        setStatus("red");
        scrollToError(formErrors);
      }
    }
  }, [formErrors]);

  const addFormError = (fieldId: string, message: string) => setFormErrors({ ...formErrors, [fieldId]: message });

  const removeError = (current: string) => {
    // [current] : _ is used to capture the value associated with current key
    // _ is a throwaway variable when you dont need the value
    // const { [current]: _, ...newObj } = formErrors;
    const newErrors = Object.keys(formErrors).filter((err) => err !== current);
    const data = newErrors.map((nErr) => ({ [nErr]: formErrors[nErr] }));
    setFormErrors(Object.assign({}, ...data));
  };
  const checkRequired = (field: FieldValueProps, current: string) => {
    // only check if its required
    if (require.includes(current)) {
      // add error message based on value exists else remove error message
      if (field.value) removeError(current);
      else addFormError(current, "is required");
    }
  };

  const checkUniqueness = (field: FieldValueProps, current: string) => {
    // find requirements list
    const isUniqueListIdx = uniqueList.findIndex((list) => list.name === current);
    // if requirements for unique schema are found
    if (isUniqueListIdx >= 0 && typeof field.value === "string") {
      // find unique list
      const valueIdx = uniqueList[isUniqueListIdx].list.findIndex((l) => l === field.value);
      // if found add error
      if (valueIdx >= 0) {
        // reset success message if any
        setFormMessage({ ...formMessage, [current]: "" });
        addFormError(current, "already exist try a something different");
      } else {
        setFormMessage({ ...formMessage, [current]: `${emojis.checkedBox} Can be used!` });
        removeError(current);
      }
    }
  };
  const validateForm = (values: FieldValueProps[]) => {
    const errors: KeyStringProp = {};
    for (let index = 0; index < values.length; index += 1) {
      const current = values[index];
      const { fieldId } = current;
      // only check if its required and if value is empty
      if (require.includes(current.name) && !current.value) errors[fieldId] = `**Required`;
      // next validate unique list
      const isInList = uniqueList.findIndex((list) => list.name === current.name);
      if (isInList >= 0) {
        const valueIdx = uniqueList[isInList].list.findIndex((l) => l === current.value);
        if (valueIdx >= 0) errors[fieldId] = "already exists try something else";
      }
    }
    if (objLength(errors) > 0) {
      // add all erros to state
      setFormErrors(errors);
      setStatus("red");
    } else {
      setFormErrors({});
      setStatus("green");
    }
  };

  return {
    validationStatus,
    formErrors,
    setFormErrors,
    setStatus,
    checkRequired,
    validateForm,
    checkUniqueness,
    formMessage,
  };
};

/**
 * 
 * TODO: OTHER VALIDATION
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
