import type { InputCheckBoxProps } from "nxs-form";
import { getLinks } from "@nxs-utils/app/getLinks";
import { Hyperlink } from "@nxs-atoms";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import Label from "./Label";

const InputCheckbox = (props: InputCheckBoxProps) => {
  const { value, onChange, name, theme, hideLabel, label, error, formMessage, isDisabled, populateLink } = props;

  return (
    <div className="container">
      {/* Single error node carrying the id the checkbox references; role="alert" announces it. */}
      {error && (
        <span className="required" id={`${name}-error`} role="alert">
          {error}
        </span>
      )}
      <div className="input-checkbox ">
        <input
          className={theme}
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
    </div>
  );
};
export default InputCheckbox;
