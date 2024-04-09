// Define a function to generate a random character from a given set of characters
function getRandomCharacter() {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=[]{}|;:,.<>?";
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters.charAt(randomIndex);
}

export const uniqueId = (length?: number) => {
  // Define the length of the random string you want
  const len = length || 12; // You can change this to the desired length
  // Generate the random string
  let randomString = "";
  for (let i = 0; i < len; i += 1) {
    // add hyphen every third letter just coz
    // if (i % 3 === 0) randomString += "-";
    randomString += getRandomCharacter();
  }
  return randomString;
};
