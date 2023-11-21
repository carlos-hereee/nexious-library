export const isArray = (array: { [key: string]: unknown }[]) => {
  return Array.isArray(array);
};
export const arrayLen = (array?: unknown[] | unknown): number => {
  if (!array) return 0;
  if (Array.isArray(array)) return array.length;
  return 0;
};
