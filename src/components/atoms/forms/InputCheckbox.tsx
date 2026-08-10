import type { InputCheckBoxProps } from "nxs-form";
import { getLinks } from "@nxs-utils/app/getLinks";
import { Hyperlink } from "@nxs-atoms";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import Label from "./Label";

const InputCheckbox = (props: InputCheckBoxProps) => {
  const { value, onChange, name, className, hideLabel, label, error, formMessage, isDisabled, populateLink } = props;

  return (
    // field-shell so a checkbox stacks and spaces like every other field. It keeps rendering its
    // own error node rather than deferring to a FieldShell wrapper, because its label sits BESIDE
    // the control instead of above it, and because it is exported for standalone use where no
    // shell exists. One node, one `${name}-error` id, no duplicate for aria to be ambiguous about.
    <div className="field-shell">
      <div className="input-checkbox ">
        <input
          className={className}
          name={name}
          type="checkbox"
          disabled={isDisabled}
          checked={value}
          onChange={onChange}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          // give lavels a reason to be there give inputs id
          id={name}
        />
        {!hideLabel &&
          label &&
          (populateLink ? (
            <label htmlFor={name}>
              {getLinks(populateLink, label).map((link) => (
                <Hyperlink data={link.data} isLink={link.isLink} link={link.link} key={uniqueId()} />
              ))}
            </label>
          ) : (
            // error is rendered once above (with the describedby id); not repeated on the Label.
            <Label name={name} label={label} message={formMessage} />
          ))}
      </div>
      {/* After the control, matching every other field. role="alert" announces it, and the id is
          what the checkbox's aria-describedby points at. */}
      {error && (
        <span className="required field-error" id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
export default InputCheckbox;
