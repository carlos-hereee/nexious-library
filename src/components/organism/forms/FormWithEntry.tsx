import { Button, ErrorMessage, InputCheckbox } from "@nxs-atoms";
import { auth, select } from "@nxs-utils/form/types";
import { textarea } from "@nxs-utils/form/types";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, ErrorMessages, Field } from "@nxs-molecules";
import { Select, SubmitButton, TextArea } from "@nxs-molecules";
import { themeList } from "@nxs-utils/app/themeList";
import { useState } from "react";
import { FormInitValues, KeyStringProp } from "@nxs-utils/helpers/types";
import { initLabels } from "@nxs-utils/form/labels";
import { objLength } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";
import { initPlaceholders } from "@nxs-utils/form/placeholders";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { clearFormEntry } from "@nxs-utils/form/clearFormEntry";
import { FormProps } from "nxs-form";

const FormWithEntry: React.FC<FormProps> = (props) => {
  // props
  const { onSubmit, onChange, initialValues, hideLabels, theme } = props;
  const { labels, placeholders, types, schema, formName, heading } = props;
  const { submitLabel, hideSubmit, addEntry } = props;
  // const { values, setValues } = useValues(initialValues);
  // must have required props
  const required = { initialValues, formName, onSubmit, addEntry };
  const { lightColor, errors } = usePropErrorHandling(required, true);
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [selection, setSelection] = useState<KeyStringProp>({});
  // const [touchSchema, setTouchSchema] = useState<string[]>([]);
  const label = objLength(labels) ? labels : initLabels;
  const placeholder = objLength(placeholders) ? placeholders : initPlaceholders;
  const entryLabel = addEntry?.label;
  // store all new entries
  const [allValues, setAllValues] = useState<FormInitValues[]>([initialValues]);

  const handleChange = (event: any, idx: number) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.value;

    // copy old data
    let payload = [...allValues];
    // a deep copy is not needed as we are overriding the whole
    // object below, and not setting a property of it. this does not mutate the state.
    payload[idx][key] = value;
    setAllValues(payload);
  };
  const handleChecbox = (event: any) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.checked;
    // addTouched(key);
    // setValues({ ...values, [key]: value });
  };

  const updateSelection = (value: string, name: string) => {
    // addTouched(name);
    // setValues({ ...values, [name]: value });
    setSelection({ [name]: value });
  };
  // const addTouched = (key: string) => {
  //   if (!touchSchema.includes(key)) setTouchSchema((prev) => [...prev, key]);
  // };
  const handleSubmit = (formProps: React.FormEvent<HTMLFormElement>) => {
    formProps.preventDefault();
    // if (schema) {
    //   const errors = validateForm({ values, schema, label });
    //   objLength(errors) > 0 ? setFormErrors(errors) : onSubmit(values);
    // } else
    onSubmit(allValues);
  };
  const initEntry = () => {
    // incase of data mutations add empty form data
    if (addEntry) {
      const payload = clearFormEntry(addEntry.initialValues);
      setAllValues((prev) => [...prev, payload]);
    }
  };
  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="Form" />;
  }
  return (
    <form className={theme} onSubmit={handleSubmit}>
      {heading && <h2 className="heading">{heading}</h2>}
      {allValues.map((form, idx) => (
        <div key={form[idx]} className="form-field">
          {Object.keys(form).map((v) =>
            select.includes(v) ? (
              <Select
                name={v}
                list={themeList}
                active={selection[v]}
                onChange={(e) => updateSelection(e.target.value, v)}
                hideLabels={hideLabels}
                label={labels && labels[v] ? labels[v] : initLabels[v]}
                error={formErrors && formErrors[v]}
              />
            ) : textarea.includes(v) ? (
              <TextArea
                input={{
                  name: v,
                  value: allValues[idx][v],
                  onChange: (e) => handleChange(e, idx),
                  placeholder: placeholders && placeholders[v],
                  label: labels && labels[v] ? labels[v] : initLabels[v],
                  error: formErrors && formErrors[v],
                }}
                hideLabels={hideLabels}
                theme="highlight"
              />
            ) : types && types[v] === "checkbox" ? (
              <InputCheckbox
                name={v}
                value={allValues[idx][v]}
                onChange={(e) => handleChecbox(e)}
                error={formErrors && formErrors[v]}
                label={labels && labels[v] ? labels[v] : initLabels[v]}
              />
            ) : (
              <Field
                name={v}
                value={allValues[idx][v]}
                onChange={(e) => handleChange(e, idx)}
                placeholder={placeholders && placeholders[v]}
                hideLabel={hideLabels}
                label={labels && labels[v] ? labels[v] : initLabels[v]}
                error={formErrors && formErrors[v]}
              />
            )
          )}
        </div>
      ))}
      <div className="flex-row">
        {!hideSubmit && <SubmitButton label={submitLabel} />}
        {addEntry && <Button label={entryLabel} theme="btn-add" onClick={initEntry} />}
      </div>
    </form>
  );
};
export default FormWithEntry;
