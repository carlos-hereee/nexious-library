/* eslint-disable no-nested-ternary */
import { auth, textarea } from "@nxs-utils/form/types";
import { AuthField, DataList, Field, Select, TextArea, UploadFile } from "@nxs-molecules";
import { Button, InputCheckbox } from "@nxs-atoms";
import type { FormFieldProps } from "nxs-form";

const FormField = (props: FormFieldProps) => {
  // key variables
  const { type, name, value, handleChange, placeholder, hideLabels, label } = props;
  const { formError, updateSelection, handleCheckbox, theme } = props;
  const { fieldHeading, canMultiply, onMultiply, onMultiplyClick, onRemovalClick } = props;
  const { canRemove, handleHeroChange, formMessage, dataList, changeDataList } = props;
  return (
    <div className="form-field">
      {fieldHeading && fieldHeading[name] && <h3 className="heading">{fieldHeading[name]}</h3>}
      {auth.includes(name) ? (
        <AuthField
          name={name}
          formMessage={formMessage}
          value={typeof value === "string" ? value : ""}
          onChange={handleChange}
          placeholder={placeholder}
          hideLabels={hideLabels}
          labels={label}
          errors={formError}
        />
      ) : type === "datalist" ? (
        <DataList
          name={name}
          list={dataList || []}
          formMessage={formMessage}
          value={typeof value === "string" ? value : ""}
          label={label}
          onChange={changeDataList}
        />
      ) : type === "select" ? (
        <Select
          name={name}
          formMessage={formMessage}
          list={dataList || []}
          active={typeof value === "string" ? value : ""}
          theme={theme}
          onChange={(e) => updateSelection && updateSelection(e, name)}
          hideLabels={hideLabels}
          label={label}
          error={formError}
        />
      ) : textarea.includes(name) ? (
        <TextArea
          input={{
            name,
            value: typeof value === "string" ? value : "",
            placeholder,
            label,
            error: formError,
            onChange: handleChange,
          }}
          hideLabels={hideLabels}
          formMessage={formMessage}
        />
      ) : type === "checkbox" ? (
        <InputCheckbox
          name={name}
          value={typeof value === "string" ? value : ""}
          onChange={handleCheckbox}
          formMessage={formMessage}
          error={formError}
          label={label}
        />
      ) : type === "file" ? (
        <UploadFile
          input={{ name, error: formError }}
          formMessage={formMessage}
          value={typeof value === "string" ? value : ""}
          label={label}
          onSelect={(e) => handleHeroChange && handleHeroChange(e)}
        />
      ) : (
        <Field
          name={name}
          value={typeof value === "string" ? value : ""}
          formMessage={formMessage}
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
