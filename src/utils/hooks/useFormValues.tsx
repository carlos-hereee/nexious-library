import { objToArray } from "@nxs-utils/app/objLength";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import { initLabels } from "@nxs-utils/form/labels";
import { initPlaceholders as initHolder } from "@nxs-utils/form/placeholders";
import { FormInitValues } from "custom-props";
import { FormInitialValueProps, FormValueProps, AddEntryValueProps } from "nxs-form";
import { useEffect, useState } from "react";

// type ExtraValueProps = {
//   entryValues: FormInitValues[];
//   oldValues: FormInitValues;
//   originIdx: number;
//   key: string;
// };

export const useValues = (props: FormValueProps) => {
  const { initialValues, labels, types, placeholders, addEntry } = props;
  const [values, setValues] = useState<FormInitialValueProps[]>([]);

  const formatEntry = (props: AddEntryValueProps): FormInitialValueProps[] => {
    const { formatValues, fieldHeading, labels, types, placeholders: holder } = props;
    const { group, sharedKey, groupName } = props;
    return formatValues.map((current) => {
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
  // const addExtraData = ({ entryValues, oldValues, originIdx, key }: ExtraValueProps) => {
  //   if (addEntry && addEntry[key]) {
  //     // const entryValues = objToArray(addEntry[name].initialValues);
  //     const { labels, types, placeholders, canMultiply, skipIfFalse } = addEntry[key];
  //     const { additionLabel, removalLabel } = addEntry[key];
  //     oldValues[skipIfFalse];
  //     // add properties all entrys should have
  //     const groupName = skipIfFalse;
  //     const entryPayload = { values: entryValues, labels, types, placeholders, groupName };
  //     // if additional entries are possible add them here
  //     let entriesData = formatEntry({ ...entryPayload, group: key, sharedKey: uniqueId() });
  //     entriesData[entriesData.length - 1].canMultiply = canMultiply;
  //     entriesData[entriesData.length - 1].onMultiply = {
  //       additionLabel,
  //       name: key,
  //       removalLabel,
  //     };
  //     entriesData[entriesData.length - 1].canRemove = true;
  //     // keep everything together; 0 is the number of element to be deleted
  //     oldValues.splice(originIdx + 1, 0, ...entriesData);
  //     //  save values
  //     return oldValues;
  //   }
  // };
  useEffect(() => {
    const data = objToArray(initialValues);
    // clear prev values if any; avoid redundant data
    setValues([]);
    if (addEntry) {
      const entryData = objToArray(addEntry);
      let extraData: FormInitialValueProps[] = [];
      for (let entryIdx = 0; entryIdx < entryData.length; entryIdx++) {
        const groupName = Object.keys(entryData[entryIdx])[0];
        const { canMultiply, skipIfFalse } = addEntry[groupName];
        const { removalLabel, additionLabel, fieldHeading, types: t } = addEntry[groupName];
        const { labels: l, placeholders: p } = addEntry[groupName];
        // const numCount = Object.keys(value).length;
        // continue if initial value's checkbox is true
        if (initialValues[groupName] && skipIfFalse) {
          // were not skipping the march continues
          // find the the skippable data
          initialValues[skipIfFalse].forEach((v: { [key: string]: any }) => {
            const keys = Object.keys(v);
            // const total = initialValues[skipIfFalse].length;
            let payload: FormInitValues[] = [];
            const sharedKey = v.sharedKey || uniqueId();
            // const isMulty = canMultiply && total === idx ? true : false;
            keys.forEach((k) => payload.push({ [k]: v[k], name: k }));
            const entriesData = formatEntry({
              formatValues: payload,
              fieldHeading,
              groupName,
              group: skipIfFalse,
              labels: l,
              placeholders: p,
              sharedKey,
              types: t,
            });
            entriesData[keys.length - 1].canMultiply = canMultiply;
            entriesData[keys.length - 1].onMultiply = {
              additionLabel,
              name: groupName,
              removalLabel,
            };
            entriesData[entriesData.length - 1].canRemove = true;
            // add payload to data values
            extraData.push(...entriesData);
          });
          // remove from data list
          const valueIdx = data.findIndex((d) => d[skipIfFalse]);
          data.splice(valueIdx, 1);
        }
      }
      console.log("data", data);
      console.log("extraData", extraData);
      // const data = formatEntry(payload);
      // oldValues.splice(originIdx + 1, 0, ...entriesData);
      // keep everything together; 0 is the number of element to be deleted
      //  save values
      // console.log("extraData", extraData);
      // add payload to data values
      // const valueIdx = data.findIndex((d) => d[groupName]);
      // dataVals.splice(valueIdx + numCount, 0, ...entryPayload);

      // console.log("payload", dataVals);

      // const removalIdx = data.findIndex((d) => d[skipIfFalse]);
      // dataVals.splice(removalIdx, 1);
      // console.log("data", dataVals);
      // const extraVals = addExtraData({ entryValues, oldValues: dataVals, originIdx, key });
      // const dataWithEtraValues = formatEntry({
      //   values: data,
      // });
    } else setValues(formatEntry({ formatValues: data, labels, types, placeholders }));
  }, []);

  return { values, setValues, formatEntry };
};
