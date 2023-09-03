import { KeyStringProp } from "@nxs-utils/helpers/types";
import { useState } from "react";

export const useInitialValues = (values: KeyStringProp) => {
  const [initialValues, setInitialValues] = useState<KeyStringProp>();
  return { initialValues, setInitialValues };
};
