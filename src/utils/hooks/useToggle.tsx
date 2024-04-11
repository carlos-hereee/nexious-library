import { useState } from "react";

export const useToggle = () => {
  const [toggle, setToggle] = useState<{ [key: string]: boolean }>({});

  const handleToggle = (key: string) => {
    setToggle({ ...toggle, [key]: !toggle[key] });
  };
  return { toggle, handleToggle };
};
