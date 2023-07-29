import { labels } from "@nxs-atoms/forms/labels";

type ValidateFormProps = {
  [key: string]: string;
};

const validateEmail = (mail: string) => {
  let isMailValidated = false;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(mail)) {
    isMailValidated = true;
  }
  return { isMailValidated };
};
export const validateForm = (values: ValidateFormProps) => {
  let isValidated: boolean = true;
  let errors: { [key: string]: string } = {};
  Object.keys(values).forEach((key: string) => {
    // check if empty
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
  });
  return { isValidated, errors };
};
