import { useState } from "react";
import { Field, AuthField } from "@nxs-molecules";
import { Icon } from "@nxs-atoms";
import { validateForm } from "@nxs-utils/form/validateForm";
import PasswordChecker from "@nxs-molecules/forms/PasswordChecker";
import { checkPasswordStrength } from "@nxs-utils/form/checkPasswordStrength";

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
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [err, setErr] = useState<{ [key: string]: string }>();
  const [tips, setTips] = useState<any>();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const cred = { username, oldPassword, newPassword, confirmNewPassword };
    const { isValidated, errors } = validateForm(cred);
    if (!isValidated) {
      setErr(errors);
    } else if (showAuthTips) {
      const tips = checkPasswordStrength(newPassword);
      tips.strength <= 2
        ? setTips(tips)
        : onSubmit({ username, oldPassword, newPassword });
    } else onSubmit({ username, oldPassword, newPassword });
  };
  return (
    <div className="container">
      <h2 className="heading">Change password</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="form-secondary" onSubmit={handleSubmit}>
        <Field
          value={{ username }}
          label="username"
          onChange={setUsername}
          errors={err}
        />
        <AuthField
          value={{ oldPassword }}
          label="oldPassword"
          onChange={setOldPassword}
          errors={err}
        />
        <AuthField
          value={{ newPassword }}
          label="newPassword"
          onChange={setNewPassword}
          errors={err}
        />
        <AuthField
          value={{ confirmNewPassword }}
          label="confirmNewPassword"
          onChange={setConfirmNewPassword}
          errors={err}
        />
        {tips ? (
          <PasswordChecker
            ease={tips.ease}
            tips={tips.tips}
            submit={() => onSubmit({ username, oldPassword, newPassword })}
          />
        ) : (
          <div className="flex-center">
            <button type="submit" className="btn-main">
              <Icon icon="submit" />
              Confirm
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
export default ChangePassword;
