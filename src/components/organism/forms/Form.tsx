import { useState } from "react";
import { ErrorMessage } from "@nxs-atoms";
import { useValues } from "@nxs-utils/hooks/useFormValues";
import { ErrorMessages, SubmitButton } from "@nxs-molecules";
import { objLength, objToArray } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
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
  const { lightColor, errors } = usePropErrorHandling(required, true);
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
  const [entryData, setEntryData] = useState<EntryDataProps[]>([]);

  const handleChange = (event: any) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.value;
    // const payload = { ...values, [key]: value };
    const idx = values.findIndex((v) => Object.keys(v)[0] === key);
    let oldValues = [...values];
    oldValues[idx] = { ...oldValues[idx], [key]: value };
    setValues(oldValues);
    // addTouched(key);
    if (onChange) onChange(oldValues);
  };
  const handleCheckbox = (event: any, name: string, idx: number) => {
    // addTouched(key);
    // key variables
    const isChecked: boolean = event.currentTarget.checked;
    // update values
    let oldValues = [...values];
    oldValues[idx].value = isChecked;
    // if form has an entry value
    if (addEntry && addEntry[name]) {
      const entryValues = objToArray(addEntry[name].initialValues);
      const total = values.length;
      // if the checkbox is checked add entries to form values is true
      if (isChecked) {
        const { fieldHeading, labels, types, placeholders, canMultiply, additionLabel } =
          addEntry[name];
        let entriesData = addEntries({ values: entryValues, labels, types, placeholders });
        // set field name on first new instance
        entriesData[0].fieldHeading = fieldHeading;
        // if additional entries are possible add them here
        entriesData[entriesData.length - 1].canMultiply = canMultiply;
        entriesData[entriesData.length - 1].onMultiply = { label: additionLabel, name };
        // get index of entry values
        const extraData = entryValues.map((v, idx) => {
          let value = total + idx;
          if (idx === 0) return { fieldHeading, value, name };
          return { value, name };
        });
        // entryValues
        setEntryData((prev) => [...prev, ...extraData]);
        setValues([...oldValues, ...entriesData]);
      } else {
        // // remove entry data if checkbox is unclicked
        const removalList = entryData.filter((data) => data.name === name);
        const removedData = values.filter((v, idx) => {
          let isLeftAlone = true;
          removalList.forEach((data) => {
            // check index and name if they match removel list
            if (data.value === idx && data.name === name) isLeftAlone = false;
          });
          return isLeftAlone;
        });
        setValues(removedData);
      }
      // otherwise save values
    } else setValues(oldValues);
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
      const total = values.length;
      // if the checkbox is checked add entries to form values is true
      const { labels, types, placeholders, canMultiply, additionLabel } = addEntry[name];
      let entriesData = addEntries({ values: entryValues, labels, types, placeholders });
      // if additional entries are possible add them here
      entriesData[entriesData.length - 1].canMultiply = canMultiply;
      entriesData[entriesData.length - 1].onMultiply = { label: additionLabel, name };
      // get index of entry values
      const extraData = entryValues.map((v, idx) => ({ value: total + idx, name }));
      // entryValues
      setEntryData((prev) => [...prev, ...extraData]);
      setValues([...oldValues, ...entriesData]);
    }
  };
  console.log("values", values);

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
            handleChange={handleChange}
            handleCheckbox={(e) => handleCheckbox(e, value.name, keyIdx)}
            updateSelection={(e) => handleSelection(e.target.value, value.name)}
            fieldHeading={value.fieldHeading}
            canMultiply={value.canMultiply}
            onMultiply={value.onMultiply}
            onMultiplyClick={() => handleMultiplyClick(value, keyIdx)}
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
