declare module "nxs-errors" {
  export interface ErrorMessageProp {
    prop: string;
    code: string;
    key: string;
    value: string | undefined;
    isAProp: boolean;
  }
  export interface ErrorProps {
    heading?: string;
    hero?: HeroProp;
    message?: string;
    component?: string;
    to?: string;
    errors?: ErrorMessageProp[];
  }
  export type ErrorMessageProps = {
    code: string;
    prop: string;
    component?: string;
    error?: any;
  };
}
