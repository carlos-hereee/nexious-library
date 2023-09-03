import { KeyStringProp } from "@nxs-utils/helpers/types";
import { useState } from "react";

export const useErrors = () => {
  const [errors, setErrors] = useState<KeyStringProp>({});
  return { errors, setErrors };
};
