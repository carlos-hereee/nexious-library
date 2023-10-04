import { objToArray } from "@nxs-utils/app/objLength";
import { initLabels } from "@nxs-utils/form/labels";
import { initPlaceholders as initHolder } from "@nxs-utils/form/placeholders";
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
  const { initialValues, labels, types, placeholders: holder } = props;
  const [values, setValues] = useState<InitValueProps>([]);
  useEffect(() => {
    const initFormValues = (values: FormInitValues[]) => {
      values.forEach((current, idx) => {
        // value name
        const name = Object.keys(current)[0];
        // use user labels first
        let label = labels ? (labels[name] ? labels[name] : undefined) : undefined;
        // if user did not enter a label use app labels;
        // incase no label found use in app use default "No label added"
        if (!label) label = initLabels[name] ? initLabels[name] : "No label added";
        // use user types first if not type is added use default "text"
        let type = types ? (types[name] ? types[name] : "text") : "text";
        // use user placehodlers first if no placehodler use app placeholders
        let placeholder = holder ? (holder[name] ? holder[name] : undefined) : undefined;
        // incase no placeholer found use in app placeholder else default should empty string
        if (!placeholder) placeholder = initHolder[name] ? initHolder[name] : "";

        if (!placeholder)
          setValues((prev) => [
            ...prev,
            {
              [idx]: {
                value: current[name],
                name,
                label,
                placeholder,
                type,
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
