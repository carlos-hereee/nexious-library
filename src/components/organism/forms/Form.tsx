import { Icon } from "@nxs-atoms/index";
import { labels } from "@nxs-atoms/forms/labels";
import { types } from "@nxs-atoms/forms/types";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { useState } from "react";

type FormProps = {
  values: { [key: string]: string };
  submit: (e: any) => void;
  type?: string;
};
const Form: React.FC<FormProps> = (props) => {
  const { submit, type, values } = props;
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
    <form className="form no-capcha-form" onSubmit={handleSubmit}>
      <div className="form-fields">
        {Object.keys(values).map((v) => (
          <div key={v} className="input-wrapper">
            <label htmlFor={v} className="label">
              <strong>
                {" "}
                {labels[v]}: <br />
              </strong>
              {/* {errors[v] && <span className="required">{errors[v]}</span>} */}
            </label>
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
    </form>
  );
};
export default Form;
