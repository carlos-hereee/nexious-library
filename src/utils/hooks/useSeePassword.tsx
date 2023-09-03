import { useState } from "react";

export const useSeePassword = () => {
  const [seePassword, setSeePassword] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });

  return { seePassword, setSeePassword };
};
