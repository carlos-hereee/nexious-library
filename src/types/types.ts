export type DataStringProps = { data: string; name?: string };
export type IconNameProp = "";
export type String = string;
export type ChildProp = { children: JSX.Element[] | JSX.Element };
export type HeroProps = { link: string; name: string };
export type LabelValueProps = { key: string | number; value: string | number };
export type MessageProp = { message: string };
export type PageNotFoundProps = { message: string; hero: HeroProps };
// export type ChildrenProps = { children: JSX.Element[] | JSX.Element };
export type KeyStringProps = { [key: string]: string };
export type OptionProp = {
  name: string;
  value: string;
  isDisabled: boolean;
  uid?: string;
};
export type TableDataProp = { data: string };
export type TableColumnProp = { span: number; name: string; uid?: string };
export type TableRowProp = { uid?: string; data: string };
