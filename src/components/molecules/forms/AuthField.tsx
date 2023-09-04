import { Input } from "@nxs-atoms";
import { useSeePassword } from "@nxs-utils/hooks/useSeePassword";
import { IconButton } from "@nxs-molecules";

type AuthFieldProp = {
  name: string;
  value: string;
  onChange: (key: any) => void;
};
const AuthField: React.FC<AuthFieldProp> = (props) => {
  const { value, onChange, name } = props;
  const { seePassword, togglePassword } = useSeePassword();

  return (
    <div className="flex-row">
      <Input
        value={value}
        change={onChange}
        name={name}
        type={seePassword[name] ? "text" : "password"}
        theme="password"
      />
      <IconButton
        icon={{ icon: seePassword[name] ? "eyeSlash" : "eye" }}
        theme="btn-main btn-small"
        click={() => togglePassword(name)}
      />
    </div>
  );
};
export default AuthField;
