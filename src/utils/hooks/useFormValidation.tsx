import type { FieldValueProps, ValidateProps } from "nxs-form";
import { useEffect, useState } from "react";
import type { KeyStringProp } from "custom-props";
import { objLength } from "@nxs-utils/app/objLength";
import { emojis } from "@nxs-utils/data/emojis";

export const useFormValidation = (schema: ValidateProps) => {
  const { required, unique, match } = schema;
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [formMessage, setFormMessage] = useState<KeyStringProp>({});
  const [validationStatus, setStatus] = useState<"red" | "yellow" | "validated" | "green" | null>(null);

  useEffect(() => {
    if (validationStatus) {
      if (objLength(formErrors) === 0) setStatus("validated");
      else setStatus("red");
    }
  }, [formErrors]);

  const checkRequired = (current: FieldValueProps) => {
    if (required) {
      // only check if its required
      const { name, value } = current;
      if (required.includes(name)) {
        // add error message based on value exists else remove error message
        if (!value) return `**Required`;
      }
    }
    return "";
  };

  const checkUniqueness = (field: FieldValueProps) => {
    if (unique) {
      const { fieldId, name, value } = field;
      // find requirements list
      const uniqueIdx = unique.findIndex((list) => list.name === name);
      // if requirements for unique schema are found
      if (uniqueIdx >= 0 && typeof value === "string") {
        // find unique list
        const valueIdx = unique[uniqueIdx].list.findIndex((l) => l === value);
        // if found add error
        if (valueIdx >= 0) {
          // reset success message if any
          setFormMessage({ ...formMessage, [fieldId]: "" });
          return "already exist try a something different";
        }
        setFormMessage({ ...formMessage, [fieldId]: `${emojis.checkedBox} Can be used!` });
      }
    }
    return "";
  };
  const checkMatch = (field: FieldValueProps) => {
    if (match) {
      const { name, value } = field;
      const matchIdx = match.findIndex((list) => list.name === name);
      // must match found and values dont match
      if (matchIdx >= 0 && value !== match[matchIdx].value) {
        return `value must match ${match[matchIdx].value}`;
      }
    }
    return "";
  };
  const validateForm = (values: FieldValueProps[]) => {
    const errors: KeyStringProp = {};
    values.forEach((current) => {
      // check required first and then uniqueness
      const require = checkRequired(current);
      if (require) errors[current.fieldId] = require;
      const uniqueMsg = checkUniqueness(current);
      if (uniqueMsg) errors[current.fieldId] = uniqueMsg;
      const matchMsg = checkMatch(current);
      if (matchMsg) errors[current.fieldId] = matchMsg;
    });
    setFormErrors(errors);
    setStatus("validated");
  };

  return { validationStatus, formErrors, setFormErrors, setStatus, validateForm, formMessage };
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
