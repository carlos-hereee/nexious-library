import { useState } from "react";
import { Field, AuthField } from "@nxs-molecules";
import { Button, Icon } from "@nxs-atoms";
import {
  checkPasswordStrength,
  validateForm,
} from "@nxs-utils/form/validateForm";
import { usePasswordTips } from "@nxs-utils/useTips";

type ChangePasswordProps = {
  values: { [key: string]: string };
  error: string;
  onSubmit: (e: any) => void;
  showAuthTips?: boolean;
};
const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  const { values, error, onSubmit, showAuthTips } = props;
  const [username, setUsername] = useState(values.username || "");
  const [oldPassword, setOldPassword] = useState(values.password || "");
  const [newPassword, setNewPassword] = useState("");
  const [err, setErr] = useState<{ [key: string]: string }>();
  const [tips, setTips] = useState<any>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const cred = { username, oldPassword, newPassword };
    const { isValidated, errors } = validateForm(cred);
    if (showAuthTips) {
      const tips = checkPasswordStrength(newPassword);
      setTips(tips);
    }
    console.log("errors", errors, isValidated);
    isValidated
      ? onSubmit({ username, oldPassword, newPassword })
      : setErr(errors);
  };
  return (
    <div className="container">
      <h2 className="heading">Change password</h2>
      {error && <p className="error-message">{error}</p>}
      <Field
        value={{ username }}
        label="username"
        onChange={setUsername}
        errors={err}
      />
      <AuthField
        value={{ password: oldPassword }}
        label="oldPassword"
        onChange={setOldPassword}
        errors={err}
      />
      <AuthField
        value={{ password: newPassword }}
        label="newPassword"
        onChange={setNewPassword}
        errors={err}
      />
      <div className="flex-center">
        <button type="button" className="btn btn-main" onClick={handleSubmit}>
          <Icon icon="submit" />
          Confirm
        </button>
      </div>
    </div>
  );
};
export default ChangePassword;
