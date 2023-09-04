import { ErrorMessage, Icon, Input, Label } from "@nxs-atoms";
import { labels } from "@nxs-atoms/forms/labels";
import { types } from "@nxs-atoms/forms/types";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { useTips } from "@nxs-utils/hooks/useTips";
import { auth } from "@nxs-utils/form/authTypes";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useSeePassword } from "@nxs-utils/hooks/useSeePassword";
import { useValues } from "@nxs-utils/hooks/useValues";
import { AuthField, Field, IconButton } from "@nxs-molecules/index";

type FormProps = {
  initialValues: { [key: string]: string };
  submit: (e: any) => void;
  hideLabels?: boolean;
  showAuthTips?: boolean;
  theme?: string;
  type?: string;
};

const Form: React.FC<FormProps> = (props) => {
  const { submit, type, initialValues, hideLabels, theme, showAuthTips } =
    props;
  const { values, setValues } = useValues(initialValues);
  const { errors, setErrors } = useErrors();
  const { seePassword, togglePassword } = useSeePassword();
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
          {!hideLabels && <Label label={v} errors={errors[v]} />}
          {auth.includes(v) ? (
            <AuthField name={v} value={values[v]} onChange={handleChange} />
          ) : (
            <Field name={v} value={values[v]} onChange={handleChange} />
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
