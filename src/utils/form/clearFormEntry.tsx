import type { FormInitValues, KeyStringProp } from "custom-props";

export const clearFormEntry = (values: FormInitValues) => {
  let data: KeyStringProp = {};
  Object.keys(values).forEach((key) => (data[key] = ""));
  return data;
};
