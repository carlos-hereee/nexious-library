import { uniqueId } from "@nxs-utils/data/uniqueId";
import { useState } from "react";
import type {
  FieldEntryProps,
  FieldValueProps,
  FormValueProps,
  FormatEntryProps,
  FormatExtraEntryProps,
} from "nxs-form";
import { formatFieldEntry, formatInitialFormValues } from "@nxs-utils/form/formatForm";
import type { AddArrayInObject, KeyStringProp } from "custom-props";

export const useValues = () => {
  const [values, setNewValues] = useState<FieldValueProps[]>([]);
  const [activeEntry, setActiveEntry] = useState<KeyStringProp>({});
  const [entryValues, setEntries] = useState<{ [x: string]: FieldEntryProps }>({});

  const addArrayInEntry = ({ obj, key, value }: AddArrayInObject<FieldEntryProps>) => {
    // eslint-disable-next-line no-param-reassign
    if (obj[key]) obj[key] = { ...obj[key], ...value };
    // eslint-disable-next-line no-param-reassign
    else obj[key] = { ...value };
  };

  const addNewEntry = ({ addEntry, group }: FormatEntryProps) => {
    const formatValues: FormValueProps[] = formatInitialFormValues(addEntry.initialValues);
    const { groupName } = addEntry;
    const sharedKey = uniqueId();
    // add properties all entrys should have
    const fieldEntry = formatFieldEntry({ formatValues, ...addEntry, addEntry, sharedKey, group });
    // if additional entries are possible add them here
    setActiveEntry({ ...activeEntry, [groupName]: sharedKey });

    return fieldEntry;
  };

  const addExtraEntry = ({ addEntry, entries, oldValues }: FormatExtraEntryProps) => {
    const targets = {};
    let actives = {};
    const newValues: FieldValueProps[][] = [];
    // itirate values to find entry insertion
    oldValues.forEach((oldVal) => {
      const { name: group, value } = oldVal;
      //  if field has entry and value is true
      if (addEntry[group] && value) {
        const entryObj = addEntry[group];
        const { groupName } = addEntry[group];
        entries[groupName].forEach((val) => {
          // find sharedkey or create a new one if none exist
          const sharedKey = val.sharedKey || uniqueId();
          const formatValues: FormValueProps[] = formatInitialFormValues(val);
          const fieldEntry = formatFieldEntry({ formatValues, addEntry: entryObj, ...entryObj, sharedKey, group });
          newValues.push(fieldEntry);
          // if additional entries are possible add them here
          actives = { ...actives, [groupName]: sharedKey };
          addArrayInEntry({ obj: targets, key: groupName, value: { [sharedKey]: fieldEntry } });
        });
      }
    });
    setEntries(targets);
    setActiveEntry(actives);
    newValues.forEach((val) => {
      const { groupName, group } = val[0];
      if (groupName && group) {
        const payload = { ...val[0], name: groupName, groupName, group };
        // eslint-disable-next-line no-param-reassign
        const newIdx = oldValues.findIndex((d) => d.name === group);
        // keep everything together; 0 is the number of element to be deleted
        oldValues.splice(newIdx + 1, 0, payload);
      }
    });
  };

  const setValues = (oldValues: FieldValueProps[]) => {
    setNewValues([]);
    setNewValues(oldValues);
  };
  // const setActiveEntryEntry = (n: KeyStringProp) => {
  //   console.log("n :>> ", n);
  //   // console.log("entries :>> ", entries);
  //   // setActiveEntry();
  // };
  return { values, entryValues, activeEntry, setValues, addNewEntry, setActiveEntry, setEntries, addExtraEntry };
};
// const formatEntry = (props: FormatEntryProps) => {
//   const { addEntry, target, oldValues } = props;
//   const { canMultiply, additionLabel, removalLabel } = addEntry;
//   oldValues[oldValues.length - 1].canMultiply = canMultiply || false;
//   oldValues[oldValues.length - 1].canRemove = true;
//   oldValues[oldValues.length - 1].onMultiply = { additionLabel, name: target, removalLabel };
//   return oldValues;
// };
