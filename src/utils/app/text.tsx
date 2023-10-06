export const capFirstCharacter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const makeStrReadable = (str: string) => {
  const words = str.split(/(?=[A-Z])/);
  const readableString = words.join(" ");
  return capFirstCharacter(readableString);
};
