import { FormInitValues, KeyStringProp } from "@nxs-utils/helpers/types";

export const clearFormEntry = (values: FormInitValues) => {
  let data: KeyStringProp = {};
  Object.keys(values).forEach((key) => (data[key] = ""));
  return data;
};
