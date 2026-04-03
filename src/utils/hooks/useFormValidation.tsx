import type { FieldValueProps, ValidateFormStatus, ValidateInverseCheckbox, ValidateProps } from "nxs-form";
import { useState } from "react";
import type { KeyStringProp } from "custom-props";
import { emojis } from "@nxs-utils/data/emojis";

// Minimal RFC-compliant email check: requires local@domain.tld with no spaces.
// Covers the vast majority of real-world addresses without over-engineering.
const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const useFormValidation = (schema: ValidateProps) => {
  const { required, unique, match, strictCheckbox } = schema;
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [formMessage, setFormMessage] = useState<KeyStringProp>({});
  const [validationStatus, setStatus] = useState<ValidateFormStatus>(null);

  // Removed: useEffect([formErrors]) that re-set status after every formErrors change.
  // It was redundant because validateForm now sets status correctly in all cases,
  // and the effect was causing an extra render cycle that overrode the "green" submit
  // status with "validated" before Form.tsx could act on it.

  const checkRequired = (current: FieldValueProps) => {
    if (required) {
      const { name, value } = current;
      if (required.includes(name)) {
        if (!value) return `**Required`;
      }
    }
    return "";
  };

  const checkEmail = (current: FieldValueProps): string => {
    const { name, value } = current;
    // only validate fields named "email" that have a value
    // (empty email is caught by checkRequired if the field is required)
    if (name === "email" && value) {
      if (!validateEmail(value as string)) return "should be a valid email address";
    }
    return "";
  };

  const checkInverseCheckbox = ({ current, inverseCheckbox, oldValues }: ValidateInverseCheckbox) => {
    if (strictCheckbox) {
      const isMain = strictCheckbox.findIndex((box) => box.main === current.name);
      if (isMain >= 0 && current.value) {
        oldValues = inverseCheckbox(strictCheckbox[isMain].inverse, !current.value, oldValues);
      } else if (current.value) {
        const idx = strictCheckbox.findIndex((box) => box.inverse.includes(current.name));
        const mainIdx = oldValues.findIndex((val) => val.name === strictCheckbox[idx].main);
        if (oldValues[mainIdx].value) {
          oldValues = inverseCheckbox([strictCheckbox[idx].main], false, oldValues);
        }
      }
    }
    return oldValues;
  };

  const checkCount = (current: FieldValueProps) => {
    if (schema.count && schema.count[current.name]) {
      if (schema.count[current.name].max < parseInt(current.value as string, 10)) {
        return ` Value must be less than ${schema.count[current.name].max}`;
      }
      if (schema.count[current.name].min > parseInt(current.value ? (current.value as string) : "0", 10)) {
        return ` Value must be greater than ${schema.count[current.name].min}`;
      }
    }
    return "";
  };

  const checkUniqueness = (field: FieldValueProps) => {
    if (unique) {
      const { fieldId, name, value } = field;
      const uniqueIdx = unique.findIndex((list) => list.name === name);
      if (uniqueIdx >= 0 && typeof value === "string") {
        const valueIdx = unique[uniqueIdx].list.findIndex((l) => l === value);
        if (valueIdx >= 0) {
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
      if (matchIdx >= 0 && value !== match[matchIdx].value) {
        return `value must match ${match[matchIdx].value}`;
      }
    }
    return "";
  };

  const validateForm = (values: FieldValueProps[], status?: ValidateFormStatus) => {
    const errors: KeyStringProp = {};
    values.forEach((current) => {
      const c = checkCount(current);
      if (c) errors[current.fieldId] = c;
      const require = checkRequired(current);
      if (require) errors[current.fieldId] = require;
      // validate email format when the field is named "email"
      const emailMsg = checkEmail(current);
      if (emailMsg) errors[current.fieldId] = emailMsg;
      const uniqueMsg = checkUniqueness(current);
      if (uniqueMsg) errors[current.fieldId] = uniqueMsg;
      const matchMsg = checkMatch(current);
      if (matchMsg) errors[current.fieldId] = matchMsg;
    });

    // BUG WAS HERE: the original else branch unconditionally set "validated" even
    // when errors were found. This meant form submissions with errors could appear
    // to succeed. Fix: check errors first, then honor the requested status.
    if (Object.keys(errors).length > 0) {
      // validation found problems — always signal error regardless of requested status
      setStatus("error");
    } else if (status) {
      // no errors and caller requested a specific follow-up status (e.g. "green" to submit)
      setStatus(status);
    } else {
      // no errors, no specific status requested — mark as clean
      setStatus("validated");
    }
    setFormErrors(errors);
  };

  return { validationStatus, formErrors, setFormErrors, setStatus, validateForm, formMessage, checkInverseCheckbox };
};
