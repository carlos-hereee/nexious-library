const errorMessage: { [num: number]: string } = {
  0: "Easy to guess",
  1: "Moderate difficulty",
  2: "Hard",
  3: "Difficult",
};

export const checkPasswordStrength = (password: string) => {
  let passwordStrength: number = 0;
  let tipsMessage: string[] = [];

  const len = password.length;
  const hasLowercaseLetters = password.match(/[a-z]/);
  const hasUppercaseLetters = password.match(/[A-Z]/);
  const hasSpecialLetters = password.match(/[^a-zA-Z\d]/);
  const hasNumbers = password.match(/\d/);
  // check length
  if (len < 8) {
    tipsMessage.push(
      `The length of strong passwords start at 8 characters long! ${
        8 - len
      } character(s) left`
    );
  } else passwordStrength += 1;
  // check for caps case
  if (!hasLowercaseLetters || !hasUppercaseLetters) {
    tipsMessage.push("Use lowercase and uppercase letters.");
  } else passwordStrength += 1;
  // check numbers
  if (hasNumbers) {
    passwordStrength += 1;
  } else tipsMessage.push("Include at least one number.");
  // check for special characters
  if (hasSpecialLetters) {
    passwordStrength += 1;
  } else tipsMessage.push("Include at least one special charater.");
  return {
    strength: passwordStrength,
    tips: tipsMessage,
    ease: errorMessage[passwordStrength],
  };
};
