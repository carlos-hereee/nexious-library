import { uniqueId } from "@nxs-utils/data/uniqueId";
import { useState } from "react";
import type {
  FieldEntryProps,
  FieldValueProps,
  FormValueProps,
  FormatEntryProp,
  FormatEntryProps,
  FormatExtraEntryProps,
} from "nxs-form";
import { formatFieldEntry, formatInitialFormValues } from "@nxs-utils/form/formatForm";
import type { AddArrayInObject, KeyStringProp } from "custom-props";

export const useValues = () => {
  const [values, setNewValues] = useState<FieldValueProps[]>([]);
  const [activeEntry, setActiveEntry] = useState<KeyStringProp>({});
  const [entryValues, setEntries] = useState<{ [x: string]: FieldEntryProps }>({});

  const addArrayToObj = ({ obj, key, value }: AddArrayInObject<FieldEntryProps>) => {
    // eslint-disable-next-line no-param-reassign
    if (obj[key]) obj[key] = { ...obj[key], ...value };
    // eslint-disable-next-line no-param-reassign
    else obj[key] = { ...value };
  };

  const formatEntry = ({ value, addEntry, group, targets, actives }: FormatEntryProp) => {
    // find sharedkey or create a new one if none exist
    const { groupName } = addEntry;
    const sharedKey = value.sharedKey || value.uid || uniqueId();
    const formatValues: FormValueProps[] = formatInitialFormValues(value);
    // // add properties all entrys should have
    const fieldEntry = formatFieldEntry({ formatValues, addEntry, ...addEntry, sharedKey, group });
    // eslint-disable-next-line no-param-reassign
    if (actives) actives = { ...actives, [groupName]: sharedKey };
    if (targets) addArrayToObj({ obj: targets, key: groupName, value: { [sharedKey]: fieldEntry } });
    return { entry: { [groupName]: sharedKey }, fieldEntry };
  };

  const addNewEntry = ({ addEntry, group }: FormatEntryProps) => {
    const active = formatEntry({ addEntry, group, value: addEntry.initialValues });
    // if additional entries are possible add them here
    setActiveEntry({ ...activeEntry, ...active.entry });
    return active.fieldEntry;
  };

  const addExtraEntry = ({ addEntry, entries, oldValues }: FormatExtraEntryProps) => {
    // keey track of each entry
    const targets: { [x: string]: FieldEntryProps } = {};
    // keep track of new fields to be added
    let fields: { [key: string]: FieldValueProps } = {};
    // keep track of fields that should be active
    let actives: KeyStringProp = {};
    // itirate values to find entry insertion
    oldValues.forEach((oldVal) => {
      const { name: group, value } = oldVal;
      //  if field has entry and value is true
      if (addEntry[group] && value) {
        const { groupName, initialValues } = addEntry[group];
        entries[groupName].forEach((val) => {
          // format entry for different use case
          if (!Array.isArray(val)) {
            const { entry, fieldEntry } = formatEntry({ addEntry: addEntry[group], group, targets, value: val });
            // update actives
            actives = { ...actives, ...entry };
            //  add to field if new
            if (!fields[groupName]) fields = { ...fields, [groupName]: fieldEntry[0] };
          } else {
            if (val.length === 0) {
              const v = initialValues;
              const { entry, fieldEntry } = formatEntry({ addEntry: addEntry[group], group, targets, value: v });
              actives = { ...actives, ...entry };
              if (!fields[groupName]) fields = { ...fields, [groupName]: fieldEntry[0] };
            }
            if (val.length > 0) {
              val.forEach((v) => {
                const { entry, fieldEntry } = formatEntry({ addEntry: addEntry[group], group, targets, value: v });
                actives = { ...actives, ...entry };
                if (!fields[groupName]) fields = { ...fields, [groupName]: fieldEntry[0] };
              });
            }
          }
        });
      }
    });
    // update entries
    setEntries(targets);
    // set actives
    setActiveEntry(actives);
    // update oldvalues to include new fields
    Object.keys(fields).forEach((field) => {
      const newIdx = oldValues.findIndex((d) => d.name === fields[field].group);
      // keep everything together; 0 is the number of element to be deleted
      oldValues.splice(newIdx + 1, 0, fields[field]);
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
