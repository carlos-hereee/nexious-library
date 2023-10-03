import { ErrorMessage, InputCheckbox } from "@nxs-atoms";
import { auth, select } from "@nxs-utils/form/types";
import { textarea } from "@nxs-utils/form/types";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, ErrorMessages, Field } from "@nxs-molecules";
import { Select, SubmitButton, TextArea } from "@nxs-molecules";
import { useState } from "react";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { initLabels } from "@nxs-utils/form/labels";
import { objLength } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";
import { initPlaceholders } from "@nxs-utils/form/placeholders";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { FormProps } from "nxs-form";
import FormField from "@nxs-molecules/forms/FormField";

// import { themeList } from "@nxs-utils/app/themeList";
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
  // const [label, setLabel] = useState(objLength(labels) ? labels : initLabels);
  // const [placeholder, setPlaceholder] = useState(
  //   objLength(placeholders) ? placeholders : initPlaceholders
  // );
  const label = objLength(labels) ? labels : initLabels;
  const placeholder = objLength(placeholders) ? placeholders : initPlaceholders;
  // const type = objLength(types) && types;

  // console.log("types", type);

  const handleChange = (event: any) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.value;
    const payload = { ...values, [key]: value };
    setValues(payload);
    addTouched(key);
    if (onChange) onChange(payload);
  };
  const handleCheckbox = (event: any) => {
    // key variables
    const key: string = event.target.name;
    const value = event.currentTarget.checked;
    addTouched(key);
    setValues({ ...values, [key]: value });
    // if form has an entry value
    // if (addEntry && addEntry[key]) {
    //   // let
    //   setTypes({ ...label, ...addEntry[key].types });
    //   setPlaceholder({ ...label, ...addEntry[key].placeholders });
    //   setLabel({ ...label, ...addEntry[key].labels });
    //   setValues({ ...values, ...addEntry[key].initialValues });
    // }
  };
  console.log("values", values);
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
  // {values[v] &&addEntry && addEntry[v] &&
  // <Field
  // name={}
  // />}
  if (lightColor === "red") return <ErrorMessages errors={errors} component="Form" />;
  return values ? (
    <form className={theme} onSubmit={handleSubmit}>
      {heading && <h2 className="heading">{heading}</h2>}
      {Object.keys(values).map((v) => (
        <FormField
          key={v}
          name={v}
          type={types && types[v] ? types[v] : "text" || "text"}
          value={values[v]}
          placeholder={placeholder ? placeholder[v] : initPlaceholders[v]}
          hideLabels={hideLabels}
          label={labels && labels[v] ? labels[v] : initLabels[v]}
          formError={formErrors && formErrors[v]}
          handleChange={handleChange}
          handleCheckbox={(e) => handleCheckbox(e)}
          updateSelection={(e) => updateSelection(e.target.value, v)}
        />
      ))}
      {!hideSubmit && <SubmitButton label={submitLabel} />}
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" error={values} />
  );
};
export default Form;
