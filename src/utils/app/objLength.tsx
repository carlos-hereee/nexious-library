export const objLength = (obj?: unknown) => {
  // if its not an object return undefined
  if (!obj) return 0;
  return Object.keys(obj).length;
};
export const objToArray = (obj?: { [key: string]: unknown }): { [key: string]: unknown }[] => {
  if (!obj) return [];
  if (typeof obj === "object") return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  return [];
};
