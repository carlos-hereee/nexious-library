import { validateForm } from "./validateForm";
import { initLabels } from "./labels";
import { FormMediaProps } from "./types";

type HandleFormSubmitProps = {
  formProps: React.FormEvent<HTMLFormElement>;
  values: { [key: string]: any };
  schema?: { required: string[] };
  label?: { [key: string]: string };
  media: FormMediaProps[];
};
export const handleFormSubmit = (props: HandleFormSubmitProps) => {
  const { formProps, schema, label, values, media } = props;
  // avoid mutating values
  let labels = label ? label : initLabels;
  formProps.preventDefault();

  // validate schema
  const { isValidated, errors } = validateForm({ values, schema, labels });
  /*  
    - save file uploads on a form data
    formData is tricky because values will not show up on your console
    BUT everything is working check data when sending request.
    Everything is there!! 
  */
  const formData = new FormData();
  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });
  media.forEach((m) => {
    formData.set(m.name, m.file, m.file.name);
  });
  return { formData, isValidated, errors };
};
