import type { KeyStringProp } from "custom-props";
import type { FormValueProps } from "nxs-form";

export const clearFormEntry = (values: FormValueProps) => {
  const data: KeyStringProp = {};
  Object.keys(values).forEach((key) => {
    data[key] = "";
  });
  return data;
};
