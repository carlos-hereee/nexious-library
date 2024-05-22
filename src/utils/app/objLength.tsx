import type { ObjectToArray } from "custom-props";

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

// export const addArrayInObj =({ obj, key, value }:AddArrayInObject) => {
//   // eslint-disable-next-line no-param-reassign
//   if (obj[key]) obj[key] = [...obj[key], value];
//   // eslint-disable-next-line no-param-reassign
//   else obj[key] = [value];
// };
