import { ErrorMessage, Icon, Label } from "@nxs-atoms";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { auth, select, files } from "@nxs-utils/form/types";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, Field } from "@nxs-molecules/index";
import ShowAuthTips from "@nxs-atoms/forms/ShowAuthTips";
import Select from "@nxs-molecules/forms/Select";
import { themeList } from "@nxs-utils/app/themeList";
import { useState } from "react";
import UploadFile from "./UploadFile";

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
};

const Form: React.FC<FormProps> = (props) => {
  const { submit, initialValues, hideLabels, theme } = props;
  const { showAuthTips, labels, placeholders, types } = props;
  const { values, setValues } = useValues(initialValues);
  const { errors, setErrors } = useErrors();
  const [selection, setSelection] = useState<{ [key: string]: string }>({});

  const handleChange = (e: any) => {
    const key = e.target.name;
    const val = e.currentTarget.value;
    const change = { ...values, [key]: val };
    setValues(change);
  };
  const onSubmit = () => submit(values);

  const updateSelection = (value: string, name: string) => {
    setValues({ ...values, [name]: value });
    setSelection({ [name]: value });
  };
  const handleImageUpload = (file: string, key: string) => {
    setValues({ ...values, [key]: file });
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
      <button type="submit" className="btn-main">
        <Icon icon="submit" />
        Confirm
      </button>
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" prop="form" />
  );
};
export default Form;
