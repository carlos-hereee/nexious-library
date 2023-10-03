import { auth, select, textarea } from "@nxs-utils/form/types";
import { AuthField, Field, Select, TextArea } from "@nxs-molecules";
import { InputCheckbox } from "main";
import { FormFieldProps } from "nxs-form";

const FormField: React.FC<FormFieldProps> = (props) => {
  const { type, name, value, handleChange, placeholder, hideLabels, label } = props;
  const { formError, selectList, selected, updateSelection, handleCheckbox } = props;
  return (
    <div className="form-field">
      {auth.includes(name) ? (
        <AuthField
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          hideLabels={hideLabels}
          labels={label}
          errors={formError}
        />
      ) : select.includes(name) ? (
        <Select
          name={name}
          list={selectList ? selectList : []}
          active={selected ? selected : ""}
          onChange={(e) => updateSelection && updateSelection(e.target.value, name)}
          hideLabels={hideLabels}
          label={label}
          error={formError}
        />
      ) : textarea.includes(name) ? (
        <TextArea
          input={{
            name,
            value: value,
            onChange: (e) => handleChange(e),
            placeholder,
            label,
            error: formError,
          }}
          hideLabels={hideLabels}
          theme="highlight"
        />
      ) : type === "checkbox" ? (
        <InputCheckbox
          name={name}
          value={value}
          onChange={(e) => handleCheckbox && handleCheckbox(e)}
          error={formError}
          label={label}
        />
      ) : (
        <Field
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          hideLabel={hideLabels}
          label={label}
          error={formError}
        />
      )}
    </div>
  );
};
export default FormField;
