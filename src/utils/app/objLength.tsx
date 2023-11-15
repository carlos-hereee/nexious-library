export const objLength = (obj?: { [key: string]: any }) => {
  // if its not an object return undefined
  if (!obj) return 0;
  return Object.keys(obj).length;
};
export const objToArray = (obj: { [key: string]: any }) => {
  return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
};
