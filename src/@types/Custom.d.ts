declare module "custom-props" {
  export type KeyStringProp = { [key: string]: string };
  // export type FormInitialValues = { [key: string]: unknown };
  export type PTableData = { value?: string; isHeader?: boolean; uid?: string; theme?: string };
  export type OnchangeProps = React.ChangeEvent<HTMLInputElement>;
  export interface SectionProps {
    title?: string;
    subtitle?: string;
    details?: string;
    data?: string;
    body?: string;
    theme?: string;
    hasCta?: boolean;
    hasBoolean?: boolean;
    uid?: string;
    heroId?: string;
    _id?: string;
    sections?: { [key: string]: string }[];
    medias?: { [key: string]: string }[];
  }
  export interface TotalProps {
    total: number;
    theme: string;
    heading?: string;
  }
  export type ObjectToArray<P> = (obj?: { [key: string]: P }) => { [key: string]: P }[] | [];
  export type AddArrayInObject<T = KeyStringProp> = {
    obj: { [key: string]: T };
    key: string;
    value: T;
  };
}
