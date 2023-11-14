declare module "custom-props" {
  export type KeyStringProp = { [key: string]: string };
  export type FormInitValues = { [key: string]: any };
  export type CellDataProp = { data: string; isHeader?: boolean; uid?: string };
  export type TableColumnProp = { span: number; name: string; uid?: string };
}
