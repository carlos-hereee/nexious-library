import { labels } from "@nxs-atoms/forms/labels";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { Button, Icon } from "@nxs-atoms/index";
import { useState } from "react";

type AuthFieldProp = {
  label: string;
  value: { [key: string]: string };
  errors?: { [key: string]: string };
  onChange: (key: any) => void;
};
const AuthField: React.FC<AuthFieldProp> = (props) => {
  const { label, value, onChange, errors } = props;
  const [seePassword, setSeePassword] = useState(false);

  return (
    <div className="flex-row">
      <label htmlFor={label} className="label flex-1">
        {labels[label]}:
        {errors && errors[label] && <span>{errors[label]}</span>}
      </label>
      <div className="flex-row flex-2">
        <input
          type={seePassword ? "password" : "text"}
          className="input"
          autoComplete="on"
          name={label}
          value={value[label]}
          placeholder={placeholders[label]}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
        <Button name="secondary" click={() => setSeePassword(!seePassword)}>
          {seePassword ? <Icon icon="eyeSlash" /> : <Icon icon="eye" />}
        </Button>
      </div>
    </div>
  );
};
export default AuthField;
