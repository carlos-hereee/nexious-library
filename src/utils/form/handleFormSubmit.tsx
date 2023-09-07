import { KeyStringProp } from "@nxs-utils/helpers/types";
import { validateForm } from "./validateForm";

type HandleFormSubmitProps = {
  formProps: React.FormEvent<HTMLFormElement>;
  values: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<KeyStringProp>>;
  onSubmit: (key: any) => void;
  schema?: { [key: string]: any };
  useMedia?: string;
  mediaValues?: { name: string; file: any }[];
};
export const handleFormSubmit = (props: HandleFormSubmitProps) => {
  const { formProps, setErrors, onSubmit, schema } = props;
  const { values, mediaValues, useMedia } = props;

  formProps.preventDefault();
  // validate schema
  if (schema?.requireAllFields) {
    const { isValidated, errors } = validateForm(values, schema);
    !isValidated && setErrors(errors);
  }
  // add media name for uploading files to db
  return useMedia ? onSubmit({ ...values, ...mediaValues }) : onSubmit(values);
};
