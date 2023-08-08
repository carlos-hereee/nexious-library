import { labels } from "@nxs-atoms/forms/labels";
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
    if (key === "oldPassword") {
      console.log("old", key, values);
    }
    if (!values[key]) {
      isValidated = false;
      errors[key] = labels[key] + " is a required field";
    }
    // validate email
    if (key === "email") {
      const { isMailValidated } = validateEmail(values[key]);
      if (!isMailValidated) {
        isValidated = false;
        errors[key] = labels[key] + " please provide a valid email address";
      }
    }
    // confirm matching passwords
    if (key === "confirmPassword") {
      if (!matchingPassword(values["password"], values[key])) {
        isValidated = false;
        errors[key] = labels[key] + " must match password";
      }
    }
  });
  return { isValidated, errors };
};
