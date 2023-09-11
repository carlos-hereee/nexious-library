import { ErrorMessage, ShowAuthTips } from "@nxs-atoms";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { auth, select, files, FormMediaProps } from "@nxs-utils/form/types";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, Field, SubmitButton } from "@nxs-molecules/index";
import { Select, UploadFile } from "@nxs-molecules";
import { themeList } from "@nxs-utils/app/themeList";
import { useState } from "react";
import { handleFormChange } from "@nxs-utils/form/handleFormChange";
import { KeyStringProp } from "@nxs-utils/helpers/types";

type FormProps = {
  // required props
  initialValues: { [key: string]: any };
  submit: (e: any) => void;
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
  const { submit, initialValues, hideLabels, theme, submitLabel } = props;
  const { labels, placeholders, types } = props;
  const { showAuthTips, useMedia, schema } = props;
  const { values, setValues } = useValues(initialValues);
  const { errors, setErrors } = useErrors();
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);

  const handleChange = (event: any) => {
    // key variables
    const key = event.target.name;
    const value = event.currentTarget.value;
    const payload = { ...values, [key]: value };
    setValues(payload);
    addTouched(key);

    // const { isValidated, errors } = handleFormChange({
    //   values,
    //   touched: touchSchema,
    //   event,
    //   schema,
    //   label: labels,
    // });
  };
  const onSubmit = () => submit(values);

  const updateSelection = (value: string, name: string) => {
    addTouched(name);
    setValues({ ...values, [name]: value });
    setSelection({ [name]: value });
  };
  const addTouched = (key: string) => {
    if (!touchSchema.includes(key)) setTouchSchema((prev) => [...prev, key]);
  };
  const handleSubmit = (formProps: React.FormEvent<HTMLFormElement>) => {
    const { formData, isValidated, errors } = handleFormSubmit({
      formProps,
      values,
      schema,
      label: labels,
    });
    if (!isValidated) {
      setErrors(errors);
    } else submit(formData);
  };
  const handleMediaValues = (data: FormMediaProps) => {
    addTouched(data.name);
    setValues({ ...values, [data.name]: data.file });
  };
  return values ? (
    <form
      className={theme ? theme : ""}
      onSubmit={handleSubmit}
      encType={useMedia ? "multipart/form-data" : ""}
    >
      {Object.keys(values).map((v) => (
        <div key={v} className="form-field">
          {auth.includes(v) ? (
            <AuthField
              name={v}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders && placeholders[v]}
              hideLabels={hideLabels}
              labels={labels && labels[v]}
              errors={errors && errors[v]}
            />
          ) : select.includes(v) ? (
            <Select
              name={v}
              list={themeList}
              active={selection[v]}
              onChange={(e) => updateSelection(e.target.value, v)}
              hideLabels={hideLabels}
              labels={labels && labels[v]}
              errors={errors && errors[v]}
            />
          ) : files.includes(v) ? (
            <UploadFile
              name={v}
              setMedia={handleMediaValues}
              hideLabels={hideLabels}
              labels={labels && labels[v]}
              errors={errors && errors[v]}
            />
          ) : (
            <Field
              name={v}
              type={types && types[v]}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders && placeholders[v]}
              hideLabels={hideLabels}
              labels={labels && labels[v]}
              errors={errors && errors[v]}
            />
          )}
        </div>
      ))}
      {showAuthTips && <ShowAuthTips onSubmit={() => submit(values)} />}
      <SubmitButton label={submitLabel} />
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" />
  );
};
export default Form;
