import { isFile } from "@nxs-utils/tsChecker/isDefined";
import type { FieldEntryProps, FieldValueData, FieldValueProps, FormInitialValue, FormValueProps } from "nxs-form";

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

export const formatFormData = (values: FieldValueProps[]) => {
  return Object.assign({}, ...values.map((val) => ({ [val.name]: val.value })));
};
export const formatFormEntryData = (values: FieldValueProps[], entries: { [key: string]: FieldEntryProps }) => {
  const data: { [key: string]: FormInitialValue | FieldValueData[] } = {};
  for (let item = 0; item < values.length; item += 1) {
    const current = values[item];
    // eslint-disable-next-line prefer-destructuring
    const groupName = current.groupName;
    // if its an entry field format the group
    if (groupName) {
      // list of each entry
      const entryList = Object.keys(entries[groupName]);
      const entryValues = entryList.map((sharedKey) => formatFormData(entries[groupName][sharedKey]));
      data[groupName] = entryValues;
    } else data[current.name] = current.value;
  }
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
