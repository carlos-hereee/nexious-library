/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "nxs-form" {
  import type { MenuItemProp } from "nxs-navigation";
  import type { KeyStringProp, OnchangeProps } from "custom-props";

  export interface AddFieldEntry {
    entry: FieldValueProps;
    oldValues: FieldValueProps[];
    name: string;
    groupName: string;
  }
  export interface ValidateInverseCheckbox {
    oldValues: FieldValueProps[];
    current: FieldValueProps;
    inverseCheckbox: (targets: string[], inverseValue: boolean, oldValues: FieldValueProps[]) => FieldValueProps[];
  }
  export type FormInitialValue = File | Blob | string | number | boolean;
  export type FormValueProps = { [key: string]: FormInitialValue };
  export type InitialExtraValue = {
    [key: string]: FormInitialValue;
    sharedKey: string;
  };
  export type OptionDataProps = {
    data: OptionProps;
    isDisabled?: boolean;
    hideOption?: boolean;
  };
  export type OptionProps = {
    name: string;
    value: string;
    label: string;
    icon?: string;
    thumbnail?: string;
    uid?: string;
    listItemId?: string;
  };
  export type FieldDateWeekProps = {
    name: string;
    onChange: (e: string) => void;
    value: string;
    placeholder: string;
    hideLabels?: boolean;
    isDisabled?: boolean;
    label?: string;
    error?: string;
    formMessage?: string;
  };
  export type FieldDateTimeProps = {
    name: string;
    onChange?: (e: string) => void;
    value: string;
    placeholder?: string;
    hideLabels?: boolean;
    isDisabled?: boolean;
    label?: string;
    error?: string;
    formMessage?: string;
  };
  export type AuthFieldProp = {
    name: string;
    onChange: (value: string) => void;
    value: string;
    placeholder: string;
    hideLabels?: boolean;
    isDisabled?: boolean;
    labels?: string;
    error?: string;
    formMessage?: string;
  };
  export type SelectFileProp = {
    name: string;
    filename: string;
    file: File;
  };
  export interface FormSchemaProps {
    required?: string[];
    unique?: { name: string; list: string[] }[];
    match?: { name: string; value: string }[];
    count?: { [key: string]: { min: number; max: number } };
  }
  export interface FieldCountSchemaProps {
    name: string;
    max?: number;
    min?: number;
  }
  // Type declarations go here
  export type FormProps = {
    // required props
    initialValues: { [key: string]: FormInitialValue };
    formId: string;
    // optional
    heading?: string;
    previewLabel?: string;
    responseError?: string;
    submitLabel?: string;
    theme?: string;
    submitIcon?: string;
    cancelLabel?: string;
    hideLabels?: boolean;
    hideSubmit?: boolean;
    confirmRemovals?: boolean;
    withFileUpload?: boolean;
    disableForm?: boolean;
    formScroll?: boolean;
    // showAuthTips?: boolean;
    dataList?: { [key: string]: MenuItemProp[] };
    clearSelection?: { [key: string]: boolean };
    schema?: FormSchemaProps;
    fieldHeading?: KeyStringProp;
    populateLink?: { [key: string]: { word: string; link: string }[] };
    labels?: KeyStringProp;
    placeholders?: KeyStringProp;
    entries?: { [key: string]: KeyStringProp[] };
    types?: KeyStringProp;
    addEntry?: { [key: string]: AddEntryProps };
    onSubmit?: (e: any) => void;
    onChange?: (e: FormInitialValue) => void;
    onCancel?: () => void;
    onViewPreview?: (e: any) => void;
  };
  export type InputCheckBoxProps = {
    name: string;
    value: boolean;
    label?: string;
    theme?: string;
    error?: string;
    type?: string;
    placeholder?: string;
    populateLink?: { word: string; link: string }[];
    min?: number;
    max?: number;
    hideLabel?: boolean;
    checked?: boolean;
    isDisabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: () => void;
    formMessage?: string;
  };
  export interface NumberInputProps {
    name: string;
    value: number;
    label?: string;
    theme?: string;
    error?: string;
    type?: string;
    placeholder?: string;
    schema?: { max?: number; min?: number };
    min?: number;
    max?: number;
    hideLabel?: boolean;
    checked?: boolean;
    isDisabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    formMessage?: string;
  }
  export type InputProps = {
    name: string;
    value?: string;
    label?: string;
    theme?: string;
    error?: string;
    type?: string;
    placeholder?: string;
    min?: number;
    max?: number;
    hideLabel?: boolean;
    checked?: boolean;
    isDisabled?: boolean;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    formMessage?: string;
  };
  export type FieldInitialValueProps = {
    value: FormInitialValue | { [key: string]: FormInitialValue }[];
    name: string;
    placeholder: string;
    type: string;
    label: string;
    fieldHeading?: KeyStringProp;
    canMultiply?: boolean;
    canRemove?: boolean;
    group?: string;
    sharedKey?: string;
    groupName?: string;
    fieldId?: string;
    onMultiply?: { additionLabel: string; name: string; removalLabel: string };
  };
  export type FieldValueData = {
    value?: FormInitialValue;
    name?: string;
    group: string;
    sharedKey: string;
    groupName: string;
  };
  export type FieldEntryProps = { [id: string]: FieldValueProps[] };
  export type FieldValueProps = {
    value: FormInitialValue;
    name: string;
    placeholder: string;
    type: string;
    label: string;
    fieldHeading?: KeyStringProp;
    fieldId: string;
    // new entry values
    sharedKey?: string;
    groupName?: string;
    group?: string;
    canMultiply?: boolean;
    canRemove?: boolean;
    onMultiply?: { additionLabel: string; name: string; removalLabel: string };
  };
  export interface PaginateFormProps {
    // required props
    paginate: FormProps[];
    page?: number;
    navigationHeading?: string;
    // optional props
    order?: string[]; // defaults set to first form on list
    hideNavigation?: boolean;
    responseError?: string;
    theme?: string;
    previewPage?: React.JSX.Element | null;
    onFormSubmit?: (e: unknown) => void;
    onCancel?: () => void;
    onPageClick?: () => void;
    onDialogClose?: () => void;
    setNewPage?: (e: number) => void;
  }
  export type AddEntryProps = {
    additionLabel: string;
    removalLabel: string;
    groupName: string;
    initialValues: { [key: string]: string };
    types: KeyStringProp;
    fieldHeading: KeyStringProp;
    onMultiply: { additionLabel: string; name: string; removalLabel: string };
    labels: KeyStringProp;
    max?: number;
    placeholders?: KeyStringProp;
    canMultiply?: boolean;
  };
  export type EntryDataProps = { value: number; fieldHeading?: string; name: string };

  export type FormatEntryProps = {
    group: string;
    // oldValues: FieldValueProps[];
    addEntry: AddEntryProps;
  };

  export type AddEntryValueProps = {
    formatValues: { [key: string]: FormInitialValue }[];
    labels?: KeyStringProp;
    types?: KeyStringProp;
    placeholders?: KeyStringProp;
    addEntry?: AddEntryProps;
    fieldHeading?: KeyStringProp;
    group?: string;
    sharedKey?: string;
    groupName?: string;
  };
  export interface FormFieldProps {
    name: string;
    value: FormInitialValue;
    placeholder: string;
    label: string;
    type: string;
    fieldId: string;
    theme?: string;
    selected?: string;
    hideLabels?: boolean;
    confirmRemoval?: boolean;
    disableForm?: boolean;
    group?: string;
    sharedKey?: string;
    canMultiply?: boolean;
    isEntry?: boolean;
    entry?: AddEntryProps;
    entries?: { [id: string]: FieldValueProps[] };
    activeEntry?: string;
    clearSelection?: { [key: string]: boolean };
    onMultiplyClick?: () => void;
    setActiveEntry?: (n: KeyStringProp) => void;
    formError?: string;
    populateLink?: { word: string; link: string }[];
    formMessage?: string;
    dataList?: { [key: string]: MenuItemProp[] };
    countSchema?: FieldCountSchemaProps[];
    fieldHeading?: { [key: string]: string };
    handleChange: (value: FormInitialValue, fieldId?: string) => void;
    setConfirmRemovals?: (key: boolean) => void;
    handleCheckbox?: (key: OnchangeProps) => void;
    onRemovalClick?: (groupName: string, idx: number) => void;
  }
  export interface LabelProps {
    label: string;
    name: string;
    theme?: string;
    error?: string;
    message?: string;
  }
  export interface UploadFileProps {
    input: InputProps;
    label: string;
    value: File | string;
    theme?: string;
    hideLabels?: boolean;
    selectLabel?: string;
    error?: string;
    onSelect: (e: File | string) => void;
    formMessage?: string;
  }
  export interface TextAreaProps {
    input: InputProps;
    theme?: string;
    error?: string;
    hideLabels?: boolean;
    formMessage?: string;
  }
  export interface SelectProp {
    name: string;
    list: OptionProps[];
    active?: string;
    theme?: string;
    hideLabels?: boolean;
    label?: string;
    error?: string;
    clearSelection?: boolean;
    isDisabled?: boolean;
    formMessage?: string;
    onChange?: (key: string) => void;
  }
  export type ValidateFormStatus = "error" | "preview" | "validated" | "green" | null;
  export type ValidateProps = {
    required?: string[];
    unique?: { name: string; list: string[] }[];
    count?: { [key: string]: { max: number; min: number } };
    match?: { name: string; value: string }[];
    strictCheckbox?: { main: string; inverse: string[] }[];
  };
  export type DataListProps = {
    list: { [key: string]: string }[];
    formMessage?: string;
    error?: string;
    value: string;
    name: string;
    label?: string;
    hideLabel?: boolean;
    hideList?: boolean;
    isDisabled?: boolean;
    placeholder?: string;
    onChange: (e: string) => void;
  };
  export type FormatExtraEntryProps = {
    entries: { [key: string]: KeyStringProp[] | KeyStringProp[][] };
    oldValues: FieldValueProps[];
    addEntry: { [key: string]: AddEntryProps };
  };
  export type FormatEntryProp = {
    value: KeyStringProp;
    addEntry: AddEntryProps;
    group: string;
    targets?: { [x: string]: FieldEntryProps };
    actives?: KeyStringProp;
  };
}
