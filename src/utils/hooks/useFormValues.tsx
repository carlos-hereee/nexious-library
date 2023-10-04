import { objToArray } from "@nxs-utils/app/objLength";
import { FormInitValues } from "@nxs-utils/helpers/types";
import { useEffect, useState } from "react";

type FormValueProps = {
  initialValues: FormInitValues;
};
type InitValueProps = {
  [key: string]: FormInitValues;
}[];

export const useValues = (props: FormValueProps) => {
  const { initialValues } = props;
  const [values, setValues] = useState<InitValueProps>([]);
  useEffect(() => {
    const initFormValues = (values: FormInitValues[]) => {
      values.forEach((current, idx) => {
        setValues((prev) => [...prev, { [`${idx}`]: current }]);
      });
    };
    const data = objToArray(initialValues);
    // clear prev values if any; avoid redundant data
    setValues([]);
    initFormValues(data);
  }, []);
  return { values, setValues };
};
