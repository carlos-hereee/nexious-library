import { useState } from "react";
import { checkPasswordStrength } from "./form/validateForm";

type TipsProp = {
  strength: number;
  tips: string[];
  ease: string;
};
const errorMessage: { [num: number]: string } = {
  0: "Easy to guess",
  1: "Moderate difficulty",
  2: "Difficult",
  3: "No contest",
};

export const usePasswordTips = (password: string) => {
  const [tips, setTips] = useState<TipsProp | null>();
  const { passwordStrength, tipsMessage } = checkPasswordStrength(password);

  if (passwordStrength === 0 || passwordStrength < 4) {
    setTips({
      strength: passwordStrength,
      tips: tipsMessage,
      ease: errorMessage[passwordStrength],
    });
  }
  return tips;
};
