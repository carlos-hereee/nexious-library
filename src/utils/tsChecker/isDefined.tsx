export const isDefined = (data?: unknown) => {
  if (!data) return false;
  if (data === "undefined" || data === undefined) return false;
  if (data === "null" || data === null) return false;
  return true;
};
export const isFile = (data?: unknown) => {
  if (data instanceof File || data instanceof Blob) return true;
  return false;
};
