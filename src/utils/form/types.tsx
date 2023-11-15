export const types: { [key: string]: string } = {
  password: "password",
  confirmPassword: "password",
  email: "text",
  name: "text",
  phone: "number",
  string: "text",
};
export const auth: string[] = [
  "password",
  "confirmPassword",
  "oldPassword",
  "newPassword",
  "confirmNewPassword",
];
export const fileUpload: [string] = ["logo"];
export const textarea: [string] = ["body"];
export const files: [string, string] = ["logo", "hero"];

export type FormMediaProps = { name: string; file: File };
