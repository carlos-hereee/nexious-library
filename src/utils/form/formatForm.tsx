import type {
  FieldValueData,
  FieldValueProps,
  FormInitialValue,
  FormValueProps,
  AddEntryValueProps,
  FieldEntryProps,
} from "nxs-form";
import type { ObjectToArray } from "custom-props";
import { isFile } from "@nxs-utils/app/isDefined";
import { uniqueId } from "../data/uniqueId";
import { initLabels } from "./labels";
import { initPlaceholders } from "./placeholders";

const appendValuesToFormData = (current: FieldValueProps, keyName: string, formData: FormData) => {
  // field value is of type File or Blob or string
  if (current.value instanceof File || current.value instanceof Blob || typeof current.value === "string") {
    formData.append(keyName, current.value);
  }
  // field value is type boolean, or number
  else formData.append(keyName, `${current.value}`);
  // field value is a string
  return formData;
};
export const formatInitialFormValues: ObjectToArray<FormInitialValue> = (obj) => {
  if (!obj) return [];
  if (typeof obj === "object") return Object.keys(obj).map((key) => ({ [key]: obj[key] }));
  return [];
};
export const formatFormData = (values: FieldValueProps[]) => {
  return Object.assign(
    {},
    ...values.map((val) => {
      if (val.group) {
        const { group, sharedKey, name, value, groupName } = val;
        const groupPayload = { value, name, sharedKey, group, groupName };
        return { [val.name]: groupPayload };
      }
      return { [val.name]: val.value };
    })
  );
};
export const formatFormEntryData = (values: FieldValueProps[]) => {
  const data: { [key: string]: FormInitialValue | FieldValueData[] } = {};
  values.forEach((val) => {
    // if value is not in a group add value to data
    if (!val.group) data[val.name] = val.value;
    else if (val.groupName && val.sharedKey) {
      const { group, sharedKey, name, value, groupName } = val;
      const groupPayload: FieldValueData = { sharedKey, group, groupName };
      // if group is already been added
      if (data[val.groupName]) {
        const fieldData = data[val.groupName] as FieldValueData[];
        // to keep every together search shared key
        const keyIdx = fieldData.findIndex((v) => v.sharedKey === sharedKey);
        fieldData[keyIdx] = { ...fieldData[keyIdx], [name]: value };
      }
      // if value group has not been added to data
      else data[val.groupName] = [{ ...groupPayload, [name]: value }];
    }
  });
  return data;
};
export const formatPreviewData = (values: FieldValueProps[]) => {
  const payload: { [key: string]: FormInitialValue | FormValueProps[] } = {};
  values.forEach((val) => {
    const { name, group, groupName, sharedKey, value } = val;
    if (group && groupName) {
      // if group has been added
      if (Array.isArray(payload[groupName])) {
        const current = payload[groupName] as FormValueProps[];
        const idx = current.findIndex((v) => v.sharedKey === sharedKey);
        if (idx >= 0) current[idx] = { ...current[idx], [name]: value };
      } else payload[groupName] = [{ [name]: value, sharedKey: sharedKey || "" }];
    } else payload[name] = value;
  });
  return payload;
};

// form data is tricky it wont show values in console, send to db and check there
export const formatFilesData = (values: FieldValueProps[], formData: FormData) => {
  for (let item = 0; item < values.length; item += 1) {
    const current = values[item];
    if (current.groupName && current.sharedKey) {
      if (isFile(current.value)) appendValuesToFormData(current, current.groupName, formData);
      else {
        const keyName = `${current.groupName}-${current.sharedKey}`;
        appendValuesToFormData(current, keyName, formData);
      }
    } else appendValuesToFormData(current, current.name, formData);
  }
  return formData;
};

export const formatFilesEntryData = (values: FieldValueProps[], entries: { [key: string]: FieldEntryProps }) => {
  // form data is tricky it wont show values in console, send to db and check there
  const formData = new FormData();
  for (let item = 0; item < values.length; item += 1) {
    const current = values[item];
    // eslint-disable-next-line prefer-destructuring
    const groupName = current.groupName;
    // if its an entry field format the group
    if (groupName) {
      // list of each entry
      const entryList = Object.keys(entries[groupName]);
      entryList.forEach((sharedKey) => formatFilesData(entries[groupName][sharedKey], formData));
    } else appendValuesToFormData(current, current.name, formData);
  }
  return formData;
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
