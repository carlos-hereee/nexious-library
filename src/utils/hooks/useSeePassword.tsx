import { useState } from "react";

export const useSeePassword = () => {
  const [seePassword, setSeePassword] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });

  const togglePassword = (key: string) => {
    setSeePassword({ ...seePassword, [key]: !seePassword[key] });
  };
  return { seePassword, togglePassword };
};
