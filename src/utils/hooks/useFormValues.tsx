import { objToArray } from "@nxs-utils/app/objLength";
import { initLabels } from "@nxs-utils/form/labels";
import { initPlaceholders as initHolder } from "@nxs-utils/form/placeholders";
import { FormInitialValueProps, FormValueProps, AddEntryValueProps } from "nxs-form";
import { useEffect, useState } from "react";

export const useValues = (props: FormValueProps) => {
  const { initialValues, labels, types, placeholders, fieldHeading } = props;
  const [values, setValues] = useState<FormInitialValueProps[]>([]);

  const addEntries = (props: AddEntryValueProps): FormInitialValueProps[] => {
    const { values, fieldHeading, labels, types, placeholders: holder } = props;
    const { group, sharedKey } = props;
    return values.map((current) => {
      // value name
      const name = Object.keys(current)[0];
      // get initial value
      let value = current[name];
      // if null or undefined use appropriate values
      if (!value) value = types ? (types[name] === "checkbox" ? false : "") : "";
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
      return { value, name, label, placeholder, type, fieldHeading, group, sharedKey };
    });
  };
  useEffect(() => {
    const data = objToArray(initialValues);
    // clear prev values if any; avoid redundant data
    setValues([]);
    setValues(addEntries({ values: data, labels, types, placeholders, fieldHeading }));
  }, []);

  return { values, setValues, addEntries };
};
