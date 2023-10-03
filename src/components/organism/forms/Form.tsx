import { useState } from "react";
import { ErrorMessage } from "@nxs-atoms";
import { useValues } from "@nxs-utils/hooks/useValues";
import { ErrorMessages, SubmitButton } from "@nxs-molecules";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { initLabels } from "@nxs-utils/form/labels";
import { objLength, objToArray } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";
import { initPlaceholders } from "@nxs-utils/form/placeholders";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { FormProps } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";

const Form: React.FC<FormProps> = (props) => {
  // props
  const { onSubmit, onChange, initialValues, hideLabels, theme, submitLabel } = props;
  const { labels, placeholders, types, schema, formName, heading, hideSubmit } = props;
  const { addEntry, selectList } = props;
  const { values, setValues } = useValues(initialValues);
  // must have required props
  const required = { initialValues, onSubmit };
  const { lightColor, errors } = usePropErrorHandling(required, true);
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);
  const [entryData, setEntryData] = useState<{ [key: string]: number[] }[]>([]);
  const label = objLength(labels) ? labels : initLabels;
  const placeholder = objLength(placeholders) ? placeholders : initPlaceholders;

  const handleChange = (event: any) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.value;
    const payload = { ...values, [key]: value };
    setValues(payload);
    // addTouched(key);
    if (onChange) onChange(payload);
  };
  const handleCheckbox = (event: any) => {
    // addTouched(key);
    // key variables
    const key: string = event.target.name;
    const value = event.currentTarget.checked;
    // find checkbox index
    const idx = values.findIndex((v) => Object.keys(v)[0] === key);
    let oldValues = [...values];
    oldValues[idx] = { [key]: value };
    // if form has an entry value
    if (addEntry && addEntry[key]) {
      const entryValues = objToArray(addEntry[key].initialValues);
      const total = values.length;
      if (value) {
        // get entry values
        const extraData = entryValues.map((v, idx) => total + idx);
        setEntryData((prev) => [...prev, { [key]: extraData }]);
        setValues([...oldValues, ...entryValues]);
      } else {
        const entryIdxs = entryData.findIndex((data) => Object.keys(data)[0] === key);
        const removeIdxs = entryData[entryIdxs][key];
        const newData = values.filter((i, idx) => !removeIdxs.includes(idx));
        setValues(newData);
      }
    }
  };
  console.log("values", values);
  // console.log("values", values);
  const updateSelection = (value: string, name: string) => {
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
      const errors = validateForm({ values, schema, label });
      objLength(errors) > 0 ? setFormErrors(errors) : onSubmit(values);
    } else onSubmit(values);
  };
  const initEntry = () => {
    // incase of data mutations add empty form data
    if (addEntry) {
      // const payload = clearFormEntry(addEntry.initialValues);
      // setAllValues((prev) => [...prev, payload]);
    }
  };
  // {values[name] &&addEntry && addEntry[name] &&
  // <Field
  // name={}
  // />}
  if (lightColor === "red") return <ErrorMessages errors={errors} component="Form" />;
  return values ? (
    <form className={theme} onSubmit={handleSubmit}>
      {heading && <h2 className="heading">{heading}</h2>}
      {values.map((v, idx) => {
        const name = Object.keys(v)[0];
        return (
          <FormField
            key={idx}
            name={name}
            type={(types && types[name]) || "text"}
            value={values[idx][name]}
            placeholder={placeholder ? placeholder[name] : initPlaceholders[name]}
            hideLabels={hideLabels}
            selected={selection[name]}
            selectList={selectList}
            label={labels && labels[name] ? labels[name] : initLabels[name]}
            formError={formErrors && formErrors[name]}
            handleChange={handleChange}
            handleCheckbox={(e) => handleCheckbox(e)}
            updateSelection={(e) => updateSelection(e.target.value, name)}
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
