import { useState } from "react";

type FormValueProps = {
  [key: string]: any;
};

export const useValues = (initialValues: FormValueProps) => {
  const [values, setValues] = useState<FormValueProps>(initialValues);
  console.log("initialValues", initialValues);
  return { values, setValues };
};
