import { Icon } from "@nxs-atoms/index";
import { labels } from "@nxs-atoms/forms/labels";
import { types } from "@nxs-atoms/forms/types";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { useState } from "react";

type FormProps = {
  values: { [key: string]: string | number };
  submit: (e: any) => void;
  hideLabels?: boolean;
  stretchInput?: boolean;
  name?: string;
  type?: string;
};
const Form: React.FC<FormProps> = (props) => {
  const { submit, type, values, hideLabels, name, stretchInput } = props;
  const [value, setValue] = useState<{ [key: string]: string | number }>(
    values
  );
  const [errors, setErros] = useState<{ [key: string]: string | number }>();
  const [seePassword, setSeePassword] = useState<{ [key: string]: boolean }>({
    password: false,
    confirmPassword: false,
  });
  const auth = ["password", "confirmPassword"];

  const handleChange = (e: any) => {
    const key = e.target.name;
    const val = e.currentTarget.value;
    const change = { ...value, [key]: val };
    setValue(change);
  };

  const validateForm = (e: any) => {
    let isValidated: boolean = true;
    let errors: { [key: string]: string } = {};
    // exclude buttons submit/button and form plus undefined for other error
    const exclude = ["submit", "button", "form", undefined];
    Object.values(e).forEach((a: any) => {
      if (exclude.includes(a.type)) return;
      if (!a.value) {
        isValidated = false;
        errors[a.name] = labels[a.name] + " is a required field";
      }
    });
    return { isValidated, errors };
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { isValidated, errors } = validateForm(e.target);
    console.log("isValidated, errors", isValidated, errors);
    isValidated ? submit(value) : setErros(errors);
  };

  return (
    <form
      className={`form${name ? ` ${name}` : ""} ${
        stretchInput ? " w-100" : ""
      }`}
      onSubmit={handleSubmit}
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
                type={seePassword[v] ? "password" : "text"}
                autoComplete="on"
                name={v}
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
                  <Icon icon="eye" />
                ) : (
                  <Icon icon="eyeSlash" />
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
              // onBlur={handleBlur}
            />
          )}
        </div>
      ))}
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
    </form>
  );
};
export default Form;
