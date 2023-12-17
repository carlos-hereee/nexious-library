export const combineArraysWithOutDups = (array1: unknown[], array2: unknown[]) => {
  return [...array1, ...array2.filter((array) => !array1.includes(array))];
};
