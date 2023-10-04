import { useState } from "react";
import { ErrorMessage } from "@nxs-atoms";
import { useValues } from "@nxs-utils/hooks/useFormValues";
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
  // must have required props
  const required = { initialValues, onSubmit };
  const { lightColor, errors } = usePropErrorHandling(required, true);
  // key variables
  const { values, setValues } = useValues({ initialValues, labels, types });
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);
  const [entryData, setEntryData] = useState<{ [key: string]: number[] }[]>([]);
  const [fieldHeading, setFieldHeading] = useState<{ [key: number | string]: string }>(
    {}
  );
  const [placeholder, setPlaceholder] = useState(
    objLength(placeholders) ? placeholders : initPlaceholders
  );

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
  const handleCheckbox = (event: any) => {
    // addTouched(key);
    // key variables
    const key: string = event.target.name;
    const value: boolean = event.currentTarget.checked;
    // find checkbox index
    const idx = values.findIndex((v) => Object.keys(v)[0] === key);
    let oldValues = [...values];
    oldValues[idx] = { [idx]: { [key]: value } };
    // if form has an entry value
    if (addEntry && addEntry[key]) {
      const entryValues = objToArray(addEntry[key].initialValues);
      const total = values.length;
      if (value) {
        // get index of entry values
        const extraData = entryValues.map((v, idx) => total + idx);
        setFieldHeading({ ...fieldHeading, [extraData[0]]: addEntry[key].fieldHeading });
        setEntryData((prev) => [...prev, { [key]: extraData }]);
        setValues([...oldValues, { [key]: entryValues }]);
        // setLabel({ ...label, [key]: addEntry[key].labels });
        setPlaceholder({ ...placeholder, ...addEntry[key].placeholders });
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

  if (lightColor === "red") return <ErrorMessages errors={errors} component="Form" />;
  return values ? (
    <form className={theme} onSubmit={handleSubmit}>
      {heading && <h2 className="heading">{heading}</h2>}
      {values.map((value, keyIdx) => {
        const fieldValues = value[keyIdx];
        return (
          <FormField
            key={keyIdx}
            name={fieldValues.name}
            type={fieldValues.type}
            value={value[keyIdx].value}
            placeholder={fieldValues.placeholder}
            hideLabels={hideLabels}
            selected={selection[keyIdx]}
            selectList={selectList}
            label={fieldValues.label}
            formError={formErrors && formErrors[keyIdx]}
            handleChange={handleChange}
            handleCheckbox={(e) => handleCheckbox(e)}
            updateSelection={(e) => updateSelection(e.target.value, fieldValues.name)}
            fieldHeading={fieldHeading[keyIdx]}
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
