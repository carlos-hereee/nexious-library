import type { KeyStringProp } from "custom-props";

export const initLabels: KeyStringProp = {
  firstName: "First name",
  lastName: "Last name",
  name: "Enter name",
  streetAddress: "Street Address",
  email: "Email",
  phone: "Phone number",
  apt: "Apt/Suite",
  city: "City",
  state: "State",
  postalCode: "Postal code",
  username: "Username or email",
  password: "Password",
  confirmPassword: "Confirm Password",
  confirmNewPassword: "Confirm new password",
  search: "Search",
  message: "Message",
  cardHolderName: "Card holder name",
  cardNumber: "Card number",
  expiration: "Expiration date",
  cvc: "CVC",
  oldPassword: "Old password",
  newPassword: "New password",
  date: "Date",
  theme: "App theme",
  logo: "App logo",
  appName: "App name",
  nickname: "Nickname:",
  label: "Display name:",
  body: "Data content:",
  title: "Title:",
  link: "Enter page name or url this points to",
};
export const getLabel = (key: string, labels?: KeyStringProp) => {
  return labels && labels[key] ? labels[key] : initLabels[key];
};
