import { uniqueId } from "@nxs-utils/data/uniqueId";
import { useState } from "react";
import type { FieldValueProps, FormatEntryProps, FormatExtraEntryProps, InitialExtraValue } from "nxs-form";
import { objToArray } from "@nxs-utils/app/objLength";
import { formatFieldEntry } from "@nxs-utils/form/formatForm";

export const useValues = () => {
  const [values, setNewValues] = useState<FieldValueProps[]>([]);
  const [activeEntry, setActiveEntry] = useState<{ [x: string]: FieldValueProps[] }>({});
  const [entries, setEntries] = useState<{ [x: string]: FieldValueProps[][] }>({});

  const addNewEntry = ({ addEntry, group }: FormatEntryProps) => {
    const formatValues = objToArray(addEntry.initialValues);
    const { groupName } = addEntry;
    const fieldEntry = formatFieldEntry({ formatValues, ...addEntry, sharedKey: uniqueId(), group });
    // add properties all entrys should have
    // console.log("fieldEntry :>> ", fieldEntry);
    // console.log("addEntry :>> ", addEntry);
    // if additional entries are possible add them here
    setActiveEntry({ ...activeEntry, [groupName]: fieldEntry });
    // // add new entry to list
    if (entries[groupName]) setEntries({ ...entries, [groupName]: [...entries[groupName], fieldEntry] });
    else setEntries({ ...entries, [groupName]: [fieldEntry] });

    // const newIdx = oldValues.findIndex((d) => d.name === group);
    // const numCount = oldValues.filter((d) => d.groupName === groupName);
    // // keep everything together; 0 is the number of element to be deleted
    // oldValues.splice(newIdx + numCount.length + 1, 0, ...ent);
    // return oldValues;
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
        // // const ent = formatEntry({ addEntry, oldValues: formatFieldEntry(payload), target });
        // entryData.push(...ent);
      });
      // update list
      oldValues.splice(groupingIdx, 1, ...entryData);
    }
  };

  const setValues = (oldValues: FieldValueProps[]) => {
    setNewValues([]);
    setNewValues(oldValues);
  };
  return { values, entries, activeEntry, setValues, addNewEntry, addExtraEntry };
};
// const formatEntry = (props: FormatEntryProps) => {
//   const { addEntry, target, oldValues } = props;
//   const { canMultiply, additionLabel, removalLabel } = addEntry;
//   oldValues[oldValues.length - 1].canMultiply = canMultiply || false;
//   oldValues[oldValues.length - 1].canRemove = true;
//   oldValues[oldValues.length - 1].onMultiply = { additionLabel, name: target, removalLabel };
//   return oldValues;
// };
