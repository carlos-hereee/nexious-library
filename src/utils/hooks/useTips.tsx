import { useState } from "react";

export type TipsProp = {
  strength: number;
  tips: string[];
  ease: string;
};

export const useTips = () => {
  const [tips, setTips] = useState<TipsProp>({
    strength: 0,
    tips: [],
    ease: "",
  });
  return { tips, setTips };
};
