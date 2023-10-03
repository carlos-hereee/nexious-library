import { objToArray } from "@nxs-utils/app/objLength";
import { useState } from "react";

type FormValueProps = {
  [key: string]: any;
};

export const useValues = (initialValues: FormValueProps) => {
  const [values, setValues] = useState<FormValueProps[]>(objToArray(initialValues));
  return { values, setValues };
};
