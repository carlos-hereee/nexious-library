// Checks whether two values are the same type, handling the cases where
// typeof alone is not enough:
//   - typeof null === "object" (same as a real object)
//   - typeof [] === "object"   (same as a plain object)
// Without these guards, propChecker would accept an array where an object
// is expected, or vice versa.
const isSameType = (a: unknown, b: unknown): boolean => {
  if (typeof a !== typeof b) return false;
  // both are "object" — distinguish null, array, and plain object
  if (a === null || b === null) return a === null && b === null;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  return true;
};

export const propChecker = <C>(arr: unknown, target: C): null | C => {
  if (!Array.isArray(arr)) return null;

  // every element must match the type of the target value
  const allMatch = arr.every((item) => isSameType(item, target));
  return allMatch ? target : null;
};
