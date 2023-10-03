/**
 * syntax - "my-module" is the name you want to use when importing the
 *           module and should match the name used in import statements
 * */
declare module "nxs-paginate-form" {
  import { FormProps } from "nxs-form";
  // Define your exported types here
  export interface PaginateFormProps {
    // required props
    onFormSubmit: (e: any) => void;
    paginate: [FormProps];
    page?: number;
    setNewPage?: (e: number) => void;
    // optional props
    order?: string[]; //defaults set to first form on list
    hideNavigation?: boolean;
  }
}
