import { KeyStringProp } from "@nxs-utils/helpers/types";
import { validateForm } from "./validateForm";

type HandleFormSubmitProps = {
  formProps: React.FormEvent<HTMLFormElement>;
  values: { [key: string]: any };
  setErrors: React.Dispatch<React.SetStateAction<KeyStringProp>>;
  onSubmit: (key: any) => void;
  schema?: { [key: string]: any };
};
export const handleFormSubmit = (props: HandleFormSubmitProps) => {
  const { formProps, setErrors, onSubmit, schema } = props;
  const { values } = props;
  // avoid mutating values
  let payload = values;
  formProps.preventDefault();

  // validate schema
  if (schema?.requireAllFields) {
    const { isValidated, errors } = validateForm(payload, schema);
    !isValidated && setErrors(errors);
  }
  // save file uploads on a form data
  const formData = new FormData();
  for (let idx = 0; idx < Object.keys(values).length; idx++) {
    const value = Object.values(values)[idx];
    const key = Object.keys(values)[idx];
    formData.append(key, value);
  }

  return onSubmit(formData);
};
