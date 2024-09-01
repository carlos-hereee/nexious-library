export const propChecker = <C>(arr: unknown, target: C): null | C => {
  if (!Array.isArray(arr)) return null;

  // keep track if prop type is a match
  let isMatch = true;
  for (let index = 0; index < arr.length; index += 1) {
    if (!isMatch) break;
    // if element is not targets type update tracker
    if (typeof arr[index] !== typeof target) isMatch = false;
  }
  // if match passes return target type else return null
  return isMatch ? target : null;
};
