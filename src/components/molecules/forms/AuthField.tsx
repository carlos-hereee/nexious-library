import { Input, Label } from "@nxs-atoms";
import { useSeePassword } from "@nxs-utils/hooks/useSeePassword";
import { initPlaceholders } from "@nxs-utils/form/placeholders";
import type { AuthFieldProp } from "nxs-form";
import { IconButton } from "@nxs-molecules";
import { buildControlClass } from "../../../@types/Variant";

// The show or hide password toggle is an icon only secondary nxs-btn square (2026-11 item 337),
// composed as a class string because IconButton takes its look that way. The legacy btn-main,
// btn-small and highlight hooks stay beside it until 2026-11 item 339.
const PASSWORD_TOGGLE_CLASS = buildControlClass({
  variant: "secondary",
  className: "nxs-btn-icon btn-main btn-small highlight",
});

const AuthField = (props: AuthFieldProp) => {
  const { value, onChange, name, placeholder, formMessage, labels, error } = props;
  const { hideLabels, isDisabled } = props;
  const { seePassword, togglePassword } = useSeePassword();

  const placeholders = placeholder || initPlaceholders[name];
  return (
    <>
      {!hideLabels && labels && <Label name={name} label={labels} error={error} message={formMessage} />}
      <div className="flex-g">
        <Input
          value={value}
          onChange={onChange}
          name={name}
          isDisabled={isDisabled}
          type={seePassword[name] ? "text" : "password"}
          placeholder={placeholders}
          className="highlight password"
          error={error}
        />
        <IconButton
          icon={{ icon: seePassword[name] ? "eyeSlash" : "eye" }}
          className={PASSWORD_TOGGLE_CLASS}
          onClick={() => togglePassword(name)}
          aria-label={seePassword[name] ? "Hide password" : "Show password"}
        />
      </div>
    </>
  );
};
export default AuthField;
