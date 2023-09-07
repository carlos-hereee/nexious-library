import { KeyStringProp } from "@nxs-utils/helpers/types";
import { validateForm } from "./validateForm";

type HandleFormSubmitProps = {
  formProps: React.FormEvent<HTMLFormElement>;
  values: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<KeyStringProp>>;
  onSubmit: (key: any) => void;
  schema?: { [key: string]: any };
};
export const handleFormSubmit = (props: HandleFormSubmitProps) => {
  const { formProps, values, setErrors, onSubmit, schema } = props;

  formProps.preventDefault();
  if (schema?.requireAllFields) {
    const { isValidated, errors } = validateForm(values, schema);
    isValidated ? onSubmit(values) : setErrors(errors);
  } else onSubmit(values);
};
