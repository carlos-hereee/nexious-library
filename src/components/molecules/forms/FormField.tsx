import { Button } from "@nxs-atoms";
import type { FormFieldProps } from "nxs-form";
import { IconButton } from "@nxs-molecules";
import Field from "./Field";

const FormField = (props: FormFieldProps) => {
  // key variables
  const { name, isEntry, entries, entry, activeEntry } = props;
  const { fieldHeading, onMultiplyClick, onRemovalClick, fieldId, setActiveEntry } = props;

  if (isEntry && entry && activeEntry && entries && setActiveEntry) {
    const targetEntry = entries[activeEntry];
    const targetList = Object.keys(entries);
    const activeIdx = targetList.findIndex((s) => s === activeEntry);

    const handleToggleClick = (target: string) => {
      const tGroupName = entries[target][0].groupName;
      if (tGroupName) setActiveEntry({ [tGroupName]: target });
    };
    return (
      <div className="container" id={fieldId}>
        {entry.max && entry.max > 0 && (
          <div className="button-container">
            {Array.from(Array(entry.max), (_, n) => n + 1).map((num) => (
              <IconButton
                key={num}
                icon={{ icon: `${num}`, isNum: true }}
                theme={activeIdx === num - 1 ? "btn-active highlight" : "highlight"}
                isDisable={targetList.length < num}
                onClick={() => handleToggleClick(targetList[num - 1])}
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
