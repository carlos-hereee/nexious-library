// /** declare module "my-module"
//  * syntax  - "my-module" is the name you want to use when importing the
//  *           module and should match the name used in import statements
//  * */

declare module "nxs-form" {
  import { FormInitValues, KeyStringProp } from "custom-props";
  export type OptionProps = {
    name?: string;
    value: string;
    label: string;
    isDisabled?: boolean;
    hideOption?: boolean;
  };
  export type AuthFieldProp = {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder: string;
    hideLabels?: boolean;
    labels?: string;
    errors?: string;
    formMessage?: string;
  };
  export type SelectFileProp = {
    name: string;
    filename: string;
    file: File;
  };
  // Type declarations go here
  export type FormProps = {
    // required props
    initialValues: FormInitValues;
    onSubmit: (e: any) => void;
    formId: string;
    // optional
    heading?: string;
    previewLabel?: string;
    onChange?: (e: any) => void;
    onCancel?: () => void;
    onViewPreview?: (e: any) => void;
    hideLabels?: boolean;
    hideSubmit?: boolean;
    withFileUpload?: boolean;
    showAuthTips?: boolean;
    responseError?: string;
    theme?: string;
    labels?: KeyStringProp;
    placeholders?: KeyStringProp;
    types?: KeyStringProp;
    submitLabel?: string;
    dataList?: { [key: string]: { [key: string]: string }[] };
    schema?: { required: string[]; unique?: { name: string; list: string[] }[] };
    fieldHeading?: { [key: string]: string };
    addEntry?: { [key: string]: AddEntryProps };
  };
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
  export type FieldValueProps = {
    value: any;
    label: string;
    name: string;
    placeholder: string;
    type: string;
    fieldHeading?: string;
    canMultiply?: boolean;
    canRemove?: boolean;
    group?: string;
    sharedKey?: string;
    groupName?: string;
    onMultiply?: { additionLabel: string; name: string; removalLabel: string };
  };
  export interface PaginateFormProps {
    // required props
    paginate: FormProps[];
    page?: number;
    navigationHeading?: string;
    onFormSubmit?: (e: any) => void;
    onCancel?: () => void;
    onPageClick?: () => void;
    setNewPage?: (e: number) => void;
    // optional props
    order?: string[]; //defaults set to first form on list
    hideNavigation?: boolean;
    responseError?: string;
    previewPage?: React.JSX.Element;
  }
  export type AddEntryProps = {
    additionLabel: string;
    removalLabel: string;
    initialValues: FormInitValues;
    fieldHeading: string;
    labels?: KeyStringProp;
    groupName: string;
    placeholders?: KeyStringProp;
    types?: KeyStringProp;
    canMultiply?: boolean;
  };
  export type EntryDataProps = { value: number; fieldHeading?: string; name: string };
  export type FormValueProps = {
    initialValues: FormInitValues;
    labels?: KeyStringProp;
    types?: KeyStringProp;
    placeholders?: KeyStringProp;
    fieldHeading?: string;
    addEntry?: { [key: string]: AddEntryProps };
  };
  export type FormatEntryProps = {
    target: string;
    oldValues: FieldValueProps[];
    addEntry: AddEntryProps;
  };
  export type FormatEntraEntryProps = {
    target: string;
    oldValues: FormInitValues;
    addEntry: AddEntryProps;
  };
  export type AddEntryValueProps = {
    // formatValues;
    formatValues: FormInitValues[];
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
    value: any;
    placeholder: string;
    label: string;
    type: string;
    theme?: string;
    selected?: string;
    hideLabels?: boolean;
    canRemove?: boolean;
    group?: string;
    sharedKey?: string;
    canMultiply?: boolean;
    onMultiply?: { additionLabel: string; name: string; removalLabel: string };
    onMultiplyClick?: () => void;
    onRemovalClick?: () => void;
    formError?: string;
    formMessage?: string;
    dataList?: { [key: string]: string }[];
    fieldHeading?: { [key: string]: string };
    handleChange: (key: any) => void;
    changeDataList: (key: any) => void;
    updateSelection?: (key: any, name: string) => void;
    handleCheckbox?: (key: any) => void;
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
    list: { [key: string]: string }[];
    active?: string;
    theme?: string;
    hideLabels?: boolean;
    label?: string;
    error?: string;
    formMessage?: string;
    onChange: (key: string) => void;
  }
  export type ValidateProps = {
    required?: string[];
    unique?: { name: string; list: string[] }[];
    labels?: KeyStringProp;
  };
  export type DataListProps = {
    list: { [key: string]: string }[];
    formMessage?: string;
    error?: string;
    value: string;
    name: string;
    label?: string;
    hideLabel?: boolean;
    placeholder?: string;
    onChange: (e: any) => void;
  };
}
