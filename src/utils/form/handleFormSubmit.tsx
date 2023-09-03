import { KeyStringProp } from "@nxs-utils/helpers/types";
import { validateForm } from "./validateForm";

type HandleFormSubmitProps = {
  formProps: React.FormEvent<HTMLFormElement>;
  values: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<KeyStringProp>>;
  onSubmit: () => void;
};
export const handleFormSubmit = (props: HandleFormSubmitProps) => {
  const { formProps, values, setErrors, onSubmit } = props;
  formProps.preventDefault();
  const { isValidated, errors } = validateForm(values);
  isValidated ? onSubmit() : setErrors(errors);
  // const tips = checkPasswordStrength(credentials);
  //   tips.strength <= 2
  //     ? setTips(tips)
  //     : onSubmit({ username, oldPassword, newPassword });
  // } else onSubmit({ username, oldPassword, newPassword });
};
