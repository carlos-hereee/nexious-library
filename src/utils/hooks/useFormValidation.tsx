import { getLabel } from "../form/labels";
import { FieldValueProps } from "nxs-form";
import { useState } from "react";
import { KeyStringProp } from "custom-props";

type ValidateProps = {
  required?: string[];
  labels?: KeyStringProp;
};

export const useFormValidation = (props: ValidateProps) => {
  const { labels, required } = props;
  const [formErrors, setFormErrors] = useState<KeyStringProp | undefined>(undefined);

  const validateRequired = (v: FieldValueProps) => {
    // only check if its required
    if (required && required.includes(v.name)) {
      const current = v.name;
      setFormErrors({
        ...formErrors,
        // check if empty
        [current]: v.value ? `${getLabel(current, labels)} is required` : "",
      });
    }
  };

  return { setFormErrors, formErrors, validateRequired };
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
