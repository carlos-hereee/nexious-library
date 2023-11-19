export const objLength = (obj?: { [key: string]: unknown }) => {
  // if its not an object return undefined
  if (!obj) return 0;
  return Object.keys(obj).length;
};
export const objToArray = (obj: { [key: string]: unknown }) => {
  return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
};
