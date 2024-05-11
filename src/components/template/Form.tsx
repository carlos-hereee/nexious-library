import { useEffect, useState, type ChangeEvent } from "react";
import { useValues } from "@nxs-utils/hooks/useFormValues";
import { DownArrow, IconButton, SubmitButton, UpArrow } from "@nxs-molecules";
import { objToArray } from "@nxs-utils/app/objLength";
import { useFormValidation } from "@nxs-utils/hooks/useFormValidation";
import type { FieldValueProps, FormProps } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";
import ButtonCancel from "@nxs-atoms/buttons/ButtonCancel";
import {
  formatFieldEntry,
  formatFilesData,
  formatFormData,
  formatFormEntryData,
  formatInitialFormValues,
  formatPreviewData,
} from "@nxs-utils/form/formatForm";
import type { OnchangeProps } from "custom-props";
import { ErrorMessage } from "@nxs-atoms";
import { scrollInDirection } from "@nxs-utils/app/scrollToElement";
import { useScroll } from "@nxs-utils/hooks/useScroll";
import type { CardinalDirectionProps } from "nxs-typography";

const Form: React.FC<FormProps> = (props: FormProps) => {
  const { labels, placeholders, types, responseError, heading, hideSubmit, clearSelection, populateLink } = props;
  const { addEntry, fieldHeading, hideLabels, withFileUpload, dataList, previewLabel, countSchema, theme } = props;
  const { initialValues, submitLabel, schema, disableForm, cancelLabel, formScroll, confirmRemovals } = props;
  const { onChange, onCancel, onSubmit, onViewPreview } = props;
  const { formErrors, validationStatus, checkRequired, validateForm, setStatus, checkUniqueness, formMessage } =
    useFormValidation({ ...schema });

  // key variables
  const { values, entries, activeEntry, setValues, setEntries, addNewEntry, addExtraEntry, setActiveEntry } =
    useValues();
  const { direction, setDirection, showScroll, watchElement } = useScroll();
  const [confirmRemoval, setConfirmRemovals] = useState<boolean>(confirmRemovals || true);

  useEffect(() => {
    if (initialValues) {
      const formatValues = formatInitialFormValues(initialValues);
      let oldValues = formatFieldEntry({ formatValues, labels, types, placeholders });
      // clear prev values if any; avoid redundant data
      if (addEntry) {
        const entryData = objToArray(addEntry);
        for (let entryIdx = 0; entryIdx < entryData.length; entryIdx += 1) {
          const target = Object.keys(entryData[entryIdx])[0];
          const current = addEntry[target];
          // check if checkbox is checked
          if (initialValues[target]) addExtraEntry({ addEntry: current, target, oldValues });
          else oldValues = oldValues.filter((val) => val.name !== current.groupName);
        }
      }
      setValues(oldValues);
    }
    if (formScroll) watchElement("form-field-container", { height: 900 });
  }, []);

  useEffect(() => {
    if (validationStatus === "green") {
      if (!onSubmit) setStatus("red");
      else if (withFileUpload) onSubmit(formatFilesData(values));
      else if (addEntry) onSubmit(formatFormEntryData(values));
      else onSubmit(formatFormData(values));
      setStatus(null);
    }
    if (validationStatus === "yellow") {
      if (onViewPreview) {
        onViewPreview(formatPreviewData(values));
        setStatus(null);
      }
    }
  }, [validationStatus]);

  const handleChange = (event: OnchangeProps, idx: number) => {
    // key variables
    const { value } = event.currentTarget;
    const oldValues = [...values];
    oldValues[idx].value = value;
    // check schema if value is required for validation
    if (validationStatus === "red" || !validationStatus) {
      const current = values[idx].fieldId;
      // check required first and then uniqueness
      checkRequired(oldValues[idx], current);
      checkUniqueness(oldValues[idx], current);
    }
    if (onChange) onChange(oldValues);
    setValues(oldValues);
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
      const entry = addNewEntry({ addEntry: addEntry[name], group: name });
      const newIdx = oldValues.findIndex((d) => d.name === name);
      const numCount = oldValues.filter((d) => d.groupName === addEntry[name].groupName);
      // keep everything together; 0 is the number of element to be deleted
      oldValues.splice(newIdx + numCount.length + 1, 0, ...entry);
      setValues(oldValues);
      // setValues(addNewEntry({ addEntry: addEntry[name], target: name, oldValues }));
    } else if (!addEntry) setValues(oldValues);
    else {
      const removalTarget = addEntry[name].groupName;
      // when button is unchecked removed all field created by checkbox
      const removalList = oldValues.filter((val) => val.groupName !== removalTarget);
      setValues(removalList);
    }
  };
  const handleSelection = (target: string, idx: number) => {
    const oldValues = [...values];
    oldValues[idx].value = target;
    setValues(oldValues);
  };
  const handleSubmit = (formProps: React.FormEvent<HTMLFormElement>) => {
    formProps.preventDefault();
    // check validation status to contine
    if (validationStatus === "red" || !validationStatus) validateForm(values);
  };
  const handleMultiplyClick = (e: FieldValueProps) => {
    if (addEntry && e.group) {
      addNewEntry({ addEntry: addEntry[e.group], group: e.group });
    }
  };

  const handleHeroChange = (idx: number, selectedFile: File | string) => {
    const oldValues = [...values];
    if (selectedFile) {
      const current = oldValues[idx].fieldId;
      oldValues[idx].value = selectedFile;
      // // check schema if value is required for validation
      if (validationStatus === "red" || !validationStatus) checkRequired(oldValues[idx], current);
      setValues(oldValues);
    } else {
      oldValues[idx].value = "";
      setValues(oldValues);
    }
  };
  const handleChangeDataList = (value: string, idx: number) => {
    const oldValues = [...values];
    oldValues[idx].value = value;
    if (onChange) onChange(oldValues);
    setValues(oldValues);
  };
  const handleViewPreview = () => {
    if (!validationStatus) validateForm(values);
    if (validationStatus === "red") validateForm(values);
  };

  const handleScroll = (target: CardinalDirectionProps) => {
    setDirection(target);
    scrollInDirection("form-field-container", target);
  };
  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const { value } = e.target;
    const oldValues = [...values];
    oldValues[idx].value = parseInt(value, 10);
    setValues(oldValues);
    if (onChange) onChange(oldValues[idx].value);
  };
  const handleHeroEntryChange = (selectedFile: File | string, groupName: string, idx: number) => {
    // find field key
    const entryKey = activeEntry[groupName];
    // update field value
    const entryField = entries[groupName][entryKey];
    entryField[idx].value = selectedFile;
    setEntries({ ...entries, [groupName]: { ...entries[groupName], [entryKey]: entryField } });
  };
  const handleRemovalClick = (groupName: string, idx: number) => {
    // find field key
    const entryKey = activeEntry[groupName];
    const fieldEntry = entries[groupName][entryKey];
    // remove field
    delete entries[groupName][entryKey];
    // if it was the only entry in list
    if (Object.keys(entries[groupName]).length === 0) {
      const { group } = fieldEntry[0];
      // update group origin value
      const valuesIdx = values.findIndex((val) => val.name === group);
      values[valuesIdx].value = false;
      //   remove group
      const removedField = values.filter((val) => val.group !== group);
      setValues(removedField);
    } else {
      // update active entry
      const entryList = Object.keys(entries[groupName]);
      if (entryList[idx]) setActiveEntry({ [groupName]: entryList[idx] });
      else setActiveEntry({ [groupName]: entryList[idx - 1] });
    }
    // lastly update entries
    setEntries({ ...entries, [groupName]: { ...entries[groupName] } });
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
            entries={entries[field.groupName || ""]}
            activeEntry={activeEntry[field.groupName || ""]}
            theme={theme}
            placeholder={field.placeholder}
            hideLabels={hideLabels}
            confirmRemoval={confirmRemoval}
            populateLink={populateLink?.[field.name]}
            dataList={dataList?.[field.name]}
            label={field.label}
            changeDataList={(e: string) => handleChangeDataList(e, keyIdx)}
            formError={formErrors[field.fieldId]}
            formMessage={formMessage[field.name]}
            handleChange={(e: OnchangeProps) => handleChange(e, keyIdx)}
            handleCountChange={(e: ChangeEvent<HTMLInputElement>) => handleCountChange(e, keyIdx)}
            handleCheckbox={(e: OnchangeProps) => handleCheckbox(e, field, keyIdx)}
            updateSelection={(e: string) => handleSelection(e, keyIdx)}
            handleHeroChange={(e: string | File) => handleHeroChange(keyIdx, e)}
            fieldHeading={fieldHeading}
            countSchema={countSchema}
            canMultiply={field.canMultiply}
            clearSelection={clearSelection?.[field.name]}
            disableForm={disableForm}
            handleHeroEntryChange={handleHeroEntryChange}
            onMultiplyClick={() => handleMultiplyClick(field)}
            onRemovalClick={handleRemovalClick}
            setActiveEntry={setActiveEntry}
            setConfirmRemovals={(confirm: boolean) => setConfirmRemovals(confirm)}
          />
        ))}
      </div>
      {(onCancel || onViewPreview) && onSubmit ? (
        <div className="buttons-container">
          {onCancel && <ButtonCancel onClick={onCancel} theme="btn-main" label={cancelLabel} />}
          {!hideSubmit && <SubmitButton label={submitLabel} isDisable={disableForm} />}
          {onViewPreview && (
            <IconButton icon={{ icon: "eye", label: previewLabel }} theme="btn-main" onClick={handleViewPreview} />
          )}
        </div>
      ) : (
        onSubmit && !hideSubmit && <SubmitButton label={submitLabel} isDisable={disableForm} theme="form-submit-btn" />
      )}
    </form>
  );
};
export default Form;