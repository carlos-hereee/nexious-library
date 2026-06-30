import { Button, ButtonCancel } from "@nxs-atoms";
import type { FormFieldProps } from "nxs-form";
import { IconButton, Loading } from "@nxs-molecules";
import Field from "./Field";

const FormField = (props: FormFieldProps) => {
  // key variables
  const { fieldHeading, name, isEntry, entries, entry, fieldId } = props;

  if (isEntry && entry && entries) {
    const { activeEntry, confirmRemoval } = props;
    const { onMultiplyClick, handleChange, onRemovalClick, setActiveEntry, setConfirmRemovals } = props;
    // Degrade gracefully instead of throwing. A throw on the render path crashes the whole
    // consumer subtree (the library ships no error boundary), so a missing entry config
    // would white-screen the form. This mirrors the deliberate fix in Form.tsx (a throw was
    // replaced with console.error + bail) and the existing `return <Loading />` two lines down.
    if (!activeEntry) {
      console.error("FormField: activeEntry is required for entry/multiply fields");
      return <Loading />;
    }
    const targetEntry = entries[activeEntry];
    if (!entries[activeEntry]) return <Loading />;
    const { groupName, onMultiply, canMultiply, canRemove } = entries[activeEntry][0];
    const targetList = Object.keys(entries);
    const activeIdx = targetList.findIndex((s) => s === activeEntry);
    // groupName drives the entry switcher and removal callbacks; without it the group cannot
    // render, so bail to the loading state rather than throw.
    if (!groupName) {
      console.error("FormField: groupName is required for entry/multiply fields");
      return <Loading />;
    }
    // onMultiply / canMultiply / canRemove are optional capabilities — the JSX below already
    // guards on each ({onMultiply && ...}, {canMultiply && ...}, {canRemove && ...}), so a
    // missing or false value simply hides that control. No throw needed.

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
                onClick={() => setActiveEntry && setActiveEntry({ [groupName]: targetList[num - 1] })}
              />
            ))}
          </div>
        )}
        {targetEntry.map((p) => (
          <Field key={p.fieldId} {...props} {...p} handleChange={(e) => handleChange && handleChange(e, p.fieldId)} />
        ))}
        {onMultiply && (
          <div className="buttons-container">
            {canRemove && onRemovalClick && (
              <ButtonCancel
                label={onMultiply.removalLabel}
                confirmSubmit={confirmRemoval}
                toggleLabel="Don't show again"
                onSubmit={() => onRemovalClick(groupName, activeIdx)}
                onClick={() => setConfirmRemovals && setConfirmRemovals(!confirmRemoval)}
              />
            )}
            {canMultiply && (
              <Button
                label={onMultiply.additionLabel}
                isDisable={targetList.length === entry.max}
                title={targetList.length === entry.max ? "No more allowed" : "Add another"}
                onClick={onMultiplyClick}
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
