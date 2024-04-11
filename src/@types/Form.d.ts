/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "nxs-form" {
  import type { MenuItemProp } from "nxs-navigation";
  import type { KeyStringProp, OnchangeProps } from "custom-props";

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
    uid?: string;
    listItemId?: string;
  };
  export type FieldDateTimeProps = {
    name: string;
    onChange: (e: string) => void;
    value: string;
    placeholder: string;
    hideLabels?: boolean;
    isDisabled?: boolean;
    label?: string;
    errors?: string;
    formMessage?: string;
  };
  export type AuthFieldProp = {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder: string;
    hideLabels?: boolean;
    isDisabled?: boolean;
    labels?: string;
    errors?: string;
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
  }
  export interface FormCountSchemaProps {
    [key: string]: { max?: number; min?: number };
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
    cancelLabel?: string;
    hideLabels?: boolean;
    hideSubmit?: boolean;
    withFileUpload?: boolean;
    disableForm?: boolean;
    noScroll?: boolean;
    // showAuthTips?: boolean;
    dataList?: { [key: string]: MenuItemProp[] };
    clearSelection?: { [key: string]: boolean };
    schema?: FormSchemaProps;
    countSchema?: FormCountSchemaProps;
    fieldHeading?: KeyStringProp;
    populateLink?: { [key: string]: { word: string; link: string }[] };
    labels?: KeyStringProp;
    placeholders?: KeyStringProp;
    types?: KeyStringProp;
    addEntry?: { [key: string]: AddEntryProps };
    onSubmit?: (e: any) => void;
    onChange?: (e: any) => void;
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
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: () => void;
    formMessage?: string;
  };
  export type FieldInitialValueProps = {
    value: FormInitialValue | { [key: string]: FormInitialValue }[];
    name: string;
    placeholder: string;
    type: string;
    label: string;
    fieldHeading?: string;
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
  export type FieldValueProps = {
    value: FormInitialValue;
    name: string;
    placeholder: string;
    type: string;
    label: string;
    fieldHeading?: string;
    canMultiply?: boolean;
    canRemove?: boolean;
    group?: string;
    sharedKey?: string;
    groupName?: string;
    fieldId?: string;
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
    initialValues: { [key: string]: FormInitialValue };
    fieldHeading: string;
    labels?: KeyStringProp;
    groupName: string;
    placeholders?: KeyStringProp;
    types?: KeyStringProp;
    canMultiply?: boolean;
  };
  export type EntryDataProps = { value: number; fieldHeading?: string; name: string };

  export type FormatEntryProps = {
    target: string;
    oldValues: FieldValueProps[];
    addEntry: AddEntryProps;
  };

  export type AddEntryValueProps = {
    formatValues: { [key: string]: FormInitialValue }[];
    labels?: KeyStringProp;
    types?: KeyStringProp;
    placeholders?: KeyStringProp;
    fieldHeading?: string;
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
    theme?: string;
    selected?: string;
    hideLabels?: boolean;
    disableForm?: boolean;
    canRemove?: boolean;
    group?: string;
    sharedKey?: string;
    canMultiply?: boolean;
    clearSelection?: boolean;
    onMultiply?: { additionLabel: string; name: string; removalLabel: string };
    onMultiplyClick?: () => void;
    onRemovalClick?: () => void;
    formError?: string;
    populateLink?: { word: string; link: string }[];
    formMessage?: string;
    dataList?: MenuItemProp[];
    countSchema?: FormCountSchemaProps;
    fieldHeading?: { [key: string]: string };
    handleChange: (key: OnchangeProps) => void;
    changeDataList: (key: string) => void;
    handleCountChange: React.ChangeEventHandler<HTMLInputElement>;
    updateSelection?: (key: string, name: string) => void;
    handleCheckbox?: (key: OnchangeProps) => void;
    handleHeroChange?: (key: File | string) => void;
  }
  export interface LabelProps {
    label: string;
    name: string;
    theme?: string;
    errors?: string;
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
  export type ValidateProps = {
    required?: string[];
    unique?: { name: string; list: string[] }[];
  };
  export type DataListProps = {
    list: { [key: string]: string }[];
    formMessage?: string;
    error?: string;
    value: string;
    name: string;
    label?: string;
    hideLabel?: boolean;
    isDisabled?: boolean;
    placeholder?: string;
    onChange: (e: string) => void;
  };
  export type FormatExtraEntryProps = {
    target: string;
    oldValues: FieldInitialValueProps[];
    addEntry: AddEntryProps;
  };
}
// export type FormValueProps = {
//   initialValues: FormInitialValues;
//   labels?: KeyStringProp;
//   types?: KeyStringProp;
//   placeholders?: KeyStringProp;
//   fieldHeading?: string;
//   addEntry?: { [key: string]: AddEntryProps };
// };
// / <reference types="nxs-assets" />
