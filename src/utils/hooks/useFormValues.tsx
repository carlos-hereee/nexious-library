import { objToArray } from "@nxs-utils/app/objLength";
import { initLabels } from "@nxs-utils/form/labels";
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
      values.forEach((current, idx) => {
        // value name
        const name = Object.keys(current)[0];
        // use user labels first
        let label = labels ? (labels[name] ? labels[name] : undefined) : undefined;
        // if user did not enter a label use app labels
        if (!label) {
          // incase no label was found in app use default "No label added"
          label = initLabels[name] ? initLabels[name] : "No label added";
        }
        setValues((prev) => [
          ...prev,
          {
            [idx]: {
              name,
              value: current[name],
              label,
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
