import { KeyStringProp } from "@nxs-utils/helpers/types";
import { validateForm } from "./validateForm";
import { initLabels } from "./labels";

type HandleFormChangeProps = {
  values: { [key: string]: string };
  touched: string[];
  event: any;
  schema?: { required: string[] };
  label?: { [key: string]: string };
};

export const handleFormChange = (props: HandleFormChangeProps) => {
  const { values, touched, event, schema, label } = props;
  // key variables
  const key = event.target.name;
  const value = event.currentTarget.value;
  // const payload = { ...values, [key]: value };
  let labels = label ? label : initLabels;
  // validate touched
  const validate: KeyStringProp = {};
  Object.keys(values).forEach((p) => {
    if (touched.includes(p) || p === key) {
      validate[key] = value;
    }
  });
  const { isValidated, errors } = validateForm({ values, schema, labels });
  return { isValidated, errors };
};
