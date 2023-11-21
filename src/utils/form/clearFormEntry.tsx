import type { KeyStringProp } from "custom-props";
import type { FieldValue } from "nxs-form";

export const clearFormEntry = (values: FieldValue) => {
  const data: KeyStringProp = {};
  Object.keys(values).forEach((key) => {
    data[key] = "";
  });
  return data;
};
