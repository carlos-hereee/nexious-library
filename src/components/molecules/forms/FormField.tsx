import { auth, select, textarea } from "@nxs-utils/form/types";
import { AuthField, Field, Select, TextArea } from "@nxs-molecules";
import { Button, InputCheckbox } from "@nxs-atoms";
import { FormFieldProps } from "nxs-form";

const FormField: React.FC<FormFieldProps> = (props) => {
  // key variables
  const { type, name, value, handleChange, placeholder, hideLabels, label } = props;
  const { formError, selectList, selected, updateSelection, handleCheckbox } = props;
  const { fieldHeading, canMultiply, onMultiply, onMultiplyClick, onRemovalClick } = props;
  const { canRemove } = props;
  return (
    <div className="form-field">
      {fieldHeading && <h3 className="heading">{fieldHeading}</h3>}
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
            value,
            placeholder,
            label,
            error: formError,
            onChange: (e) => handleChange(e),
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
      <div className="flex-end">
        {canRemove && onMultiply && (
          <Button
            label={onMultiply.removalLabel}
            onClick={onRemovalClick}
            // todo add confirmation removal
            theme="btn-cancel"
          />
        )}
        {canMultiply && onMultiply && (
          <Button label={onMultiply?.additionLabel} onClick={onMultiplyClick} />
        )}
      </div>
    </div>
  );
};
export default FormField;
