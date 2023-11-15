import { objToArray } from "@nxs-utils/app/objLength";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import { initLabels } from "@nxs-utils/form/labels";
import { initPlaceholders as initHolder } from "@nxs-utils/form/placeholders";
import { FormInitValues } from "custom-props";
import { FieldValueProps, AddEntryValueProps, FormatEntryProps } from "nxs-form";
import { useState } from "react";

export const useValues = () => {
  const [values, setNewValues] = useState<FieldValueProps[]>([]);

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
  const addExtraEntry = (props: FormatEntryProps) => {
    const { addEntry, target, oldValues } = props;
    const { initialValues, groupName } = addEntry;
    // add properties all entrys should have
    let entryData: FieldValueProps[] = [];
    // track group
    const groupingIdx = oldValues.findIndex((oldVal) => oldVal.name === groupName);
    if (groupingIdx >= 0) {
      oldValues[groupingIdx].value.forEach((val: FormInitValues) => {
        const sharedKey = val.sharedKey || uniqueId();
        const entryFormat = Object.keys(initialValues).map((item) => ({ [item]: val[item] }));
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
  const formatEntry = (props: FormatEntryProps) => {
    const { oldValues, addEntry, target } = props;
    const { canMultiply, additionLabel, removalLabel } = addEntry;
    oldValues[oldValues.length - 1].canMultiply = canMultiply;
    oldValues[oldValues.length - 1].canRemove = true;
    oldValues[oldValues.length - 1].onMultiply = { additionLabel, name: target, removalLabel };
    return oldValues;
  };
  const setValues = (oldValues: FieldValueProps[]) => {
    setNewValues([]);
    setNewValues(oldValues);
  };
  return { values, setValues, formatFieldEntry, addNewEntry, addExtraEntry };
};
