import { useFormValidation } from "../hooks/useFormValidation";

type HandleFormSubmitProps = {
  values: { [key: string]: any };
  schema: { required: string[] };
  label?: { [key: string]: string };
};
export const handleFormSubmit = (props: HandleFormSubmitProps) => {
  const { schema, label, values } = props;
  // validate schema
  return useFormValidation({ values, schema, label });
};
