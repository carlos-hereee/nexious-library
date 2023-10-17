import { useState } from "react";
import { ErrorMessage } from "@nxs-atoms";
import { useValues } from "@nxs-utils/hooks/useFormValues";
import { ErrorMessages, SubmitButton } from "@nxs-molecules";
import { objLength, objToArray } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { FormFieldValues, FormProps, SelectFileProp, SubmitPayload } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";
import { KeyStringProp } from "custom-props";
import { uniqueId } from "@nxs-utils/data/uniqueId";
import CancelButton from "@nxs-atoms/buttons/CancelButton";

const Form: React.FC<FormProps> = (props) => {
  // props
  const { labels, placeholders, types, schema, formName, heading, hideSubmit } = props;
  const { addEntry, selectList, fieldHeading, hideLabels, withFileUpload } = props;
  const { onSubmit, onChange, onCancel, initialValues, theme, submitLabel } = props;
  // must have required props
  const required = { initialValues, onSubmit };
  const { lightColor, errors, setLightColor, setErrors } = useRequiredProps(required, true);
  // key variables
  const valuePayload = { initialValues, labels, types, placeholders, addEntry };
  const { values, setValues, formatEntry } = useValues(valuePayload);
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);

  const addNewEntry = (name: string, oldValues: FormFieldValues[], originIdx: number) => {
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
    // addTouched(key);
    // key variables
    const value = event.currentTarget.value;
    let oldValues = [...values];
    oldValues[idx].value = value;
    setValues(oldValues);
    if (onChange) onChange(oldValues);
  };
  const handleCheckbox = (event: any, field: FormFieldValues, idx: number) => {
    const { name } = field;
    // addTouched(key);
    // key variables
    const isChecked: boolean = event.currentTarget.checked;
    // update values
    let oldValues = [...values];
    oldValues[idx].value = isChecked;
    // const total = values.length;
    // if the checkbox is checked add entries
    if (isChecked) addNewEntry(name, oldValues, idx);
    else {
      // when button is unchecked removed all field created by checkbox
      const removalList = oldValues.filter((val) => val.groupName !== name);
      setValues(removalList);
    }
  };
  const handleSelection = (value: string, name: string) => {
    addTouched(name);
    setValues({ ...values, [name]: value });
    setSelection({ [name]: value });
  };
  const addTouched = (key: string) => {
    if (!touchSchema.includes(key)) setTouchSchema((prev) => [...prev, key]);
  };
  const handleSubmit = (formProps: React.FormEvent<HTMLFormElement>) => {
    formProps.preventDefault();
    if (withFileUpload) {
    } else {
      let payload: { [key: string]: SubmitPayload } = {};
      const uniqueGroups: { [key: string]: string[] } = {};
      values.forEach((val) => {
        const { group, sharedKey, name, value, groupName } = val;
        // check if value is part of a group
        if (group && sharedKey && !uniqueGroups[group]?.includes(sharedKey)) {
          const groupPayload = { value, name, sharedKey, group, groupName };
          // check if the group has not been checked
          if (uniqueGroups[group] && !uniqueGroups[group].includes(sharedKey)) {
            // if not checked add to uniqueGroups; create new instance
            uniqueGroups[group] = [...uniqueGroups[group], sharedKey];
          }
          payload[group].group?.push(groupPayload);
          // otherwise its not part of a group
        } else payload[name] = { value, name };
      });
      if (schema) {
        const errors = validateForm({ values, schema });
        objLength(errors) > 0 ? setFormErrors(errors) : onSubmit(payload);
      } else onSubmit(payload);
    }
  };
  const handleMultiplyClick = (e: FormFieldValues, fieldIndex: number) => {
    const groupName = e.groupName || e.onMultiply?.name || e.name;
    // move button to last appropriate field
    let oldValues = [...values];
    oldValues[fieldIndex].canMultiply = false;
    // if form has an entry value
    addNewEntry(groupName, oldValues, fieldIndex);
  };
  const handleRemovalClick = (e: FormFieldValues, idx: number) => {
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

  const handleHeroChange = (selectedFile: SelectFileProp) => {
    const name = selectedFile.name;
    let oldValues = [...values];
    const valIdx = oldValues.findIndex((ov) => ov.name === name);
    oldValues[valIdx].value = selectedFile;
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
      {values.map((value, keyIdx) => {
        return (
          <FormField
            key={keyIdx}
            name={value.name}
            type={value.type}
            value={value.value}
            placeholder={value.placeholder}
            hideLabels={hideLabels}
            selected={selection[keyIdx]}
            selectList={selectList}
            label={value.label}
            formError={formErrors && formErrors[keyIdx]}
            handleChange={(e) => handleChange(e, keyIdx)}
            handleCheckbox={(e) => handleCheckbox(e, value, keyIdx)}
            updateSelection={(e) => handleSelection(e.target.value, value.name)}
            handleHeroChange={(e) => handleHeroChange(e)}
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
