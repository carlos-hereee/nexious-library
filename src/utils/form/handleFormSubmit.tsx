import { KeyStringProp } from "@nxs-utils/helpers/types";
import { validateForm } from "./validateForm";

type HandleFormSubmitProps = {
  formProps: React.FormEvent<HTMLFormElement>;
  values: { [key: string]: any };
  setErrors: React.Dispatch<React.SetStateAction<KeyStringProp>>;
  onSubmit: (key: any) => void;
  schema?: { [key: string]: any };
  mediaValues?: { name: string; file: any }[];
};
export const handleFormSubmit = (props: HandleFormSubmitProps) => {
  const { formProps, setErrors, onSubmit, schema } = props;
  let { values, mediaValues } = props;

  formProps.preventDefault();
  // validate schema
  if (schema?.requireAllFields) {
    const { isValidated, errors } = validateForm(values, schema);
    !isValidated && setErrors(errors);
  }
  // let payload = values;
  if (mediaValues) {
    mediaValues.forEach((media) => {
      if (!values[media.name]) values[media.name] = media;
    });
  }
  // add media name for uploading files to db
  return onSubmit(values);
};
