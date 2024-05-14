import type { FieldValueProps, AddEntryValueProps, FormInitialValue } from "nxs-form";
import type { ObjectToArray } from "custom-props";
import { uniqueId } from "../data/uniqueId";
import { initLabels } from "./labels";
import { initPlaceholders } from "./placeholders";

export const formatInitialFormValues: ObjectToArray<FormInitialValue> = (obj) => {
  if (!obj) return [];
  if (typeof obj === "object") return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  return [];
};
export const formatFieldEntry = (props: AddEntryValueProps): FieldValueProps[] => {
  const { formatValues, labels, types, placeholders, fieldHeading, addEntry, sharedKey, group } = props;
  return formatValues.map((current) => {
    // value name
    const name = Object.keys(current)[0];
    // unit data
    const data: FieldValueProps = {
      name,
      group,
      fieldHeading,
      value: current[name],
      label: initLabels[name] || "No label added",
      type: "text",
      placeholder: initPlaceholders[name],
      fieldId: uniqueId(),
      sharedKey,
    };
    if (addEntry) {
      data.groupName = addEntry.groupName;
      data.fieldHeading = addEntry.fieldHeading;
      data.canMultiply = addEntry.canMultiply || false;
      data.canRemove = true;
      data.onMultiply = {
        additionLabel: addEntry.additionLabel,
        name: addEntry.groupName,
        removalLabel: addEntry.removalLabel,
      };
    }
    // if null or undefined use appropriate values
    if (types && types[name] === "checkbox") data.value = data.value || false;
    if (labels && labels[name]) data.label = labels[name];
    if (types && types[name]) data.type = types[name];
    // use user placehodlers first if no placehodler use app placeholders
    if (placeholders && placeholders[name]) data.placeholder = placeholders[name];
    return data;
  });
};
