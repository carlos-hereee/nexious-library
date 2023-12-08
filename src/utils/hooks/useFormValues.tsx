import { uniqueId } from "@nxs-utils/data/uniqueId";
import { initLabels } from "@nxs-utils/form/labels";
import { initPlaceholders as initHolder } from "@nxs-utils/form/placeholders";
import { useState } from "react";
import type {
  FieldValueProps,
  AddEntryValueProps,
  FormatEntryProps,
  FormatExtraEntryProps,
  InitialExtraValue,
} from "nxs-form";
import { objToArray } from "main";

export const useValues = () => {
  const [values, setNewValues] = useState<FieldValueProps[]>([]);

  const formatEntry = (props: FormatEntryProps) => {
    const { addEntry, target, oldValues } = props;
    const { canMultiply, additionLabel, removalLabel } = addEntry;

    oldValues[oldValues.length - 1].canMultiply = canMultiply || false;
    oldValues[oldValues.length - 1].canRemove = true;
    oldValues[oldValues.length - 1].onMultiply = {
      additionLabel,
      name: target,
      removalLabel,
    };
    return oldValues;
  };
  const formatFieldEntry = (props: AddEntryValueProps): FieldValueProps[] => {
    const { formatValues, fieldHeading, labels, types, placeholders } = props;
    const { group, sharedKey, groupName } = props;
    return formatValues.map((current) => {
      // value name
      const name = Object.keys(current)[0];
      // get initial field data and extract field data
      let value = current[name];
      let label = initLabels[name] || "No label added";
      let type = "text";
      let placeholder = initHolder[name] || "";
      // if null or undefined use appropriate values
      if (types && types[name] === "checkbox") value = value || false;
      if (labels && labels[name]) label = labels[name];
      if (types && types[name]) type = types[name];
      // use user placehodlers first if no placehodler use app placeholders
      if (placeholders && placeholders[name]) placeholder = placeholders[name];

      const payload = { value, name, label, placeholder, type, fieldHeading };
      return { ...payload, group, sharedKey, groupName, fieldId: uniqueId() };
    });
  };

  const addNewEntry = (props: FormatEntryProps) => {
    const { addEntry, target, oldValues } = props;
    const entryValues = objToArray(addEntry.initialValues);
    const { groupName } = addEntry;
    // add properties all entrys should have
    const group = target;
    const payload = { formatValues: entryValues, ...addEntry, group, sharedKey: uniqueId() };
    // if additional entries are possible add them here
    const ent = formatEntry({ addEntry, oldValues: formatFieldEntry(payload), target });
    const newIdx = oldValues.findIndex((d) => d.name === group);
    const numCount = oldValues.filter((d) => d.groupName === groupName);
    // keep everything together; 0 is the number of element to be deleted
    oldValues.splice(newIdx + numCount.length + 1, 0, ...ent);
    return oldValues;
  };

  const addExtraEntry = (props: FormatExtraEntryProps) => {
    const { addEntry, target, oldValues } = props;
    const { initialValues, groupName } = addEntry;

    // TODO: REMOVE CAN MULTIPLY PROPERTY IF ITS NOT LAST ENTRY

    // add properties all entrys should have
    const groupingIdx = oldValues.findIndex((oldVal) => oldVal.name === groupName);
    // track group
    if (groupingIdx >= 0 && Array.isArray(oldValues[groupingIdx].value)) {
      const entryData: FieldValueProps[] = [];
      (oldValues[groupingIdx].value as InitialExtraValue[]).forEach((val) => {
        const sharedKey = val.sharedKey || uniqueId();
        const entryFormat = Object.keys(initialValues).map((item) => ({
          [item]: val[item],
        }));
        // format entry
        const payload = { formatValues: entryFormat, ...addEntry, sharedKey, group: target };
        // if additional entries are possible add them here
        const ent = formatEntry({ addEntry, oldValues: formatFieldEntry(payload), target });
        entryData.push(...ent);
      });
      // update list
      oldValues.splice(groupingIdx, 1, ...entryData);
    }
  };

  const setValues = (oldValues: FieldValueProps[]) => {
    setNewValues([]);
    setNewValues(oldValues);
  };
  const formatInitialEntry = () => {};
  return {
    values,
    setValues,
    formatFieldEntry,
    addNewEntry,
    addExtraEntry,
    formatInitialEntry,
  };
};
