import { Input, Label } from "@nxs-atoms";
import { useSeePassword } from "@nxs-utils/hooks/useSeePassword";
import { IconButton } from "@nxs-molecules";
import { initPlaceholders } from "@nxs-utils/form/placeholders";
import type { AuthFieldProp } from "nxs-form";

const AuthField: React.FC<AuthFieldProp> = (props) => {
  const { value, onChange, name, placeholder, formMessage, labels, errors } = props;
  const { hideLabels } = props;
  const { seePassword, togglePassword } = useSeePassword();

  const placeholders = placeholder ? placeholder : initPlaceholders[name];
  return (
    <>
      {!hideLabels && labels && (
        <Label name={name} label={labels} errors={errors} message={formMessage} />
      )}
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
