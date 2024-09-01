export const isArray = (array: unknown) => Array.isArray(array);

export const arrayLen = (array?: unknown): number => {
  if (!array) return 0;
  if (Array.isArray(array)) return array.length;
  return 0;
};
