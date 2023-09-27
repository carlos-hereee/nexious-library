import { FormInitValues } from "@nxs-utils/helpers/types";

export interface FormProps {
  // required props
  initialValues: FormInitValues;
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
