import { useState } from "react";
import { checkPasswordStrength } from "./form/validateForm";

type TipsProp = {
  strength: number;
  tips: string[];
  ease: string;
};

export const usePasswordTips = (password: string) => {
  // const [tips, setTips] = useState<TipsProp | null>();
  const { strength, ease, tips } = checkPasswordStrength(password);

  // if (passwordStrength === 0 || passwordStrength < 4) {
  //   setTips({
  //     strength: passwordStrength,
  //     tips: tipsMessage,
  //     ease: errorMessage[passwordStrength],
  //   });
  // }
  // return tips;
};
