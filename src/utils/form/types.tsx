export const types: { [key: string]: string } = {
  password: "password",
  confirmPassword: "password",
  email: "text",
  name: "text",
  phone: "number",
  string: "text",
};
export const auth: [string, string] = ["password", "confirmPassword"];
export const select: [string] = ["theme"];
export const fileUpload: [string] = ["logo"];
export const textarea: [string] = ["body"];
export const files: [string, string] = ["logo", "hero"];

export type FormMediaProps = { name: string; file: File };
