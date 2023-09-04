import { labels } from "@nxs-utils/form/labels";
import { validateEmail } from "./validateEmail";
import { matchingPassword } from "./matchingPassword";

type ValidateFormProps = {
  [key: string]: string;
};

export const validateForm = (values: ValidateFormProps) => {
  let isValidated: boolean = true;
  let errors: { [key: string]: string } = {};

  Object.keys(values).forEach((key: string) => {
    // check if empty
    if (!values[key]) {
      isValidated = false;
      errors[key] = labels[key] + " is a required field";
      return;
    }
    // validate email
    if (key === "email") {
      if (!validateEmail(values[key])) {
        isValidated = false;
        errors[key] = labels[key] + " should be a valid email address";
        return;
      }
    }
    // confirm matching passwords
    if (key === "newPassword") {
      if (matchingPassword(values["oldPassword"], values["newPassword"])) {
        isValidated = false;
        errors[key] = labels[key] + " must be different than previous password";
        return;
      }
    }
    if (key === "confirmNewPassword") {
      const newPassword = values["newPassword"];
      const confirmNewPassword = values["confirmNewPassword"];
      if (!matchingPassword(newPassword, confirmNewPassword)) {
        isValidated = false;
        errors[key] = labels[key] + " must match new password";
        return;
      }
    }
    if (key === "confirmPassword") {
      if (!matchingPassword(values["password"], values[key])) {
        isValidated = false;
        errors[key] = labels[key] + " must match password";
        return;
      }
    }
  });
  return { isValidated, errors };
};
