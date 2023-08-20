import { Icon } from "@nxs-atoms/index";
import { labels } from "@nxs-atoms/forms/labels";
import { types } from "@nxs-atoms/forms/types";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { useState } from "react";
import { handleFormSubmit } from "@nxs-utils/form/handleFormSubmit";
import { KeyStringProp } from "@nxs-helpers/types";

type FormProps = {
  values: { [key: string]: string };
  submit: (e: any) => void;
  hideLabels?: boolean;
  showAuthTips?: boolean;
  name?: string;
  type?: string;
};
type TipsProp = {
  strength: number;
  tips: string[];
  ease: string;
};
const Form: React.FC<FormProps> = (props) => {
  const { submit, type, values, hideLabels, name, showAuthTips } = props;
  const [value, setValue] = useState<KeyStringProp>(values);
  const [errors, setErrors] = useState<KeyStringProp | undefined>();
  const [seePassword, setSeePassword] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });
  const [tips, setTips] = useState<TipsProp | null>();
  const auth = ["password", "confirmPassword"];

  const handleChange = (e: any) => {
    const key = e.target.name;
    const val = e.currentTarget.value;
    const change = { ...value, [key]: val };
    setValue(change);
  };

  return (
    <form
      className={`form${name ? ` ${name}` : ""}`}
      onSubmit={(e) =>
        handleFormSubmit({
          formProps: e,
          values: value,
          setErrors,
          onSubmit: () => submit(value),
        })
      }
    >
      {Object.keys(values).map((v) => (
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
                value={value[v] || ""}
                placeholder={placeholders[v]}
                onChange={handleChange}
                className="password"
              />
              <button
                type="button"
                className="btn btn-secondary"
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
              value={value[v] || ""}
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
              className="btn btn-main btn-cancel"
              onClick={() => submit(value)}
            >
              <Icon icon="submit" />
              Continue anyway
            </button>
            <button type="submit" className="btn btn-main">
              <Icon icon="submit" />
              Try again
            </button>
          </div>
        </div>
      ) : (
        <button type="submit" className="btn btn-main">
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
  );
};
export default Form;
