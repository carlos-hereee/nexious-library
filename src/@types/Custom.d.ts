declare module "custom-props" {
  export type KeyStringProp = { [key: string]: string };
  // export type FormInitialValues = { [key: string]: unknown };
  export type FormInitialValues = File | string | number | boolean | KeyStringProp[];
  export type CellDataProp = { data: string; isHeader?: boolean; uid?: string };
  export type TableColumnProp = { span: number; name: string; uid?: string };
  export type OnchangeProps = React.ChangeEvent<HTMLInputElement>;
}
