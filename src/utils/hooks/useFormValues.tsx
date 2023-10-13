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
      const entry = formatEntry({ formatValues: data, labels, types, placeholders });
      const valueData: FormInitialValueProps[] = [];
      entry.forEach((entVal) => {
        // add entries to appropriate groups
        valueData.push(entVal);
        if (entVal.type === "checkbox" && entVal.value) {
          const extraDataToInclude = extraData.filter((ext) => ext.groupName === entVal.name);
          valueData.push(...extraDataToInclude);
        }
      });
      setValues(valueData);
    } else setValues(formatEntry({ formatValues: data, labels, types, placeholders }));
  }, []);

  return { values, setValues, formatEntry };
};
