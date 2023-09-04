import { ErrorMessage, Icon, Label } from "@nxs-atoms";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { useTips } from "@nxs-utils/hooks/useTips";
import { auth } from "@nxs-utils/form/authTypes";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, Field } from "@nxs-molecules/index";

type FormProps = {
  initialValues: { [key: string]: string };
  submit: (e: any) => void;
  hideLabels?: boolean;
  showAuthTips?: boolean;
  theme?: string;
  type?: string;
  labels?: { [key: string]: string };
  placeholders?: { [key: string]: string };
};

const Form: React.FC<FormProps> = (props) => {
  const { submit, type, initialValues, hideLabels, theme } = props;
  const { showAuthTips, labels, placeholders } = props;
  const { values, setValues } = useValues(initialValues);
  const { errors, setErrors } = useErrors();
  const { tips, setTips } = useTips();

  const handleChange = (e: any) => {
    const key = e.target.name;
    const val = e.currentTarget.value;
    const change = { ...values, [key]: val };
    setValues(change);
  };
  const onSubmit = () => submit(values);
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
            <Label label={labels ? labels[v] : v} errors={errors[v]} />
          )}
          {auth.includes(v) ? (
            <AuthField
              name={v}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders ? placeholders[v] : v}
            />
          ) : (
            <Field
              name={v}
              value={values[v]}
              onChange={handleChange}
              placeholder={placeholders ? placeholders[v] : v}
            />
          )}
        </div>
      ))}
      {showAuthTips && tips ? (
        <div className="form-field password-checker">
          <h3>Your password difficulty to guess is at {tips.ease}</h3>
          <p>Increase your password's security by:</p>
          <ol>
            {tips.tips.map((t) => (
              <li key={t} className="p-stretch">
                {t}{" "}
              </li>
            ))}
          </ol>
          <div className="flex-center m-tb">
            <button
              type="button"
              className="btn-main btn-cancel"
              onClick={() => submit(values)}
            >
              <Icon icon="submit" />
              Continue anyway
            </button>
            <button type="submit" className="btn-main">
              <Icon icon="submit" />
              Try again
            </button>
          </div>
        </div>
      ) : (
        <button type="submit" className="btn-main">
          {type === "search" ? (
            <span>
              <Icon icon="save" />
              Save
            </span>
          ) : (
            <span>
              <Icon icon="submit" />
              Confirm
            </span>
          )}
        </button>
      )}
    </form>
  ) : (
    <ErrorMessage code="missingFormInitialValues" />
  );
};
export default Form;
