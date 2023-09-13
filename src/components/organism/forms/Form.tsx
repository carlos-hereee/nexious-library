import { ErrorMessage, ShowAuthTips } from "@nxs-atoms";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { auth, select, files, FormMediaProps } from "@nxs-utils/form/types";
import { textarea } from "@nxs-utils/form/types";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, Field, SubmitButton, TextArea } from "@nxs-molecules/index";
import { Select, UploadFile } from "@nxs-molecules";
import { themeList } from "@nxs-utils/app/themeList";
import { useState } from "react";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { initLabels } from "@nxs-utils/form/labels";

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
  useMedia?: boolean;
};

const Form: React.FC<FormProps> = (props) => {
  const { onSubmit, initialValues, hideLabels, theme, submitLabel } = props;
  const { labels, placeholders, types, showAuthTips, useMedia, schema } = props;
  const { values, setValues } = useValues(initialValues);
  const { errors, setErrors } = useErrors();
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);
  const [media, setMedia] = useState<FormMediaProps[]>([]);

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
    const { formData, isValidated, errors } = handleFormSubmit({
      values,
      schema,
      label: labels,
      media,
      useMedia,
    });
    if (!isValidated) {
      setErrors(errors);
    } else onSubmit(formData);
  };
  const handleMediaValues = (data: FormMediaProps) => {
    addTouched(data.name);
    setMedia((prev) => [...prev, { name: data.name, file: data.file }]);
  };
  return values ? (
    useMedia ? (
      <form
        className={theme ? theme : undefined}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {Object.keys(values).map((v) => (
          <div key={v} className="form-field">
            {files.includes(v) ? (
              <UploadFile
                name={v}
                setMedia={handleMediaValues}
                hideLabels={hideLabels}
                labels={labels && labels[v] ? labels[v] : initLabels[v]}
                errors={errors && errors[v]}
              />
            ) : (
              // always have a back up plan
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
    )
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" error={values} />
  );
};
export default Form;
