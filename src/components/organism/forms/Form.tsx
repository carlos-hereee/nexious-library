import { ErrorMessage } from "@nxs-atoms";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { auth, select } from "@nxs-utils/form/types";
import { textarea } from "@nxs-utils/form/types";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, Field, SubmitButton, TextArea } from "@nxs-molecules/index";
import { Select } from "@nxs-molecules";
import { themeList } from "@nxs-utils/app/themeList";
import { useState } from "react";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { initLabels } from "@nxs-utils/form/labels";
import { objLength } from "@nxs-utils/app/objLength";
import { validateForm } from "@nxs-utils/form/validateForm";

type FormProps = {
  // required props
  initialValues: { [key: string]: any };
  onSubmit: (e: any) => void;
  // optional
  hideLabels?: boolean;
  showAuthTips?: boolean;
  theme?: string;
  labels?: { [key: string]: string };
  placeholders?: { [key: string]: string };
  types?: { [key: string]: string };
  submitLabel?: string;
  schema?: { required: string[] };
};

const Form: React.FC<FormProps> = (props) => {
  const { onSubmit, initialValues, hideLabels, theme, submitLabel } = props;
  const { labels, placeholders, types, showAuthTips, schema } = props;
  const { values, setValues } = useValues(initialValues);
  const { errors, setErrors } = useErrors();
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);
  const label = labels ? labels : initLabels;

  const handleChange = (event: any) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.value;
    const payload = { ...values, [key]: value };
    setValues(payload);
    addTouched(key);
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
      objLength(errors) > 0 ? setErrors(errors) : onSubmit(values);
    } else onSubmit(values);
  };

  return values ? (
    <form className={theme ? theme : undefined} onSubmit={handleSubmit}>
      {Object.keys(values).map((v) => (
        <div key={v} className="form-field">
          {auth.includes(v) ? (
            <AuthField
              name={v}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders && placeholders[v]}
              hideLabels={hideLabels}
              labels={labels && labels[v] ? labels[v] : initLabels[v]}
              errors={errors && errors[v]}
            />
          ) : select.includes(v) ? (
            <Select
              name={v}
              list={themeList}
              active={selection[v]}
              onChange={(e) => updateSelection(e.target.value, v)}
              hideLabels={hideLabels}
              labels={labels && labels[v] ? labels[v] : initLabels[v]}
              errors={errors && errors[v]}
            />
          ) : textarea.includes(v) ? (
            <TextArea
              name={v}
              onChange={handleChange}
              value={values[v]}
              placeholder={placeholders && placeholders[v]}
              hideLabels={hideLabels}
              labels={labels && labels[v] ? labels[v] : initLabels[v]}
              errors={errors && errors[v]}
              theme="highlight"
            />
          ) : (
            <Field
              name={v}
              type={types && types[v]}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders && placeholders[v]}
              hideLabel={hideLabels}
              label={labels && labels[v] ? labels[v] : initLabels[v]}
              error={errors && errors[v]}
            />
          )}
        </div>
      ))}
      <SubmitButton label={submitLabel} />
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" error={values} />
  );
};
export default Form;
