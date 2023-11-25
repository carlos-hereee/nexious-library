import type { FormInitialValue } from "nxs-form";

export const objLength = (obj?: unknown) => {
  // if its not an object return undefined
  if (!obj) return 0;
  return Object.keys(obj).length;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objToArray = (obj?: { [key: string]: any }) => {
  if (!obj) return [];
  if (typeof obj === "object") return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  return [];
};
export const formatInitialFormValues = (obj?: { [key: string]: FormInitialValue }) => {
  if (!obj) return [];
  if (typeof obj === "object") return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  return [];
};
