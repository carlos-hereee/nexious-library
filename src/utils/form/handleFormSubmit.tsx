import { validateForm } from "./validateForm";
import { initLabels } from "./labels";

type HandleFormSubmitProps = {
  formProps: React.FormEvent<HTMLFormElement>;
  values: { [key: string]: any };
  schema?: { required: string[] };
  label?: { [key: string]: string };
};
export const handleFormSubmit = (props: HandleFormSubmitProps) => {
  const { formProps, schema, label } = props;
  const { values } = props;
  // avoid mutating values
  let labels = label ? label : initLabels;
  formProps.preventDefault();

  // validate schema
  const { isValidated, errors } = validateForm({ values, schema, labels });
  // save file uploads on a form data
  const formData = new FormData();
  for (let idx = 0; idx < Object.keys(values).length; idx++) {
    const value = Object.values(values)[idx];
    const key = Object.keys(values)[idx];
    formData.append(key, value);
  }
  return { formData, isValidated, errors };
};
