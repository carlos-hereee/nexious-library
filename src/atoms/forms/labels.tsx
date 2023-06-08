export const labels = {
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
  username: "Username",
  password: "Password",
  confirmPassword: "Confirm Password",
  search: "Search",
};

// get all keys in labels
export type LabelKeys = keyof typeof labels;
