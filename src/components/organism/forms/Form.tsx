import { ErrorMessage, InputCheckbox } from "@nxs-atoms";
import { auth, select } from "@nxs-utils/form/types";
import { textarea } from "@nxs-utils/form/types";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, ErrorMessages, Field } from "@nxs-molecules";
import { Select, SubmitButton, TextArea } from "@nxs-molecules";
import { themeList } from "@nxs-utils/app/themeList";
import { useState } from "react";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { initLabels } from "@nxs-utils/form/labels";
import { objLength } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";
import { initPlaceholders } from "@nxs-utils/form/placeholders";
import { usePropErrorHandling } from "@nxs-utils/hooks/usePropErrorHandling";
import { FormProps } from "@nxs-types/FormProps";

const Form: React.FC<FormProps> = (props) => {
  // props
  const { onSubmit, onChange, initialValues, hideLabels, theme } = props;
  const { labels, placeholders, types, schema, formName, heading } = props;
  const { submitLabel, hideSubmit } = props;
  const { values, setValues } = useValues(initialValues);
  // must have required props
  const required = { initialValues, onSubmit };
  const { lightColor, errors } = usePropErrorHandling(required, true);
  const [formErrors, setFormErrors] = useState<KeyStringProp>({});
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);
  const label = objLength(labels) ? labels : initLabels;
  const placeholder = objLength(placeholders) ? placeholders : initPlaceholders;

  const handleChange = (event: any) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.value;
    const payload = { ...values, [key]: value };
    setValues(payload);
    addTouched(key);
    if (onChange) onChange(payload);
  };
  const handleChecbox = (event: any) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.checked;
    addTouched(key);
    setValues({ ...values, [key]: value });
  };

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
  if (lightColor === "red") {
    return <ErrorMessages errors={errors} component="Form" />;
  }
  return values ? (
    <form className={theme} onSubmit={handleSubmit}>
      {heading && <h2 className="heading">{heading}</h2>}
      {Object.keys(values).map((v) => (
        <div key={v} className="form-field">
          {auth.includes(v) ? (
            <AuthField
              name={v}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholder ? placeholder[v] : initPlaceholders[v]}
              hideLabels={hideLabels}
              labels={labels && labels[v] ? labels[v] : initLabels[v]}
              errors={formErrors && formErrors[v]}
            />
          ) : select.includes(v) ? (
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
              name={v}
              onChange={handleChange}
              value={values[v]}
              placeholder={placeholders && placeholders[v]}
              hideLabels={hideLabels}
              label={labels && labels[v] ? labels[v] : initLabels[v]}
              errors={formErrors && formErrors[v]}
              theme="highlight"
            />
          ) : types && types[v] === "checkbox" ? (
            <InputCheckbox
              name={v}
              value={values[v]}
              onChange={(e) => handleChecbox(e)}
              error={formErrors && formErrors[v]}
              label={labels && labels[v] ? labels[v] : initLabels[v]}
            />
          ) : (
            <Field
              name={v}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders && placeholders[v]}
              hideLabel={hideLabels}
              label={labels && labels[v] ? labels[v] : initLabels[v]}
              error={formErrors && formErrors[v]}
            />
          )}
        </div>
      ))}
      {!hideSubmit && <SubmitButton label={submitLabel} />}
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" error={values} />
  );
};
export default Form;
