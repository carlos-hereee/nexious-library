import { FormInitValues, KeyStringProp } from "@nxs-utils/helpers/types";

export interface PaginateFormProps {
  // required props
  page: number;
  setNewPage: (e: number) => void;
  onFormSubmit: (e: any) => void;
  paginate: [
    {
      // required
      formName: string;
      initialValues: FormInitValues;
      // optional
      addEntry?: { initialValues: FormInitValues; label: string };
      title?: string;
      labels?: KeyStringProp;
      placeholders?: KeyStringProp;
      types?: KeyStringProp;
      theme?: string;
      submitLabel?: string;
      heading?: string;
      schema?: { required: string[] };
    }
  ];
  // optional props
  order?: string[]; //defaults set to first form on list
  hideNavigation?: boolean;
}
