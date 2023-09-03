import { ErrorMessage, Icon } from "@nxs-atoms";
import { labels } from "@nxs-atoms/forms/labels";
import { types } from "@nxs-atoms/forms/types";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { useState } from "react";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { useTips } from "@nxs-utils/hooks/useTips";
import { auth } from "@nxs-utils/form/authTypes";
import { useErrors } from "@nxs-utils/hooks/useErrors";
import { useInitialValues } from "@nxs-utils/hooks/useInitialValues";
import { useSeePassword } from "@nxs-utils/hooks/useSeePassword";

type FormProps = {
  values: { [key: string]: string };
  submit: (e: any) => void;
  hideLabels?: boolean;
  showAuthTips?: boolean;
  theme?: string;
  type?: string;
};

const Form: React.FC<FormProps> = (props) => {
  const { submit, type, values, hideLabels, theme, showAuthTips } = props;
  const { initialValues, setInitialValues } = useInitialValues(values);
  const { errors, setErrors } = useErrors();
  const { seePassword, setSeePassword } = useSeePassword();
  const { tips, setTips } = useTips();

  const handleChange = (e: any) => {
    const key = e.target.name;
    const val = e.currentTarget.value;
    const change = { ...initialValues, [key]: val };
    setInitialValues(change);
  };
  return initialValues ? (
    <form
      className={theme ? `form ${theme}` : "form"}
      onSubmit={(e) =>
        handleFormSubmit({
          formProps: e,
          values: initialValues,
          setErrors,
          onSubmit: () => submit(initialValues),
        })
      }
    >
      {Object.keys(initialValues).map((v) => (
        <div key={v} className="form-field">
          {!hideLabels && (
            <label htmlFor={v} className="label">
              {labels[v]}: <br />
              {errors && errors[v] && (
                <span className="required">{errors[v]}</span>
              )}
            </label>
          )}
          {auth.includes(v) ? (
            <div className="flex">
              <input
                type={seePassword[v] ? "text" : "password"}
                autoComplete="on"
                name={v}
                value={initialValues[v] || ""}
                placeholder={placeholders[v]}
                onChange={handleChange}
                className="password"
              />
              <button
                type="button"
                className="btn-main btn-small"
                onClick={() =>
                  setSeePassword({ ...seePassword, [v]: !seePassword[v] })
                }
              >
                {seePassword[v] ? (
                  <Icon icon="eyeSlash" />
                ) : (
                  <Icon icon="eye" />
                )}
              </button>
            </div>
          ) : (
            <input
              type={types[typeof labels[v]]}
              autoComplete="on"
              name={v}
              value={initialValues[v] || ""}
              placeholder={placeholders[v]}
              onChange={handleChange}
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
              onClick={() => submit(initialValues)}
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
