import { objToArray } from "@nxs-utils/app/objLength";
import { FormInitValues, KeyStringProp } from "@nxs-utils/helpers/types";
import { useEffect, useState } from "react";

type FormValueProps = {
  initialValues: FormInitValues;
  labels?: KeyStringProp;
  types?: KeyStringProp;
  placeholders?: KeyStringProp;
  fieldHeading?: string;
};
type InitValueProps = {
  [key: number]: {
    value: any;
    label: string;
    name: string;
    placeholder: string;
    type: string;
    fieldHeading?: string;
  };
}[];

export const useValues = (props: FormValueProps) => {
  const { initialValues, labels } = props;
  const [values, setValues] = useState<InitValueProps>([]);
  useEffect(() => {
    const initFormValues = (values: FormInitValues[]) => {
      console.log("labels", labels);
      values.forEach((current, idx) => {
        const key = Object.keys(current)[0];
        setValues((prev) => [
          ...prev,
          {
            [idx]: {
              name: key,
              value: current[key],
              labels: "",
              placeholder: "",
              type: "",
              fieldHeading: "",
            },
          },
        ]);
      });
    };
    const data = objToArray(initialValues);
    // clear prev values if any; avoid redundant data
    setValues([]);
    initFormValues(data);
  }, []);
  return { values, setValues };
};
