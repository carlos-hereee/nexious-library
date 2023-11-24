import type { FieldValueProps, FormInitialValue, FormValueProps } from "nxs-form";

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
    }
  }
  return formData;
};
