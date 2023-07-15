import { Icon } from "@nxs-atoms/index";
import { labels } from "@nxs-atoms/forms/labels";
import { placeholders } from "@nxs-atoms/forms/placeholders";
import { useState } from "react";
// import { schema } from "./schema";

type FormProps = {
  values: {
    [key: string]: string;
  }[];
  submit: (e: any) => void;
  type?: string;
};
const NoCaptchaForm: React.FC<FormProps> = (props) => {
  const { submit, type, values } = props;
  const [value, setValue] = useState();
  const handleSubmit = (e: any) => {
    console.log("e", e);
  };
  const handleChange = (data: any) => {
    handleChange(data);
    submit(data.target.value);
  };
  const handleBlur = (e: any) => {
    console.log("e", e);
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
              type={labels[v]}
              autoComplete="on"
              name={v}
              value={value}
              placeholder={placeholders[v]}
              onChange={handleChange}
              onBlur={handleBlur}
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
export default NoCaptchaForm;
