import type { ObjectToArray } from "custom-props";
import type { FormInitialValue } from "nxs-form";

export const objLength = (obj?: unknown) => {
  // if its not an object return undefined
  if (!obj) return 0;
  return Object.keys(obj).length;
};
export const objToArray: ObjectToArray<unknown> = (obj) => {
  if (!obj) return [];
  if (typeof obj === "object") return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  return [];
};
