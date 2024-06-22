import { Input, Label, InputCheckbox } from "@nxs-atoms/index";
import type { FormFieldProps } from "nxs-form";
import { auth } from "@nxs-utils/form/types";
import { AuthField, DataList, FieldQuantity, Select, TextArea, UploadFile } from "@nxs-molecules";
import FieldDateDay from "./FieldDateDay";
import FieldDateWeek from "./FieldDateWeek";
import FieldDateTime from "./FieldDateTime";
import FieldPrice from "./FieldPrice";

const Field: React.FC<FormFieldProps> = (props) => {
  const { type, name, value, handleChange, placeholder, hideLabels, label, clearSelection, populateLink } = props;
  const { formError, handleCheckbox, theme, disableForm, formMessage, dataList, countSchema } = props;
  return auth.includes(name) ? (
    <AuthField
      name={name}
      formMessage={formMessage}
      value={value as string}
      onChange={handleChange}
      placeholder={placeholder}
      hideLabels={hideLabels}
      labels={label}
      error={formError}
      isDisabled={disableForm}
    />
  ) : type === "number" ? (
    <FieldQuantity
      name={name}
      formMessage={formMessage}
      value={value ? parseInt(value as string, 10) : 0}
      label={label}
      onChange={handleChange}
      isDisabled={disableForm}
      error={formError}
      schema={countSchema?.filter((count) => count.name === name)[0]}
    />
  ) : type === "datalist" ? (
    <DataList
      name={name}
      error={formError}
      list={(dataList && dataList[name]) || []}
      formMessage={formMessage}
      value={value as string}
      label={label}
      onChange={handleChange}
      isDisabled={disableForm}
    />
  ) : type === "select" ? (
    <Select
      name={name}
      formMessage={formMessage}
      list={(dataList && dataList[name]) || []}
      active={value as string}
      theme={theme}
      onChange={handleChange}
      hideLabels={hideLabels}
      label={label}
      clearSelection={clearSelection && clearSelection[name]}
      error={formError}
      isDisabled={disableForm}
    />
  ) : type === "textarea" ? (
    <TextArea
      input={{ name, value: value as string, placeholder, label, onChange: handleChange, isDisabled: disableForm }}
      hideLabels={hideLabels}
      formMessage={formMessage}
      error={formError}
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
      populateLink={populateLink}
    />
  ) : type === "file" ? (
    <UploadFile
      input={{ name, isDisabled: disableForm }}
      formMessage={formMessage}
      error={formError}
      value={typeof value === "string" ? value : value instanceof File ? value : ""}
      label={label}
      onSelect={handleChange}
    />
  ) : type === "price-dollars-cents" ? (
    <FieldPrice
      name={name}
      formMessage={formMessage}
      error={formError}
      value={typeof value === "number" ? value : typeof value === "string" ? parseInt(value || "0", 10) : 0}
      label={label}
      type={type}
      onChange={handleChange}
    />
  ) : type === "date-time" ? (
    <FieldDateTime
      name={name}
      error={formError}
      placeholder={placeholder}
      formMessage={formMessage}
      value={value as string}
      label={label}
      onChange={handleChange}
    />
  ) : type === "date-week" ? (
    <FieldDateWeek
      name={name}
      placeholder={placeholder}
      formMessage={formMessage}
      error={formError}
      value={value as string}
      label={label}
      onChange={handleChange}
    />
  ) : type === "date-day" ? (
    <FieldDateDay
      name={name}
      error={formError}
      placeholder={placeholder}
      formMessage={formMessage}
      value={value as string}
      label={label}
      onChange={handleChange}
    />
  ) : (
    <>
      {!hideLabels && label && <Label name={name} label={label} error={formError} message={formMessage} />}
      <Input
        value={value as string}
        onChange={handleChange}
        name={name}
        theme="highlight"
        placeholder={placeholder}
        isDisabled={disableForm}
      />
    </>
  );
};
export default Field;
