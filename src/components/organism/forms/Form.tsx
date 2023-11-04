import { useEffect, useState } from "react";
import { ErrorMessage } from "@nxs-atoms";
import { useValues } from "@nxs-utils/hooks/useFormValues";
import { ErrorMessages, SubmitButton } from "@nxs-molecules";
import { objToArray } from "@nxs-utils/app/objLength";
import { useFormValidation } from "@nxs-utils/hooks/useFormValidation";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { FieldValueProps, FormProps } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";
import { KeyStringProp } from "custom-props";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import CancelButton from "@nxs-atoms/buttons/CancelButton";
import { formatFilesData, formatFormData } from "@nxs-utils/form/formatForm";

const Form: React.FC<FormProps> = (props) => {
  // props
  const { labels, placeholders, types, responseError, heading, hideSubmit } = props;
  const { addEntry, fieldHeading, hideLabels, withFileUpload, dataList } = props;
  const { onSubmit, onChange, onCancel, initialValues, theme, submitLabel, schema } = props;
  // init schema
  // must have required props
  const reqProps = { initialValues, onSubmit };
  const { lightColor, errors, setLightColor, setErrors } = useRequiredProps(reqProps, true);
  const {
    formErrors,
    validationStatus,
    checkRequired,
    validateForm,
    setStatus,
    checkUniqueness,
    formMessage,
  } = useFormValidation({ ...schema, labels });
  // key variables
  const valuePayload = { initialValues, labels, types, placeholders, addEntry };
  const { values, setValues, formatEntry } = useValues(valuePayload);
  const [selection, setSelection] = useState<KeyStringProp>({});

  useEffect(() => {
    if (validationStatus === "green") {
      withFileUpload ? onSubmit(formatFilesData(values)) : onSubmit(formatFormData(values));
      setStatus("red");
    }
  }, [validationStatus]);

  const addNewEntry = (name: string, oldValues: FieldValueProps[]) => {
    // if form has an entry value
    if (addEntry && addEntry[name]) {
      const entryValues = objToArray(addEntry[name].initialValues);
      const { labels, types, placeholders, canMultiply, skipIfFalse } = addEntry[name];
      const { additionLabel, removalLabel } = addEntry[name];
      // require key variables
      if (!removalLabel || !additionLabel) {
        const value = additionLabel ? removalLabel : additionLabel;
        const key = additionLabel ? "removalLabel" : "additionLabel";
        setLightColor("red");
        setErrors((prev) => [
          ...prev,
          { prop: key, code: "missingProps", isAProp: true, value, name: key },
        ]);
      }
      // add properties all entrys should have
      const groupName = name;
      const group = skipIfFalse;
      const payload = { formatValues: entryValues, labels, types, placeholders, groupName };
      // if additional entries are possible add them here
      let entriesData = formatEntry({ ...payload, group, sharedKey: uniqueId() });
      entriesData[entriesData.length - 1].canMultiply = canMultiply;
      entriesData[entriesData.length - 1].canRemove = true;
      entriesData[entriesData.length - 1].onMultiply = {
        additionLabel,
        name: group,
        removalLabel,
      };
      const newIdx = oldValues.findIndex((d) => d.name === groupName);
      const numCount = oldValues.filter((d) => d.groupName === groupName);
      // keep everything together; 0 is the number of element to be deleted
      oldValues.splice(newIdx + numCount.length + 1, 0, ...entriesData);
      setValues(oldValues);
    }
    // otherwise save values
    else setValues(oldValues);
  };
  const handleChange = (event: any, idx: number) => {
    // key variables
    const value = event.currentTarget.value;
    let oldValues = [...values];
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
  const handleCheckbox = (event: any, field: FieldValueProps, idx: number) => {
    const { name } = field;
    // addTouched(key);
    // key variables
    const isChecked: boolean = event.currentTarget.checked;
    // update values
    let oldValues = [...values];
    oldValues[idx].value = isChecked;
    // const total = values.length;
    // if the checkbox is checked add entries
    if (isChecked) addNewEntry(name, oldValues);
    else {
      // when button is unchecked removed all field created by checkbox
      const removalList = oldValues.filter((val) => val.groupName !== name);
      setValues(removalList);
    }
  };
  const handleSelection = (target: string, name: string, idx: number) => {
    let oldValues = [...values];
    oldValues[idx].value = target;
    setValues(oldValues);
    setSelection({ [name]: target });
  };

  const handleSubmit = (formProps: React.FormEvent<HTMLFormElement>) => {
    formProps.preventDefault();
    // check validation status to contine
    if (validationStatus === "red") validateForm(values);
  };
  const handleMultiplyClick = (e: FieldValueProps, fieldIndex: number) => {
    const groupName = e.groupName || e.onMultiply?.name || e.name;
    // move button to last appropriate field
    let oldValues = [...values];
    oldValues[fieldIndex].canMultiply = false;
    // if form has an entry value
    addNewEntry(groupName, oldValues);
  };
  const handleRemovalClick = (e: FieldValueProps, idx: number) => {
    if (addEntry && e.onMultiply) {
      // find the number of fields to delete
      const groupName = e.groupName ? e.groupName : e.onMultiply.name;
      if (addEntry[groupName]) {
        const numCount = objToArray(addEntry[groupName].initialValues).length;
        const groupList = values.filter((val) => val.groupName === groupName);
        const neglectedKeys = groupList.filter((list) => list.sharedKey !== e.sharedKey);
        let oldValues = [...values];
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
    let oldValues = [...values];
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
    let oldValues = [...values];
    oldValues[idx].value = value;
    if (onChange) onChange(oldValues);
    setValues(oldValues);
  };
  if (lightColor === "red") return <ErrorMessages errors={errors} component="Form" />;
  return values ? (
    <form
      className={theme}
      onSubmit={handleSubmit}
      encType={withFileUpload ? "multipart/form-data" : undefined}
    >
      {heading && <h2 className="heading">{heading}</h2>}
      {responseError && <p className="error-message">{responseError}</p>}
      {values.map((value, keyIdx) => {
        return (
          <FormField
            key={keyIdx}
            name={value.name}
            type={value.type}
            value={value.value}
            theme={theme}
            placeholder={value.placeholder}
            hideLabels={hideLabels}
            selected={selection[value.name]}
            dataList={dataList?.[value.name]}
            label={value.label}
            changeDataList={(e) => handleChangeDataList(e, keyIdx)}
            formError={formErrors[value.name]}
            formMessage={formMessage[value.name]}
            handleChange={(e) => handleChange(e, keyIdx)}
            handleCheckbox={(e) => handleCheckbox(e, value, keyIdx)}
            updateSelection={(e) => handleSelection(e, value.name, keyIdx)}
            handleHeroChange={(e) => handleHeroChange(keyIdx, e)}
            fieldHeading={fieldHeading}
            onMultiply={value.onMultiply}
            canMultiply={value.canMultiply}
            canRemove={value.canRemove}
            onMultiplyClick={() => handleMultiplyClick(value, keyIdx)}
            onRemovalClick={() => handleRemovalClick(value, keyIdx)}
          />
        );
      })}
      <div className="flex-row">
        {onCancel && <CancelButton onClick={onCancel} />}
        {!hideSubmit && <SubmitButton label={submitLabel} />}
      </div>
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" error={values} />
  );
};
export default Form;
