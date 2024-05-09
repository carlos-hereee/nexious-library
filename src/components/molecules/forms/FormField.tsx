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
    const { groupName, onMultiply, canMultiply, canRemove } = entries[activeEntry][0];
    const targetList = Object.keys(entries);
    const activeIdx = targetList.findIndex((s) => s === activeEntry);
    // require key variable
    if (!groupName) throw Error("groupName is required");
    if (!onMultiply) throw Error("onMultiply is required");
    if (!canMultiply) throw Error("canMultiply is required");
    if (!canRemove) throw Error("canRemove is required");

    const handleSelect = (selectedFile: File | string, idx: number) => {
      const { handleHeroEntryChange } = props;
      // require key variable
      if (!handleHeroEntryChange) throw Error("handleHeroEntryChange is required");
      // const { groupName, sharedKey } = targetEntry[0];
      console.log("targetEntry :>> ", targetEntry[idx]);
      // targetEntry[idx].value = selectedFile;

      // handleHeroEntryChange({
      //   ...entries,
      //   [groupName]: { ...entries[groupName], [sharedKey]: fieldEntry },
      // });
      // const { groupName, sharedKey } = oldValues[idx];
      // if (groupName && sharedKey) {
      //   // const entry = entries[groupName][sharedKey];
      //   console.log("entry :>> ", entry);
      //   // const groupName =
      //   console.log("idx, selectedFile :>> ", selectedFile);
      //   console.log("entries :>> ");
      // }
      console.log("selectedFile :>> ", selectedFile);
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
                onClick={() => setActiveEntry({ [groupName]: targetList[num - 1] })}
              />
            ))}
          </div>
        )}
        {targetEntry.map((p, idx) => (
          <Field key={p.fieldId} {...props} {...p} handleHeroChange={(e) => handleSelect(e, idx)} />
        ))}
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
              <Button
                label={onMultiply?.additionLabel}
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
