import { useEffect, useState } from "react";
import { useValues } from "@nxs-utils/hooks/useFormValues";
import { DownArrow, IconButton, SubmitButton, UpArrow } from "@nxs-molecules";
// import { objToArray } from "@nxs-utils/app/objLength";
import { useFormValidation } from "@nxs-utils/hooks/useFormValidation";
import type { FieldValueProps, FormInitialValue, FormProps } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";
import ButtonCancel from "@nxs-atoms/buttons/ButtonCancel";
import { formatFieldEntry, formatInitialFormValues } from "@nxs-utils/form/formatForm";
import {
  formatFilesData,
  formatFilesEntryData,
  formatFormData,
  formatFormEntryData,
  formatPreviewData,
} from "@nxs-utils/form/handleFormSubmit";
import type { OnchangeProps } from "custom-props";
import { ErrorMessage } from "@nxs-atoms";
import { scrollInDirection, scrollToError } from "@nxs-utils/app/scrollToElement";
import { useScroll } from "@nxs-utils/hooks/useScroll";
import type { CardinalDirectionProps } from "nxs-typography";

const Form: React.FC<FormProps> = (props: FormProps) => {
  const { labels, placeholders, types, responseError, heading, hideSubmit, clearSelection, populateLink } = props;
  const { addEntry, fieldHeading, hideLabels, withFileUpload, dataList, previewLabel, theme, entries } = props;
  const { initialValues, submitLabel, schema, disableForm, cancelLabel, formScroll, confirmRemovals } = props;
  const { onChange, onCancel, onSubmit, onViewPreview } = props;
  const { formErrors, validationStatus, validateForm, setStatus, formMessage } = useFormValidation({
    ...schema,
  });

  // key variables
  const { values, entryValues, activeEntry, setValues, setEntries, addNewEntry, setActiveEntry, addExtraEntry } =
    useValues();
  const { direction, setDirection, showScroll, watchElement } = useScroll();
  const [confirmRemoval, setConfirmRemovals] = useState<boolean>(confirmRemovals || true);

  // console.log("activeEntry :>> ", activeEntry);
  useEffect(() => {
    if (initialValues) {
      const formatValues = formatInitialFormValues(initialValues);
      const oldValues = formatFieldEntry({ formatValues, labels, types, placeholders });
      // add entry values if any
      if (addEntry && entries) addExtraEntry({ oldValues, addEntry, entries });
      setValues(oldValues);
    }
    if (formScroll) watchElement("form-field-container", { height: 900 });
  }, []);

  useEffect(() => {
    if (validationStatus === "green") {
      // require key variable
      if (!onSubmit) throw Error("onSubmit is required");
      // submit regular form
      if (!withFileUpload && !addEntry) onSubmit(formatFormData(values));
      // submit regular form with entry values
      if (!withFileUpload && addEntry) onSubmit(formatFormEntryData(values));
      // submit form with file uploads
      if (withFileUpload && !addEntry) onSubmit(formatFilesData(values, new FormData()));
      // submit form with file uploads and entry values
      if (withFileUpload && addEntry) onSubmit(formatFilesEntryData(values, entryValues));
      // reset form submit
      setStatus(null);
    }
    if (validationStatus === "preview") {
      if (onViewPreview) onViewPreview(formatPreviewData(values));
      setStatus(null);
    }
    // scroll to error if validation failed
    if (validationStatus === "error") scrollToError(formErrors);
  }, [validationStatus]);

  const handleEntryChange = (target: FormInitialValue, groupName: string, id: string) => {
    // find field key
    const entryKey = activeEntry[groupName];
    // update field value
    const entryField = entryValues[groupName][entryKey];
    const idx = entryField.findIndex((val) => val.fieldId === id);
    if (entryField[idx]) {
      entryField[idx].value = target;
      setEntries({ ...entryValues, [groupName]: { ...entryValues[groupName], [entryKey]: entryField } });
    }
  };
  const handleChange = (field: FieldValueProps, target: FormInitialValue, id: string) => {
    const { groupName, sharedKey } = field;
    if (entryValues && groupName && sharedKey) handleEntryChange(target, groupName, id);
    else {
      const oldValues = [...values];
      const idx = oldValues.findIndex((val) => val.fieldId === id);
      oldValues[idx].value = target;
      // check schema if value is required for validation
      if (validationStatus === "error") validateForm(oldValues);
      if (onChange) onChange(oldValues[idx].value);
      setValues(oldValues);
    }
  };
  const handleCheckbox = (event: OnchangeProps, field: FieldValueProps, idx: number) => {
    const { name } = field;
    // key variables
    const isChecked: boolean = event.currentTarget.checked;
    // update values
    const oldValues = [...values];
    oldValues[idx].value = isChecked;
    // if the checkbox is checked add entries
    if (isChecked && addEntry) {
      const fieldEntry = addNewEntry({ addEntry: addEntry[name], group: name });
      const { groupName, sharedKey } = fieldEntry[0];
      if (groupName && sharedKey) {
        const newIdx = oldValues.findIndex((d) => d.name === name);
        const numCount = oldValues.filter((d) => d.groupName === groupName);
        // keep everything together; 0 is the number of element to be deleted
        oldValues.splice(newIdx + numCount.length + 1, 0, fieldEntry[0]);
        setEntries({ ...entryValues, [groupName]: { [sharedKey]: fieldEntry } });
      }
      setValues(oldValues);
    } else if (!addEntry) setValues(oldValues);
    else {
      // TODO: ADD SCHEMA REMOVAL CONFIRMATION
      const removalTarget = addEntry[name].groupName;
      // when button is unchecked removed all field created by checkbox
      const removalList = oldValues.filter((val) => val.groupName !== removalTarget);
      setValues(removalList);
    }
  };

  const handleSubmit = (formProps: React.FormEvent<HTMLFormElement>) => {
    formProps.preventDefault();
    // check validation status to contine
    if (validationStatus === "error" || !validationStatus) validateForm(values, "green");
    if (validationStatus === "validated") validateForm(values, "green");
  };
  const handleMultiplyClick = (e: FieldValueProps) => {
    if (addEntry && e.group) {
      const fieldEntry = addNewEntry({ addEntry: addEntry[e.group], group: e.group });
      const { groupName, sharedKey } = fieldEntry[0];
      if (groupName && sharedKey) {
        // // add new entry to list
        if (entryValues[groupName]) {
          setEntries({
            ...entryValues,
            [groupName]: { ...entryValues[groupName], [sharedKey]: fieldEntry },
          });
        } else setEntries({ ...entryValues, [groupName]: { [sharedKey]: fieldEntry } });
      }
    }
  };

  const handleHeroChange = (idx: number, selectedFile: File | string) => {
    const oldValues = [...values];
    if (selectedFile) {
      oldValues[idx].value = selectedFile;
      // // check schema if value is required for validation
      if (validationStatus === "error") validateForm(oldValues);
      setValues(oldValues);
    } else {
      oldValues[idx].value = "";
      setValues(oldValues);
    }
  };
  const handleChangeDataList = (value: string, idx: number) => {
    const oldValues = [...values];
    oldValues[idx].value = value;
    if (onChange) onChange(oldValues[idx].value);
    setValues(oldValues);
  };
  const handleViewPreview = () => {
    if (!validationStatus) validateForm(values);
    if (validationStatus === "error") validateForm(values);
  };

  const handleScroll = (target: CardinalDirectionProps) => {
    setDirection(target);
    scrollInDirection("form-field-container", target);
  };
  const handleCountChange = (target: string, idx: number) => {
    const oldValues = [...values];
    oldValues[idx].value = parseInt(target, 10);
    setValues(oldValues);
    if (onChange) onChange(oldValues[idx].value);
  };

  const handleRemovalClick = (groupName: string, idx: number) => {
    // find field key
    const entryKey = activeEntry[groupName];
    const fieldEntry = entryValues[groupName][entryKey];
    // remove field
    delete entryValues[groupName][entryKey];
    // if it was the only entry in list
    if (Object.keys(entryValues[groupName]).length === 0) {
      const { group } = fieldEntry[0];
      // update group origin value
      const valuesIdx = values.findIndex((val) => val.name === group);
      values[valuesIdx].value = false;
      //   remove group
      const removedField = values.filter((val) => val.group !== group);
      setValues(removedField);
    } else {
      // update active entry
      const entryList = Object.keys(entryValues[groupName]);
      if (entryList[idx]) setActiveEntry({ [groupName]: entryList[idx] });
      else setActiveEntry({ [groupName]: entryList[idx - 1] });
    }
    // lastly update entries
    setEntries({ ...entryValues, [groupName]: { ...entryValues[groupName] } });
  };
  if (!initialValues) return <ErrorMessage error={{ code: "missingInitialValues", prop: "form", value: values }} />;

  return (
    <form className={theme} onSubmit={handleSubmit} encType={withFileUpload ? "multipart/form-data" : undefined}>
      {heading && <h2 className="heading">{heading}</h2>}
      {responseError && <p className="error-message">{responseError}</p>}
      <div className={formScroll ? "form-field-container" : "form-field-container no-scroll"} id="form-field-container">
        {showScroll.up && <UpArrow onClick={() => handleScroll("up")} active={direction} />}
        {showScroll.down && <DownArrow onClick={() => handleScroll("down")} active={direction} />}
        {values.map((field, keyIdx) => (
          <FormField
            key={field.fieldId}
            fieldId={field.fieldId}
            name={field.name}
            type={field.type}
            value={field.value}
            isEntry={!!(addEntry && field.group && addEntry[field.group])}
            entry={addEntry && addEntry[field.group || ""]}
            entries={entryValues[field.groupName || ""]}
            activeEntry={activeEntry[field.groupName || ""]}
            theme={theme}
            placeholder={field.placeholder}
            hideLabels={hideLabels}
            confirmRemoval={confirmRemoval}
            populateLink={populateLink?.[field.name]}
            dataList={dataList}
            label={field.label}
            changeDataList={(e: string) => handleChangeDataList(e, keyIdx)}
            formError={formErrors[field.fieldId]}
            formMessage={formMessage[field.name]}
            handleChange={(value: FormInitialValue, id?: string) => handleChange(field, value, id || field.fieldId)}
            handleCountChange={(target: string) => handleCountChange(target, keyIdx)}
            handleCheckbox={(e: OnchangeProps) => handleCheckbox(e, field, keyIdx)}
            handleHeroChange={(e: string | File) => handleHeroChange(keyIdx, e)}
            fieldHeading={fieldHeading}
            countSchema={schema?.count}
            canMultiply={field.canMultiply}
            clearSelection={clearSelection}
            disableForm={disableForm}
            onMultiplyClick={() => handleMultiplyClick(field)}
            onRemovalClick={handleRemovalClick}
            setActiveEntry={(n) => setActiveEntry({ ...activeEntry, ...n })}
            setConfirmRemovals={(confirm: boolean) => setConfirmRemovals(confirm)}
          />
        ))}
      </div>
      {onCancel || onViewPreview ? (
        <div className="buttons-container">
          {onCancel && <ButtonCancel onClick={onCancel} theme="btn-main" label={cancelLabel} />}
          {!hideSubmit && <SubmitButton label={submitLabel} isDisable={disableForm} />}
          {onViewPreview && (
            <IconButton icon={{ icon: "eye", label: previewLabel }} theme="btn-main" onClick={handleViewPreview} />
          )}
        </div>
      ) : (
        !hideSubmit && <SubmitButton label={submitLabel} isDisable={disableForm} theme="form-submit-btn" />
      )}
    </form>
  );
};
export default Form;
