import { useState } from "react";
import { Field, AuthField } from "@nxs-molecules";
import { Button, Icon } from "@nxs-atoms";
import { validateForm } from "@nxs-utils/form/validateForm";
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
  const [err, setErr] = useState();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { isValidated, errors } = validateForm({
      username,
      oldPassword,
      newPassword,
    });
    if (showAuthTips) {
      setTips(usePasswordTips(newPassword));
    } else {
      isValidated
        ? onSubmit({ username, oldPassword, newPassword })
        : setErr(errors);
    }
  };
  return (
    <div className="container">
      <h2 className="heading">Change password</h2>
      {error && <p className="error-message">{error}</p>}
      <Field value={{ username }} label="username" onChange={setUsername} />
      <AuthField
        value={{ password: oldPassword }}
        label="oldPassword"
        onChange={setOldPassword}
      />
      <AuthField
        value={{ password: newPassword }}
        label="newPassword"
        onChange={setNewPassword}
      />
      <div className="flex-center">
        <Button name="main" click={handleSubmit}>
          <Icon icon="submit" />
          Confirm
        </Button>
      </div>
    </div>
  );
};
export default ChangePassword;
