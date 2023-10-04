// /** declare module "my-module"
//  * syntax  - "my-module" is the name you want to use when importing the
//  *           module and should match the name used in import statements
//  * */

declare module "nxs-form" {
  interface FormProp {
    // initialValues: FormInitValues; this is invalid you must declare types
    initialValues: { [key: string]: any };
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
    labels?: { [key: string]: string };
    placeholders?: { [key: string]: string };
    types?: { [key: string]: string };
    submitLabel?: string;
    schema?: { required: string[] };
    addEntry?: {
      [key: string]: {
        additionLabel: string;
        initialValues: { [key: string]: any };
        fieldHeading: string;
        labels?: { [key: string]: string };
        placeholders?: { [key: string]: string };
        types?: { [key: string]: string };
      };
    };
    selectList?: { name: string; value: string; isDisabled?: boolean; uid?: string }[];
  }
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
  // Type declarations go here
  export type FormProps = FormProp;
  export type InputProps = InputProp;
  export interface FormFieldProps {
    name: string;
    value: string;
    placeholder: string;
    label: string;
    type: string;
    selected?: string;
    selectList?: { name: string; value: string; isDisabled?: boolean; uid?: string }[];
    hideLabels?: boolean;
    formError?: string;
    fieldHeading?: string;
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
