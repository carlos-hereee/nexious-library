import { Button } from "@nxs-atoms";
import type { FormFieldProps } from "nxs-form";
import { IconButton } from "@nxs-molecules";
import Field from "./Field";

const FormField = (props: FormFieldProps) => {
  // key variables
  const { name, isEntry, entries, entry, activeEntry } = props;
  const { fieldHeading, onMultiplyClick, onRemovalClick, fieldId } = props;

  if (isEntry && entry && activeEntry && entries) {
    const targetEntry = entries[activeEntry];
    const activeId = 0;
    // console.log("activeId :>> ", activeId);
    console.log("targetEntry :>> ", targetEntry);
    console.log("entries :>> ", entries);
    // console.log("entries :>> ", activeId >= 0 && entries[activeId]);
    console.log("activeId :>> ", activeEntry);
    return (
      <div className="container" id={fieldId}>
        {entry.max && entry.max > 0 && (
          <div className="button-container">
            {Array.from(Array(entry.max), (_, n) => n + 1).map((num) => (
              <IconButton
                key={num}
                icon={{ icon: `${num}`, isNum: true }}
                theme={activeId === num - 1 ? "btn-active" : ""}
                // isDisable={entries.length < num}
              />
            ))}
          </div>
        )}
        {targetEntry.map((p) => (
          <Field key={p.fieldId} {...props} {...p} />
        ))}
        {targetEntry[0].onMultiply && (
          <div className="button-container">
            {targetEntry[0].canRemove && (
              <Button
                label={targetEntry[0].onMultiply.removalLabel}
                onClick={onRemovalClick}
                // todo add confirmation removal
                theme="btn-cancel"
              />
            )}
            {targetEntry[0].canMultiply && (
              <Button
                label={targetEntry[0].onMultiply?.additionLabel}
                onClick={onMultiplyClick}
                // isDisable={disableForm}
              />
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
