import type { FormInitialValues, KeyStringProp } from "custom-props";

export const clearFormEntry = (values: FormInitialValues) => {
  let data: KeyStringProp = {};
  Object.keys(values).forEach((key) => (data[key] = ""));
  return data;
};
