import { objToArray } from "@nxs-utils/app/objLength";
import { initLabels } from "@nxs-utils/form/labels";
import { initPlaceholders as initHolder } from "@nxs-utils/form/placeholders";
import { FormInitialValueProps, FormValueProps, AddEntryValueProps } from "nxs-form";
import { useEffect, useState } from "react";

export const useValues = (props: FormValueProps) => {
  const { initialValues, labels, types, placeholders, fieldHeading, addEntry } = props;
  const [values, setValues] = useState<FormInitialValueProps[]>([]);

  const addEntries = (props: AddEntryValueProps): FormInitialValueProps[] => {
    const { values, fieldHeading, labels, types, placeholders: holder } = props;
    const { group, sharedKey, groupName } = props;
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
      const payload = { value, name, label, placeholder, type, fieldHeading };
      return { ...payload, group, sharedKey, groupName };
    });
  };
  useEffect(() => {
    const data = objToArray(initialValues);
    // clear prev values if any; avoid redundant data
    setValues([]);
    if (addEntry) {
      const entryData = objToArray(addEntry);
      for (let entryIdx = 0; entryIdx < entryData.length; entryIdx++) {
        const current = entryData[entryIdx];
        const key = Object.keys(current)[0];
        // continue if initial value's checkbox is true
        if (initialValues[key]) {
          const { canMultiply, initialValues: value, skipIfFalse } = addEntry[key];
          const numCount = Object.keys(value).length;
          // were not skipping the march continues
          if (skipIfFalse) {
            initialValues[skipIfFalse].forEach((v: { [key: string]: any }) => {
              const keys = Object.keys(v);
              const total = initialValues[skipIfFalse].length;
              let payload: { [key: string]: any } = {};
              keys.forEach((k, idx) => {
                const isMulty = canMultiply && total === idx ? true : false;
                payload = { value: v[k], name: k, canMultiply: isMulty };
              });
              const valueIdx = data.findIndex((d) => d[key]);
              // add payload to data values
              data.splice(valueIdx + numCount, 0, payload);
            });
            // console.log("skipIfFalse", skipIfFalse);
            // const removalIdx = data.findIndex((d) => d[skipIfFalse]);
            // data.splice(removalIdx + numCount, 1);
            // console.log("removalIdx", removalIdx);
          }
        }
      }
    }
    console.log("data", data);
    setValues(addEntries({ values: data, labels, types, placeholders, fieldHeading }));
  }, []);

  return { values, setValues, addEntries };
};
