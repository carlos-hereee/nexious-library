import { Input, InputCheckbox } from "@nxs-atoms/index";
import type { FieldShellProps, FormFieldProps } from "nxs-form";
import { DataList, FieldQuantity, Select, TextArea, UploadFile } from "@nxs-molecules";
import FieldPrice from "./FieldPrice";
import FieldDate from "./FieldDate";
import FieldTime from "./FieldTime";
import FieldDay from "./FieldDay";
import FieldShell from "./FieldShell";

/**
 * The type-to-component map behind Field.tsx.
 *
 * It was a thirteen branch nested ternary, so adding a field type meant editing the middle of a
 * chain and every renderer's props were tangled in one expression. The dispatch behavior is
 * identical; what changes is that a new type is one entry.
 *
 * Note what is NOT in here: the `auth.includes(name)` case. It dispatches on the field NAME, not
 * its type, so folding it into a type map would silently change behavior for password fields.
 * Field.tsx keeps it as a pre-check ahead of the lookup.
 *
 * Every renderer receives the whole FormFieldProps and pulls what it needs, so a signature change
 * in one does not ripple through the others.
 */
export type FieldRenderer = (props: FormFieldProps) => React.JSX.Element;

/**
 * The shell props every renderer derives from its field props, in one place. The set used to be
 * retyped at each of the ten shell sites here plus the auth branch in Field.tsx, so a prop missed
 * at one site (an addon, a hidden label) vanished for that single field type with nothing failing.
 * `children` stays with the renderer, since the control is the one thing that differs.
 */
export const buildFieldShellProps = (props: FormFieldProps): Omit<FieldShellProps, "children"> => {
  const { name, label, hideLabels, formError, formMessage, addon } = props;
  return { name, label, hideLabel: hideLabels, error: formError, message: formMessage, addon };
};

const renderNumber: FieldRenderer = (props) => {
  const { name, value, handleChange, disableForm, formError, countSchema } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <FieldQuantity
        name={name}
        value={value ? parseInt(value as string, 10) : 0}
        onChange={handleChange}
        isDisabled={disableForm}
        error={formError}
        hideLabel
        schema={countSchema?.filter((count) => count.name === name)[0]}
      />
    </FieldShell>
  );
};

const renderDatalist: FieldRenderer = (props) => {
  const { name, dataList, value, handleChange, disableForm } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <DataList
        name={name}
        list={(dataList && dataList[name]) || []}
        value={value as string}
        onChange={handleChange}
        isDisabled={disableForm}
        hideLabel
      />
    </FieldShell>
  );
};

const renderSelect: FieldRenderer = (props) => {
  const { name, dataList, value, className, handleChange, clearSelection, formError, disableForm } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <Select
        name={name}
        list={(dataList && dataList[name]) || []}
        active={value as string}
        className={className}
        onChange={handleChange}
        inShell
        clearSelection={clearSelection && clearSelection[name]}
        error={formError}
        isDisabled={disableForm}
      />
    </FieldShell>
  );
};

const renderTextArea: FieldRenderer = (props) => {
  const { name, value, placeholder, label, handleChange, disableForm, formError } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <TextArea
        input={{ name, value: value as string, placeholder, label, onChange: handleChange, isDisabled: disableForm }}
        hideLabels
        error={formError}
      />
    </FieldShell>
  );
};

// The one type with no FieldShell. InputCheckbox owns its own <label>, so there is no shell row for
// an addon to sit in and a checkbox field ignores `addon`. Wrapping it in a shell only when an addon
// is present would give the field a second label and a layout that differs from the same checkbox
// without one, which is exactly the drift the shell exists to prevent.
const renderCheckbox: FieldRenderer = (props) => {
  const { name, value, handleCheckbox, formMessage, formError, label, disableForm, populateLink } = props;
  return (
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
  );
};

const renderFile: FieldRenderer = (props) => {
  const { name, disableForm, value, label, handleChange } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <UploadFile
        input={{ name, isDisabled: disableForm }}
        value={typeof value === "string" ? value : value instanceof File ? value : ""}
        label={label}
        hideLabels
        onSelect={handleChange}
      />
    </FieldShell>
  );
};

const renderPrice: FieldRenderer = (props) => {
  const { name, value, label, type, handleChange } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <FieldPrice
        name={name}
        value={typeof value === "number" ? value : typeof value === "string" ? parseInt(value || "0", 10) : 0}
        label={label}
        hideLabel
        type={type}
        onChange={handleChange}
      />
    </FieldShell>
  );
};

const renderDate: FieldRenderer = (props) => {
  const { name, value, handleChange, disableForm } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <FieldDate name={name} value={`${value ?? ""}`} onChange={handleChange} isDisabled={disableForm} />
    </FieldShell>
  );
};

const renderTime: FieldRenderer = (props) => {
  const { name, formError, value, handleChange, disableForm, dataList } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <FieldTime
        name={name}
        value={value as string}
        onChange={handleChange}
        isDisabled={disableForm}
        error={formError}
        list={dataList && dataList[name]}
      />
    </FieldShell>
  );
};

const renderDay: FieldRenderer = (props) => {
  const { name, formError, value, handleChange, disableForm } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <FieldDay
        name={name}
        value={value as string}
        onChange={handleChange}
        isDisabled={disableForm}
        error={formError}
      />
    </FieldShell>
  );
};

const renderText: FieldRenderer = (props) => {
  const { name, value, handleChange, placeholder, disableForm, formError } = props;
  return (
    <FieldShell {...buildFieldShellProps(props)}>
      <Input
        value={value as string}
        onChange={handleChange}
        name={name}
        className="highlight"
        placeholder={placeholder}
        isDisabled={disableForm}
        error={formError}
      />
    </FieldShell>
  );
};

// "date-day" and "date-week" both mean "pick one of seven day names", so they route to the same
// control. They used to be a Select and a DataList, which is two visual languages for one job.
export const fieldRegistry: Record<string, FieldRenderer> = {
  number: renderNumber,
  datalist: renderDatalist,
  select: renderSelect,
  textarea: renderTextArea,
  checkbox: renderCheckbox,
  file: renderFile,
  "price-dollars-cents": renderPrice,
  date: renderDate,
  "date-time": renderTime,
  "date-day": renderDay,
  "date-week": renderDay,
};

export const renderDefaultField = renderText;
