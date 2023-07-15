import { Icon } from "@nxs-atoms/index";
import { labels } from "@nxs-atoms/forms/labels";
import { types } from "@nxs-atoms/forms/types";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { useState } from "react";

type FormProps = {
  values: { [key: string]: string };
  submit: (e: any) => void;
  hideLabels?: boolean;
  stretchInput?: boolean;
  name?: string;
  type?: string;
};
const Form: React.FC<FormProps> = (props) => {
  const { submit, type, values, hideLabels, name, stretchInput } = props;
  const [value, setValue] = useState<{ [key: string]: string }>(values);

  const handleChange = (e: any) => {
    const key = e.target.name;
    const val = e.currentTarget.value;
    const change = { ...value, [key]: val };
    setValue(change);
  };
  // const handleBlur = (e: any) => {
  //   console.log("e", e);
  // };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    submit(value);
  };
  return (
    <form className={`form ${name ? name : ""}`} onSubmit={handleSubmit}>
      <div className={`form-fields ${stretchInput ? "w-100" : ""}`}>
        {Object.keys(values).map((v) => (
          <div key={v} className="input-wrapper">
            {!hideLabels && (
              <label htmlFor={v} className="label">
                {" "}
                {labels[v]}: <br />
                {/* {errors[v] && <span className="required">{errors[v]}</span>} */}
              </label>
            )}
            <input
              type={types[typeof labels[v]]}
              autoComplete="on"
              name={v}
              value={value[v] || ""}
              placeholder={placeholders[v]}
              onChange={handleChange}
              // onBlur={handleBlur}
              className="input"
            />
          </div>
        ))}
      </div>
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
