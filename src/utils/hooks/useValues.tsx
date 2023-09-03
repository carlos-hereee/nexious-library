import { KeyStringProp } from "@nxs-utils/helpers/types";
import { useState } from "react";

export const useValues = (initialValues: KeyStringProp) => {
  const [values, setValues] = useState<KeyStringProp>(initialValues);
  return { values, setValues };
};
