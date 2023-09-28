/**
 * syntax - "my-module" is the name you want to use when importing the
 *           module and should match the name used in import statements
 * */
declare module "nxs-paginate-form" {
  // Define your exported types here
  export interface PaginateFormProps {
    // required props
    page: number;
    setNewPage: (e: number) => void;
    onFormSubmit: (e: any) => void;
    paginate: [
      {
        // required
        formName: string;
        initialValues: { [key: string]: any };
        // optional
        addEntry?: { initialValues: { [key: string]: any }; label: string };
        title?: string;
        labels?: { [key: string]: string };
        placeholders?: { [key: string]: string };
        types?: { [key: string]: string };
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
}
