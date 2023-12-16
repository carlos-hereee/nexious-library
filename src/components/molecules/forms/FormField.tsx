/* eslint-disable no-nested-ternary */
import { auth, textarea } from "@nxs-utils/form/types";
import {
  AuthField,
  DataList,
  Field,
  FieldQuantity,
  Select,
  TextArea,
  UploadFile,
} from "@nxs-molecules";
import { Button, InputCheckbox } from "@nxs-atoms";
import type { FormFieldProps } from "nxs-form";

const FormField = (props: FormFieldProps) => {
  // key variables
  const { type, name, value, handleChange, placeholder, hideLabels, label, clearSelection } =
    props;
  const { formError, updateSelection, handleCheckbox, theme, disableForm, handleCountChange } =
    props;
  const { fieldHeading, canMultiply, onMultiply, onMultiplyClick, onRemovalClick } = props;
  const { canRemove, handleHeroChange, formMessage, dataList, changeDataList } = props;

  // console.log("value :>> ", value);
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
          isDisabled={disableForm}
        />
      ) : type === "datalist" ? (
        <DataList
          name={name}
          list={dataList || []}
          formMessage={formMessage}
          value={typeof value === "string" ? value : ""}
          label={label}
          onChange={changeDataList}
          isDisabled={disableForm}
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
          clearSelection={clearSelection}
          error={formError}
          isDisabled={disableForm}
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
            isDisabled: disableForm,
          }}
          hideLabels={hideLabels}
          formMessage={formMessage}
        />
      ) : type === "checkbox" ? (
        <InputCheckbox
          name={name}
          value={typeof value === "boolean" ? value : false}
          onChange={handleCheckbox}
          formMessage={formMessage}
          error={formError}
          label={label}
          isDisabled={disableForm}
        />
      ) : type === "file" ? (
        <UploadFile
          input={{ name, error: formError, isDisabled: disableForm }}
          formMessage={formMessage}
          value={typeof value === "string" ? value : value instanceof File ? value : ""}
          label={label}
          onSelect={(e) => handleHeroChange && handleHeroChange(e)}
        />
      ) : type === "number" ? (
        <FieldQuantity
          // input={{ name, error: formError, isDisabled: disableForm }}
          name={name}
          formMessage={formMessage}
          value={typeof value === "number" ? value : 0}
          label={label}
          onChange={handleCountChange}
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
          isDisabled={disableForm}
        />
      )}
      {onMultiply && (
        <div className="flex-end">
          {canRemove && (
            <Button
              label={onMultiply.removalLabel}
              onClick={onRemovalClick}
              // todo add confirmation removal
              theme="btn-cancel"
            />
          )}
          {canMultiply && (
            <Button
              label={onMultiply?.additionLabel}
              onClick={onMultiplyClick}
              isDisable={disableForm}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default FormField;
