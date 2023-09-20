export const objLength = (obj?: { [key: string]: any }) => {
  if (!obj) return 0;
  return Object.keys(obj).length;
};
