/**
 * syntax - "my-module" is the name you want to use when importing the
 *           module and should match the name used in import statements
 * */
declare module "nxs-form" {
  // Type declarations go here
  export interface FormProps {
    // initialValues: FormInitValues; this is invalid you must declare types
    initialValues: { [key: string]: any };
    // required props
    onSubmit: (e: any) => void;
    formName?: string;
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
  }
}
