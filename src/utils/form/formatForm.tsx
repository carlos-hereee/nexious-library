import { FieldValueProps } from "nxs-form";

export const formatFormData = (values: FieldValueProps[]) => {
  return Object.assign(
    {},
    ...values.map((val) => {
      if (val.group) {
        const { group, sharedKey, name, value, groupName } = val;
        const groupPayload = { value, name, sharedKey, group, groupName };
        return { [val.name]: groupPayload };
      } else return { [val.name]: val.value };
    })
  );
};
export const formatFilesData = (values: FieldValueProps[]) => {
  // form data is tricky it wont show values in console, send to db and check there
  const formData = new FormData();
  for (let item = 0; item < values.length; item++) {
    const current = values[item];
    if (current.sharedKey && current.name !== "hero" && current.name !== "sectionHero") {
      const keyName = current.name + "-" + current.group + "-" + current.sharedKey;
      formData.append(keyName, current.value);
    } else if (current.name === "hero") formData.append("hero", current.value);
    else if (current.name === "sectionHero") formData.append("sectionHero", current.value);
    else formData.append(current.name, current.value);
  }
  return formData;
};
