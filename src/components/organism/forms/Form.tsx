import { ErrorMessage, Label, ShowAuthTips } from "@nxs-atoms";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { auth, select, files } from "@nxs-utils/form/types";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, Field, SubmitButton } from "@nxs-molecules/index";
import { Select, UploadFile } from "@nxs-molecules";
import { themeList } from "@nxs-utils/app/themeList";
import { useState } from "react";
import { handleFormChange } from "@nxs-utils/form/handleFormChange";
import { KeyStringProp } from "@nxs-utils/helpers/types";
import { objLength } from "@nxs-utils/app/objLength";

type FormProps = {
  initialValues: { [key: string]: string };
  submit: (e: any) => void;
  hideLabels?: boolean;
  showAuthTips?: boolean;
  theme?: string;
  labels?: { [key: string]: string };
  placeholders?: { [key: string]: string };
  types?: { [key: string]: string };
  setPreviewImage?: (key: any) => void;
  submitLabel?: string;
  requireAllFields?: boolean;
};

const Form: React.FC<FormProps> = (props) => {
  const { submit, initialValues, hideLabels, theme, submitLabel } = props;
  const { showAuthTips, labels, placeholders, types, requireAllFields } = props;
  const { values, setValues } = useValues(initialValues);
  const { errors, setErrors } = useErrors();
  const [selection, setSelection] = useState<KeyStringProp>({});
  const [touched, setTouched] = useState<string[]>([]);

  const handleChange = (event: any) => {
    const key = event.target.name;
    // add to touched if not already
    // if (!touched.includes(key)) setTouched((prev) => [...prev, key]);
    addTouched(key);
    handleFormChange({ values, setErrors, setValues, touched, event });
  };
  const onSubmit = () => submit(values);

  const updateSelection = (value: string, name: string) => {
    // if (!touched.includes(name)) setTouched((prev) => [...prev, name]);
    addTouched(name);
    setValues({ ...values, [name]: value });
    setSelection({ [name]: value });
  };
  const handleImageUpload = (file: string, key: string) => {
    addTouched(key);
    setValues({ ...values, [key]: file });
  };
  const addTouched = (key: string) => {
    if (!touched.includes(key)) setTouched((prev) => [...prev, key]);
  };
  return values ? (
    <form
      className={theme ? `form ${theme}` : "form"}
      onSubmit={(formProps) =>
        handleFormSubmit({ formProps, values, setErrors, onSubmit })
      }
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
            <UploadFile
              name={v}
              upload={(file) => handleImageUpload(file, v)}
            />
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
      {requireAllFields ? (
        touched.length === objLength(values) && (
          <SubmitButton label={submitLabel} />
        )
      ) : (
        <SubmitButton label={submitLabel} />
      )}
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" />
  );
};
export default Form;
