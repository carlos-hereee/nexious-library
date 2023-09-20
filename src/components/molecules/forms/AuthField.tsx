import { Input, Label } from "@nxs-atoms";
import { useSeePassword } from "@nxs-utils/hooks/useSeePassword";
import { IconButton } from "@nxs-molecules";
import { initPlaceholders } from "@nxs-utils/form/placeholders";
import { objLength } from "@nxs-utils/app/objLength";

type AuthFieldProp = {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
  hideLabels?: boolean;
  labels?: string;
  errors?: string;
};
const AuthField: React.FC<AuthFieldProp> = (props) => {
  const { value, onChange, name, placeholder } = props;
  const { hideLabels, labels, errors } = props;
  const { seePassword, togglePassword } = useSeePassword();
  const placeholders = placeholder ? placeholder : initPlaceholders[name];
  return (
    <>
      {!hideLabels && <Label name={name} label={labels} errors={errors} />}
      <div className="flex-row">
        <Input
          value={value}
          onChange={onChange}
          name={name}
          type={seePassword[name] ? "text" : "password"}
          placeholder={placeholders}
          theme="highlight password"
        />
        <IconButton
          icon={{ icon: seePassword[name] ? "eyeSlash" : "eye" }}
          theme="btn-main btn-small highlight"
          onClick={() => togglePassword(name)}
        />
      </div>
    </>
  );
};
export default AuthField;
