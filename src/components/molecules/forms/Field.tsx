import type { FormFieldProps } from "nxs-form";
import { auth } from "@nxs-utils/form/types";
import { AuthField } from "@nxs-molecules";
import FieldShell from "./FieldShell";
import { fieldRegistry, renderDefaultField } from "./fieldRegistry";

/**
 * Dispatches a field config to the control that renders it.
 *
 * This was a thirteen branch nested ternary. The behavior is unchanged; the shape is now a
 * lookup, so adding a type is one entry in fieldRegistry rather than an edit in the middle of a
 * chain. Every branch renders inside the same FieldShell, which is what makes a form read as one
 * component instead of nine.
 */
const Field: React.FC<FormFieldProps> = (props) => {
  const { type, name, value, handleChange, placeholder, hideLabels, label } = props;
  const { formError, disableForm, formMessage } = props;

  // Auth fields dispatch on the field NAME, not its type, so this stays a pre-check ahead of the
  // registry. Folding it into the type map would route a password field by its type and silently
  // lose the show/hide toggle and the password-manager wiring.
  if (auth.includes(name)) {
    return (
      <FieldShell name={name} label={label} hideLabel={hideLabels} error={formError} message={formMessage}>
        <AuthField
          name={name}
          value={value as string}
          onChange={handleChange}
          placeholder={placeholder}
          hideLabels
          error={formError}
          isDisabled={disableForm}
        />
      </FieldShell>
    );
  }

  const render = fieldRegistry[type] || renderDefaultField;
  return render(props);
};
export default Field;
