import { KeyStringProp } from "@nxs-utils/helpers/types";
import { validateForm } from "./validateForm";

type HandleFormChangeProps = {
  values: { [key: string]: string };
  touched: string[];
  setErrors: React.Dispatch<React.SetStateAction<KeyStringProp>>;
  setValues: React.Dispatch<React.SetStateAction<KeyStringProp>>;
  event: any;
};

export const handleFormChange = (props: HandleFormChangeProps) => {
  const { setErrors, setValues, values, touched, event } = props;
  // key variables
  const key = event.target.name;
  const value = event.currentTarget.value;
  const payload = { ...values, [key]: value };
  // validate touched
  const validate: KeyStringProp = {};
  Object.keys(payload).forEach((p) => {
    if (touched.includes(p) || p === key) {
      validate[key] = value;
    }
  });
  const { isValidated, errors } = validateForm(validate);
  !isValidated && setErrors(errors);
  setValues(payload);
};
