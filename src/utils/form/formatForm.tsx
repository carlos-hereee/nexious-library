import type { FieldValueData, FieldValueProps, FormInitialValue, FormValueProps } from "nxs-form";

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
export const formatFilesData = (values: FieldValueProps[]) => {
  // form data is tricky it wont show values in console, send to db and check there
  const formData = new FormData();
  for (let item = 0; item < values.length; item += 1) {
    const current = values[item];
    if (typeof current.value === "number") formData.append(current.name, `${current.value}`);
    else if (current.value instanceof File) formData.append(current.name, current.value);
    else if (current.value instanceof Blob) formData.append(current.name, current.value);
    else if (current.sharedKey) {
      const keyName = `${current.name}-${current.group}-${current.sharedKey}`;
      if (typeof current.value === "string") formData.append(keyName, current.value);
      if (typeof current.value === "boolean") formData.append(keyName, `${current.value}`);
    } else if (typeof current.value === "string") formData.append(current.name, current.value);
    else if (typeof current.value === "boolean") formData.append(current.name, `${current.value}`);
  }
  return formData;
};
