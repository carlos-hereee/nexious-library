// /** declare module "my-module"
//  * syntax  - "my-module" is the name you want to use when importing the
//  *           module and should match the name used in import statements
//  * */

declare module "nxs-form" {
  import { FormInitValues, KeyStringProp } from "custom-props";

  type FormProp = {
    initialValues: FormInitValues;
    // required props
    onSubmit: (e: any) => void;
    formName: string;
    heading?: string;
    // optional
    onChange?: (e: any) => void;
    hideLabels?: boolean;
    hideSubmit?: boolean;
    showAuthTips?: boolean;
    theme?: string;
    labels?: KeyStringProp;
    placeholders?: KeyStringProp;
    types?: KeyStringProp;
    submitLabel?: string;
    schema?: { required: string[] };
    fieldHeading?: { [key: string]: string };
    addEntry?: {
      [key: string]: {
        additionLabel: string;
        removalLabel: string;
        initialValues: FormInitValues;
        fieldHeading: string;
        labels?: KeyStringProp;
        placeholders?: KeyStringProp;
        types?: KeyStringProp;
        canMultiply?: boolean;
      };
    };
    selectList?: { name: string; value: string; isDisabled?: boolean; uid?: string }[];
  };
  type InputProp = {
    name: string;
    value: string;
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
  };
  type FormFieldValues = {
    value: any;
    label: string;
    name: string;
    placeholder: string;
    type: string;
    fieldHeading?: string;
    canMultiply?: boolean;
    canRemove?: boolean;
    removalBy?: string;
    onMultiply?: { additionLabel: string; name: string; removalLabel: string };
  };
  // Type declarations go here
  export type FormProps = FormProp;
  export type InputProps = InputProp;
  export type FieldValueProp = FormFieldValues;
  export type EntryDataProps = { value: number; fieldHeading?: string; name: string };
  export type FormValueProps = {
    initialValues: FormInitValues;
    labels?: KeyStringProp;
    types?: KeyStringProp;
    placeholders?: KeyStringProp;
    fieldHeading?: string;
  };
  export type AddEntryValueProps = {
    values: FormInitValues[];
    labels?: KeyStringProp;
    types?: KeyStringProp;
    placeholders?: KeyStringProp;
    fieldHeading?: string;
    removalBy?: string;
  };
  export type FormInitialValueProps = FormFieldValues;
  export interface FormFieldProps {
    name: string;
    value: string;
    placeholder: string;
    label: string;
    type: string;
    selected?: string;
    selectList?: { name: string; value: string; isDisabled?: boolean; uid?: string }[];
    hideLabels?: boolean;
    canRemove?: boolean;
    removalBy?: string;
    canMultiply?: boolean;
    onMultiply?: { additionLabel: string; name: string; removalLabel: string };
    onMultiplyClick?: () => void;
    onRemovalClick?: () => void;
    formError?: string;
    fieldHeading?: { [key: string]: string };
    handleChange: (key: any) => void;
    updateSelection?: (key: any, name: string) => void;
    handleCheckbox?: (key: any) => void;
  }
  export interface LabelProps {
    label: string;
    name: string;
    theme?: string;
    errors?: string;
  }
  export interface UploadFileProps {
    input: InputProp;
    label: string;
    theme?: string;
    hideLabels?: boolean;
    selectLabel?: string;
    error?: string;
    onSelect: (e: any) => void;
  }
  export interface TextAreaProps {
    input: InputProp;
    theme?: string;
    hideLabels?: boolean;
  }
  export interface SelectProp {
    name: string;
    list: { name: string; value: string; isDisabled?: boolean; uid?: string }[];
    active?: string;
    theme?: string;
    hideLabels?: boolean;
    label?: string;
    error?: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
  }
}
