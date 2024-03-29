import type { FieldValueProps, ValidateProps } from "nxs-form";
import { useState } from "react";
import type { KeyStringProp } from "custom-props";
import { objLength } from "@nxs-utils/app/objLength";
import { emojis } from "@nxs-utils/data/emojis";
import { scrollToId } from "@nxs-utils/app/scrollToElement";
import { makeStrReadable } from "@nxs-utils/data/text";

export const useFormValidation = (props: ValidateProps) => {
  const { required, unique } = props;
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [formMessage, setFormMessage] = useState<KeyStringProp>({});
  const [validationStatus, setStatus] = useState<"red" | "yellow" | "green" | null>(null);
  const require = required || [];
  const uniqueList = unique || [{ name: "", list: [] }];

  const addFormError = (current: string, message: string) => {
    setFormErrors({ ...formErrors, [current]: message });
    setStatus("red");
  };
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
  const validateForm = (values: FieldValueProps[], status: "red" | "yellow" | "green") => {
    let errors: KeyStringProp = {};
    for (let index = 0; index < values.length; index += 1) {
      const current = values[index];
      // only check if its required
      if (require.includes(current.name)) {
        const key = current.name;
        // if value is empty
        if (!current.value) {
          errors = { ...errors, [key]: `${makeStrReadable(key)} is required` };
        }
      }
      const isInList = uniqueList.findIndex((list) => list.name === current.name);
      if (isInList >= 0) {
        const valueIdx = uniqueList[isInList].list.findIndex((l) => l === current.value);
        if (valueIdx >= 0) errors[current.name] = "already exists try something else";
      }
    }
    if (objLength(errors) === 0) setStatus(status);
    else {
      setStatus("red");
      setFormErrors(errors);
    }
  };
  // if any errors scroll to element id
  const scrollToError = (idx?: number) => {
    const errorId = Object.keys(formErrors);
    if (idx === undefined) {
      scrollToId(errorId[0]);
    } else {
      scrollToId(errorId[idx]);
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
    scrollToError,
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
