import { Button } from "@nxs-atoms";
import type { FormFieldProps } from "nxs-form";
import { IconButton } from "@nxs-molecules";
import Field from "./Field";

const FormField = (props: FormFieldProps) => {
  // key variables
  const { disableForm, name, canRemove, isEntry, entries, entry, activeEntry } = props;
  const { fieldHeading, canMultiply, onMultiply, onMultiplyClick, onRemovalClick, fieldId } = props;

  if (isEntry && entry && activeEntry && entries) {
    const activeId = entries.findIndex((e) => e.fieldId === activeEntry.fieldId);
    console.log("activeId :>> ", activeId);
    console.log("entries :>> ", entries);
    console.log("entries :>> ", activeId >= 0 && entries[activeId]);
    console.log("entry:>> ", activeEntry);
    return (
      <div className="container" id={fieldId}>
        {entry.max && entry.max > 0 && (
          <div className="button-container">
            {Array.from(Array(entry.max), (_, n) => n + 1).map((num) => (
              <IconButton
                key={num}
                icon={{ icon: `${num}`, isNum: true }}
                theme={activeId === num - 1 ? "btn-active" : ""}
                isDisable={entries.length < num}
              />
            ))}
          </div>
        )}
        <Field {...props} />
        {onMultiply && (
          <div className="button-container">
            {canRemove && (
              <Button
                label={onMultiply.removalLabel}
                onClick={onRemovalClick}
                // todo add confirmation removal
                theme="btn-cancel"
              />
            )}
            {canMultiply && (
              <Button label={onMultiply?.additionLabel} onClick={onMultiplyClick} isDisable={disableForm} />
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="form-field" id={fieldId}>
      {fieldHeading && fieldHeading[name] && <h3 className="heading">{fieldHeading[name]}</h3>}
      <Field {...props} />
    </div>
  );
};

export default FormField;
