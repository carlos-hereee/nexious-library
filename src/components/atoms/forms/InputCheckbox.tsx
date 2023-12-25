import type { InputCheckBoxProps } from "nxs-form";
import { getLinks } from "@nxs-utils/app/getLinks";
import { Hyperlink } from "@nxs-atoms";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import Label from "./Label";

const InputCheckbox = (props: InputCheckBoxProps) => {
  const {
    value,
    onChange,
    name,
    theme,
    hideLabel,
    label,
    error,
    formMessage,
    isDisabled,
    populateLink,
  } = props;

  return (
    <div className="input-checkbox">
      <input
        className={theme}
        name={name}
        type="checkbox"
        disabled={isDisabled}
        checked={value}
        onChange={onChange}
        // give lavels a reason to be there give inputs id
        id={name}
      />
      {!hideLabel &&
        label &&
        (populateLink ? (
          <label htmlFor={name}>
            {getLinks(populateLink, label).map((link) => (
              <Hyperlink
                data={link.data}
                isLink={link.isLink}
                link={link.link}
                key={uniqueId()}
              />
            ))}
          </label>
        ) : (
          <Label name={name} label={label} errors={error} message={formMessage} />
        ))}
    </div>
  );
};
export default InputCheckbox;
