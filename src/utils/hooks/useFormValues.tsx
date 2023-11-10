import { objToArray } from "@nxs-utils/app/objLength";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import { initLabels } from "@nxs-utils/form/labels";
import { initPlaceholders as initHolder } from "@nxs-utils/form/placeholders";
import { FormInitValues, KeyStringProp } from "custom-props";
import {
  FieldValueProps,
  AddEntryValueProps,
  FormatEntryProps,
  FormatEntraEntryProps,
} from "nxs-form";
import { useState } from "react";

export const useValues = () => {
  const [values, setValues] = useState<FieldValueProps[]>([]);

  const formatFieldEntry = (props: AddEntryValueProps): FieldValueProps[] => {
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
  // const formatEntry = (props: FormatEntryProps) => {
  //   const { groupName, currentValues } = props;
  //   const { initialValues, fieldHeading, labels: l, placeholders: p } = props.entry.form;
  //   const { types: t, removalLabel, additionLabel, canMultiply } = props.entry.form;
  //   const { groupName } = props.entry.form;
  //   let entriesData: FieldValueProps[] = [];

  //   console.log("initialValues :>> ", initialValues);
  //   if (initialValues?.[groupName]) {
  //     initialValues[groupName].forEach((v: { [key: string]: any }) => {
  //       const keys = Object.keys(v);
  //       let payload: FormInitValues[] = [];
  //       const sharedKey = v.sharedKey || uniqueId();
  //       keys.forEach((k) => payload.push({ [k]: v[k], name: k }));
  //       // add payload to data values
  //       entriesData = formatFieldEntry({
  //         formatValues: payload,
  //         fieldHeading,
  //         groupName,
  //         group: groupName,
  //         labels: l,
  //         placeholders: p,
  //         sharedKey,
  //         types: t,
  //       });
  //       entriesData[keys.length - 1].canMultiply = canMultiply;
  //       entriesData[keys.length - 1].onMultiply = {
  //         additionLabel,
  //         name: groupName,
  //         removalLabel,
  //       };
  //       entriesData[entriesData.length - 1].canRemove = true;
  //     });
  //     return entriesData;
  //   }
  //   return [];
  // };
  const addNewEntry = (props: FormatEntryProps) => {
    const { addEntry, target, oldValues } = props;
    const entryValues = objToArray(addEntry.initialValues);
    const { labels, types, placeholders, canMultiply, groupName } = addEntry;
    const { additionLabel, removalLabel } = addEntry;
    // add properties all entrys should have
    const group = target;
    const payload = { formatValues: entryValues, labels, types, placeholders, groupName };
    // if additional entries are possible add them here
    let entriesData = formatFieldEntry({ ...payload, group, sharedKey: uniqueId() });
    entriesData[entriesData.length - 1].canMultiply = canMultiply;
    entriesData[entriesData.length - 1].canRemove = true;
    entriesData[entriesData.length - 1].onMultiply = {
      additionLabel,
      name: group,
      removalLabel,
    };
    if (oldValues) {
      const newIdx = oldValues.findIndex((d) => d.name === groupName);
      const numCount = oldValues.filter((d) => d.groupName === groupName);
      // keep everything together; 0 is the number of element to be deleted
      oldValues.splice(newIdx + numCount.length + 1, 0, ...entriesData);
      return oldValues;
    }
    return oldValues;
  };
  const addExtraEntry = (props: FormatEntraEntryProps) => {
    const { addEntry, target, oldValues } = props;
    const { labels, types, placeholders, canMultiply, initialValues } = addEntry;
    const { additionLabel, removalLabel } = addEntry;
    // add properties all entrys should have
    let entriesData: FieldValueProps[] = [];
    const groupName = addEntry.groupName;
    if (oldValues[groupName].length > 0) {
      oldValues[groupName].forEach((curVal: KeyStringProp) => {
        const { sharedKey, ...rest } = curVal;
        const currentValues = objToArray(initialValues).map((initVal) => {
          const key = Object.keys(initVal)[0];
          return { [key]: rest[key] || "" };
        });
        const group = target;
        const payload = { formatValues: currentValues, labels, types, placeholders, group };
        // if additional entries are possible add them here
        entriesData = formatFieldEntry({ ...payload, groupName, sharedKey });
        entriesData[entriesData.length - 1].canMultiply = canMultiply;
        entriesData[entriesData.length - 1].canRemove = true;
        entriesData[entriesData.length - 1].onMultiply = {
          additionLabel,
          name: group,
          removalLabel,
        };
      });
    }
    return entriesData;
  };
  return { values, setValues, formatFieldEntry, addNewEntry, addExtraEntry };
};
