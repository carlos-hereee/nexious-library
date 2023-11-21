export const isNumber = (count?: unknown): boolean => {
  if (count === 0) return true;
  if (!count) return false;
  if (typeof count === "number") return true;
  return false;
};
