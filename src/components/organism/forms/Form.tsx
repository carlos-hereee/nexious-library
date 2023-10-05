import { useState } from "react";
import { ErrorMessage } from "@nxs-atoms";
import { useValues } from "@nxs-utils/hooks/useFormValues";
import { ErrorMessages, SubmitButton } from "@nxs-molecules";
import { objLength, objToArray } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";
import { useRequiredProps } from "@nxs-utils/hooks/useRequiredProps";
import { EntryDataProps, FormFieldValues, FormProps } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";
import { KeyStringProp } from "custom-props";

const Form: React.FC<FormProps> = (props) => {
  // props
  const { onSubmit, onChange, initialValues, hideLabels, theme, submitLabel } = props;
  const { labels, placeholders, types, schema, formName, heading, hideSubmit } = props;
  const { addEntry, selectList } = props;
  // must have required props
  const required = { initialValues, onSubmit };
  const { lightColor, errors, setLightColor, setErrors } = useRequiredProps(required, true);
  // key variables
  const { values, setValues, addEntries } = useValues({
    initialValues,
    labels,
    types,
    placeholders,
  });
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);

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
    // if form has an entry value
    if (addEntry && addEntry[name]) {
      const entryValues = objToArray(addEntry[name].initialValues);
      // const total = values.length;
      // if the checkbox is checked add entries to form values is true
      if (isChecked) {
        const { fieldHeading, labels, types, placeholders, canMultiply } = addEntry[name];
        const { additionLabel, removalLabel } = addEntry[name];
        // require key variables
        if (!removalLabel || !additionLabel) {
          const value = additionLabel ? removalLabel : additionLabel;
          const key = additionLabel ? "removalLabel" : "additionLabel";
          setLightColor("red");
          setErrors((prev) => [
            ...prev,
            { prop: key, code: "missingProps", isAProp: true, value, key },
          ]);
        }
        const entryPayload = { values: entryValues, labels, types, placeholders };
        // add properties all entrys should have
        // console.log("name", name);
        let entriesData = addEntries({ ...entryPayload, removalBy: name });
        // set field name on first new instance
        oldValues[idx].fieldHeading = fieldHeading;
        // if additional entries are possible add them here
        entriesData[entriesData.length - 1].canMultiply = canMultiply;
        entriesData[entriesData.length - 1].onMultiply = { additionLabel, name, removalLabel };
        entriesData[entriesData.length - 1].canRemove = true;
        // keep everything together 0 is the number of element to be deleted
        oldValues.splice(idx + 1, 0, ...entriesData);
        setValues(oldValues);
      } else {
        // when button is unchecked removed all field created by checkbox
        const removalList = oldValues.filter((val) => val.removalBy !== name);
        setValues(removalList);
      }
      // otherwise save values
    } else setValues(oldValues);
  };
  console.log("values", values);
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
    if (schema) {
      const errors = validateForm({ values, schema });
      objLength(errors) > 0 ? setFormErrors(errors) : onSubmit(values);
    } else onSubmit(values);
  };
  const handleMultiplyClick = (e: FormFieldValues, idx: number) => {
    const { onMultiply } = e;
    const name = onMultiply?.name ? onMultiply.name : e.name;
    // console.log("name", name);
    // move button and down to last appropriate field
    let oldValues = [...values];
    oldValues[idx].canMultiply = false;
    // if form has an entry value
    if (addEntry && addEntry[name]) {
      const entryValues = objToArray(addEntry[name].initialValues);
      // if the checkbox is checked add entries to form values is true
      const { labels, types, placeholders, canMultiply } = addEntry[name];
      const { additionLabel, removalLabel } = addEntry[name];
      const entryPayload = { values: entryValues, labels, types, placeholders };
      let entriesData = addEntries({ ...entryPayload, removalBy: name });
      // if additional entries are possible add them here
      entriesData[entriesData.length - 1].canMultiply = canMultiply;
      entriesData[entriesData.length - 1].canRemove = true;
      entriesData[entriesData.length - 1].onMultiply = { additionLabel, name, removalLabel };
      oldValues.splice(idx + 1, 0, ...entriesData);
      // entryValues
      setValues(oldValues);
    }
  };
  const handleRemovalClick = (e: FormFieldValues, idx: number) => {
    if (addEntry && e.onMultiply) {
      // find the number of fields to delete
      const name = e.removalBy ? e.removalBy : e.onMultiply.name;
      const numCount = addEntry[name] ? objToArray(addEntry[name].initialValues).length : 1;
      let oldValues = [...values];
      // move button and down to last appropriate field
      if (e.canMultiply) {
        const multiplyProperty = oldValues[idx - numCount].onMultiply;
        // check appropriate field has property onMulitiply and onMulitiply matches name
        if (multiplyProperty && multiplyProperty.name === name) {
          // its part of the same group move button
          oldValues[idx - numCount].canMultiply = true;
          // otherwise its the last field on group; update checkbox
        } else oldValues[idx - numCount].value = false;
      } else oldValues[idx - numCount].value = false;
      // use splice to remove desired field numCount is the number of elements removed
      oldValues.splice(idx - 1, numCount);
      setValues(oldValues);
    }
  };

  if (lightColor === "red") return <ErrorMessages errors={errors} component="Form" />;
  return values ? (
    <form className={theme} onSubmit={handleSubmit}>
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
            fieldHeading={value.fieldHeading}
            onMultiply={value.onMultiply}
            canMultiply={value.canMultiply}
            canRemove={value.canRemove}
            onMultiplyClick={() => handleMultiplyClick(value, keyIdx)}
            onRemovalClick={() => handleRemovalClick(value, keyIdx)}
          />
        );
      })}
      {!hideSubmit && <SubmitButton label={submitLabel} />}
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" error={values} />
  );
};
export default Form;
