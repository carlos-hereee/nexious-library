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
const matchingPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};
const isPasswordStrong = (password: string) => {
  let strength = 0;
  let tips = [""];
  // check length
  if (password.length < 8) {
    const len = 8 - password.length;
    tips.push(
      `The length of strong passwords start at 8 characters long! ${len} character(s) left`
    );
  } else strength += 1;
  // check for caps case
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    tips.push("Use lowercase and uppercase letters.");
  } else strength += 1;
  // check numbers
  if (password.match(/\d/)) {
    strength += 1;
  } else tips.push("Include at least one number.");
  // check for special characters
  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else tips.push("Include at least one special charater.");

  return { strength, tips };
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
    // check password strength
    if (key === "password") {
      if (isPasswordStrong(values[key])) {
        console.log("name");
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
