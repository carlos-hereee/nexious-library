import { labels } from "@nxs-atoms/forms/labels";

type ValidateFormProps = {
  [key: string]: string;
};
const errorMessage: { [num: number]: string } = {
  0: "Easy to guess",
  1: "Moderate difficulty",
  2: "Difficult",
  3: "No contest",
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
export const checkPasswordStrength = (password: string) => {
  let passwordStrength: number = 0;
  let tipsMessage: string[] = [];

  const len = password.length;
  const hasLowercaseLetters = password.match(/[a-z]/);
  const hasUppercaseLetters = password.match(/[A-Z]/);
  const hasSpecialLetters = password.match(/[^a-zA-Z\d]/);
  const hasNumbers = password.match(/\d/);
  // check length
  if (len < 8) {
    tipsMessage.push(
      `The length of strong passwords start at 8 characters long! ${
        8 - len
      } character(s) left`
    );
  } else passwordStrength += 1;
  // check for caps case
  if (!hasLowercaseLetters || !hasUppercaseLetters) {
    tipsMessage.push("Use lowercase and uppercase letters.");
  } else passwordStrength += 1;
  // check numbers
  if (hasNumbers) {
    passwordStrength += 1;
  } else tipsMessage.push("Include at least one number.");
  // check for special characters
  if (hasSpecialLetters) {
    passwordStrength += 1;
  } else tipsMessage.push("Include at least one special charater.");
  return {
    strength: passwordStrength,
    tips: tipsMessage,
    ease: errorMessage[passwordStrength],
  };
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
      console.log("key", key);
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
