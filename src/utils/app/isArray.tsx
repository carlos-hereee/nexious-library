import type { FormInitialValues } from "custom-props";
import type { FieldValueProps } from "nxs-form";

export const isArray = (
  array: FormInitialValues | FormInitialValues[] | FieldValueProps[]
) => {
  return Array.isArray(array);
};
