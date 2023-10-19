import { FieldValueProps } from "nxs-form";

export const formatFormData = (values: FieldValueProps[]) => {
  let payload: { [key: string]: any } = {};
  const uniqueGroups: { [key: string]: string[] } = {};
  values.forEach((val) => {
    const { group, sharedKey, name, value, groupName } = val;
    // check if value is part of a group
    if (group && sharedKey && !uniqueGroups[group]?.includes(sharedKey)) {
      const groupPayload = { value, name, sharedKey, group, groupName };
      // check if the group has not been checked
      if (uniqueGroups[group] && !uniqueGroups[group].includes(sharedKey)) {
        // if not checked add to uniqueGroups; create new instance
        uniqueGroups[group] = [...uniqueGroups[group], sharedKey];
      }
      payload[group].group?.push(groupPayload);
    } else payload[name] = value;
  });
  return payload;
};
export const formatFilesData = (values: FieldValueProps[]) => {
  // form data is tricky it wont show values in console, send to db and check there
  const formData = new FormData();
  for (let item = 0; item < values.length; item++) {
    const current = values[item];
    formData.append(current.name, current.value);
  }
  return formData;
};
