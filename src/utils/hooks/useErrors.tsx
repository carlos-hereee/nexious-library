import type { KeyStringProp } from "custom-props";
import { useState } from "react";

export const useErrors = () => {
  const [errors, setErrors] = useState<KeyStringProp>({});
  return { errors, setErrors };
};
