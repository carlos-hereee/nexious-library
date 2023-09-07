import { ErrorMessage, Label, ShowAuthTips } from "@nxs-atoms";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { auth, select, files, FormMediaProps } from "@nxs-utils/form/types";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, Field, SubmitButton } from "@nxs-molecules/index";
import { Select, UploadFile } from "@nxs-molecules";
import { themeList } from "@nxs-utils/app/themeList";
import { useEffect, useState } from "react";
import { handleFormChange } from "@nxs-utils/form/handleFormChange";
import { KeyStringProp } from "@nxs-utils/helpers/types";

type FormProps = {
  // required props
  initialValues: { [key: string]: string };
  submit: (e: any) => void;
  // optional
  hideLabels?: boolean;
  showAuthTips?: boolean;
  theme?: string;
  labels?: { [key: string]: string };
  placeholders?: { [key: string]: string };
  types?: { [key: string]: string };
  submitLabel?: string;
  requireAllFields?: boolean;
  useMedia?: boolean;
};

const Form: React.FC<FormProps> = (props) => {
  const { submit, initialValues, hideLabels, theme, submitLabel } = props;
  const { labels, placeholders, types } = props;
  const { showAuthTips, useMedia, requireAllFields } = props;
  const { values, setValues } = useValues(initialValues);
  const { errors, setErrors } = useErrors();
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touchSchema, setTouchSchema] = useState<string[]>([]);
  const [mediaValues, setMediaValues] = useState<FormMediaProps[]>([]);

  // useEffect(() => {
  //   if (mediaValues.length > 0) {
  //     // addTouched(key)
  //   }
  // }, [mediaValues]);

  const handleChange = (event: any) => {
    const key = event.target.name;
    addTouched(key);
    handleFormChange({
      values,
      setErrors,
      setValues,
      touched: touchSchema,
      event,
    });
  };
  const onSubmit = () => submit(values);

  const updateSelection = (value: string, name: string) => {
    addTouched(name);
    setValues({ ...values, [name]: value });
    setSelection({ [name]: value });
  };
  // const handleImageUpload = (file: string, key: string) => {
  //   addTouched(key);
  //   setValues({ ...values, [key]: file });
  // };
  const addTouched = (key: string) => {
    if (!touchSchema.includes(key)) setTouchSchema((prev) => [...prev, key]);
  };
  const handleSubmit = (formProps: React.FormEvent<HTMLFormElement>) => {
    handleFormSubmit({
      formProps,
      values,
      setErrors,
      onSubmit,
      schema: { requireAllFields },
      mediaValues,
    });
  };
  const handleMediaValues = (data: FormMediaProps) => {
    addTouched(data.name);
    setMediaValues((prev) => [...prev, data]);
  };
  return values ? (
    <form
      className={theme ? theme : ""}
      onSubmit={handleSubmit}
      encType={useMedia ? "multipart/form-data" : ""}
    >
      {Object.keys(values).map((v) => (
        <div key={v} className="form-field">
          {!hideLabels && (
            <Label name={v} label={labels && labels[v]} errors={errors[v]} />
          )}
          {auth.includes(v) ? (
            <AuthField
              name={v}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders && placeholders[v]}
            />
          ) : select.includes(v) ? (
            <Select
              list={themeList}
              active={selection[v]}
              onChange={(e) => updateSelection(e.target.value, v)}
            />
          ) : files.includes(v) ? (
            <UploadFile name={v} setMedia={handleMediaValues} />
          ) : (
            <Field
              name={v}
              type={types && types[v]}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders && placeholders[v]}
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
