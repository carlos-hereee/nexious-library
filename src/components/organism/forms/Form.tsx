import { useEffect } from "react";
import { useValues } from "@nxs-utils/hooks/useFormValues";
// import { ErrorMessages,  } from "@nxs-molecules";
import { SubmitButton } from "@nxs-molecules";
import { formatInitialFormValues, objToArray } from "@nxs-utils/app/objLength";
import { useFormValidation } from "@nxs-utils/hooks/useFormValidation";
// import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import type { FieldValueProps, FormProps } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";
import CancelButton from "@nxs-atoms/buttons/CancelButton";
import {
  formatFilesData,
  formatFormData,
  formatPreviewData,
} from "@nxs-utils/form/formatForm";
import type { OnchangeProps } from "custom-props";
import { Button, ErrorMessage } from "@nxs-atoms";

const Form: React.FC<FormProps> = (props: FormProps) => {
  const { labels, placeholders, types, responseError, heading, hideSubmit } = props;
  const { addEntry, fieldHeading, hideLabels, withFileUpload, dataList, previewLabel } = props;
  const { initialValues, theme, submitLabel, schema } = props;
  const { onViewPreview, onSubmit, onChange, onCancel } = props;
  // must have required props
  // const { lightColor, errors } = useRequiredProps({ initialValues }, true);

  const {
    formErrors,
    validationStatus,
    checkRequired,
    validateForm,
    setStatus,
    checkUniqueness,
    scrollToError,
    formMessage,
  } = useFormValidation({ ...schema, labels });
  // key variables
  const { values, setValues, formatFieldEntry, addNewEntry, addExtraEntry } = useValues();
  // console.log("values :>> ", values);
  useEffect(() => {
    if (initialValues) {
      const formatValues = formatInitialFormValues(initialValues);
      const oldValues = formatFieldEntry({ formatValues, labels, types, placeholders });
      // clear prev values if any; avoid redundant data
      if (addEntry) {
        const entryData = objToArray(addEntry);
        for (let entryIdx = 0; entryIdx < entryData.length; entryIdx += 1) {
          const target = Object.keys(entryData[entryIdx])[0];
          const current = addEntry[target];
          // check if checkbox is checked
          if (initialValues[target]) addExtraEntry({ addEntry: current, target, oldValues });
        }
      }
      setValues(oldValues);
    }
  }, []);

  useEffect(() => {
    if (validationStatus === "green" && onSubmit) {
      setStatus("red");
      if (withFileUpload) onSubmit(formatFilesData(values));
      else onSubmit(formatFormData(values));
    } else if (validationStatus === "yellow" && onViewPreview) {
      onViewPreview(formatPreviewData(values));
      setStatus(null);
    } else if (validationStatus === "red") scrollToError();
  }, [validationStatus, withFileUpload]);

  const handleChange = (event: OnchangeProps, idx: number) => {
    // key variables
    const { value } = event.currentTarget;
    const oldValues = [...values];
    oldValues[idx].value = value;
    // check schema if value is required for validation
    if (validationStatus === "red") {
      const current = values[idx].name;
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
    if (isChecked) {
      if (addEntry) {
        setValues(addNewEntry({ addEntry: addEntry[name], target: name, oldValues }));
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (addEntry) {
        const removalTarget = addEntry[name].groupName;
        // when button is unchecked removed all field created by checkbox
        const removalList = oldValues.filter((val) => val.groupName !== removalTarget);
        setValues(removalList);
      }
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
    if (validationStatus === "red" || !validationStatus) validateForm(values, "green");
  };
  const handleMultiplyClick = (e: FieldValueProps, fieldIndex: number) => {
    if (addEntry) {
      const name = e.onMultiply?.name || e.name;
      // move button to last appropriate field
      const oldValues = [...values];
      // if form has an entry value
      oldValues[fieldIndex].canMultiply = false;
      setValues(addNewEntry({ addEntry: addEntry[name], target: name, oldValues }));
    }
  };
  const handleRemovalClick = (e: FieldValueProps, idx: number) => {
    if (addEntry && e.onMultiply) {
      // find the number of fields to delete
      const groupName = e.groupName ? e.groupName : e.onMultiply.name;
      if (addEntry[groupName]) {
        const numCount = objToArray(addEntry[groupName].initialValues).length;
        const groupList = values.filter((val) => val.groupName === groupName);
        const neglectedKeys = groupList.filter((list) => list.sharedKey !== e.sharedKey);
        const oldValues = [...values];
        // if where add entry button is stored move button and down to last appropriate field
        if (e.canMultiply) {
          // if theres only been one entry; update checkbox
          if (neglectedKeys.length === 0) oldValues[idx - numCount].value = false;
          // otherwise move new entry button
          else oldValues[idx - numCount].canMultiply = true;
        }
        // get removal list with the get shared key
        const removalList = oldValues.filter((val) => val.sharedKey !== e.sharedKey);
        setValues(removalList);
      }
    }
  };

  const handleHeroChange = (idx: number, selectedFile: File | string) => {
    const oldValues = [...values];
    if (selectedFile) {
      const current = oldValues[idx].name;
      oldValues[idx].value = selectedFile;
      // // check schema if value is required for validation
      if (validationStatus === "red") checkRequired(oldValues[idx], current);
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
    if (!validationStatus) validateForm(values, "yellow");
    if (validationStatus === "red") {
      scrollToError();
      validateForm(values, "yellow");
    }
  };
  // if (lightColor === "red") return <ErrorMessages errors={errors} component="Form" />;
  return values.length > 0 ? (
    <form
      className={theme}
      onSubmit={handleSubmit}
      encType={withFileUpload ? "multipart/form-data" : undefined}
    >
      {heading && <h2 className="heading">{heading}</h2>}
      {responseError && <p className="error-message">{responseError}</p>}
      {values.map((field, keyIdx) => {
        // console.log("field :>> ", field);
        return (
          <FormField
            key={field.fieldId}
            name={field.name}
            type={field.type}
            value={field.value}
            theme={theme}
            placeholder={field.placeholder}
            hideLabels={hideLabels}
            dataList={dataList?.[field.name]}
            label={field.label}
            changeDataList={(e) => handleChangeDataList(e, keyIdx)}
            formError={formErrors[field.name]}
            formMessage={formMessage[field.name]}
            handleChange={(e) => handleChange(e, keyIdx)}
            handleCheckbox={(e) => handleCheckbox(e, field, keyIdx)}
            updateSelection={(e) => handleSelection(e, keyIdx)}
            handleHeroChange={(e) => handleHeroChange(keyIdx, e)}
            fieldHeading={fieldHeading}
            onMultiply={field.onMultiply}
            canMultiply={field.canMultiply}
            canRemove={field.canRemove}
            onMultiplyClick={() => handleMultiplyClick(field, keyIdx)}
            onRemovalClick={() => handleRemovalClick(field, keyIdx)}
          />
        );
      })}
      <div className="form-buttons">
        {onCancel && <CancelButton onClick={onCancel} />}
        {!hideSubmit && onSubmit && <SubmitButton label={submitLabel} />}
        {onViewPreview && <Button label={previewLabel} onClick={handleViewPreview} />}
      </div>
    </form>
  ) : (
    <ErrorMessage error={{ code: "missingFormInitialValues", prop: "form", value: values }} />
  );
};
export default Form;
