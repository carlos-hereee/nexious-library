import { FieldValueProps } from "nxs-form";

export const formatFormData = (values: FieldValueProps[]) => {
  let payload: { [key: string]: any } = {};
  const uniqueGroups: { [key: string]: string[] } = {};
  values.forEach((val) => {
    // check if value is part of a group
    if (val.group) {
      const { group, sharedKey, name, value, groupName } = val;
      if (sharedKey && !uniqueGroups[group]?.includes(sharedKey)) {
        const groupPayload = { value, name, sharedKey, group, groupName };
        // check if the group has not been checked
        if (uniqueGroups[group] && !uniqueGroups[group].includes(sharedKey)) {
          // if not checked add to uniqueGroups; create new instance
          uniqueGroups[group] = [...uniqueGroups[group], sharedKey];
        }
        if (payload[group]) payload[group] = [...payload[group], groupPayload];
        else payload[group] = [groupPayload];
      }
    } else payload[val.name] = val.value;
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
