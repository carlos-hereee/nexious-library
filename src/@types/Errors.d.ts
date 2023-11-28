declare module "nxs-errors" {
  import type { AssetProps } from "nxs-assets";

  export type LightSystem = "green" | "yellow" | "red" | null;
  export type RequiredTypesProps = { [key: string]: unknown };
  export interface ErrorMessageProp {
    prop: string;
    code: string;
    name: string;
    value?: unknown;
    isAProp: boolean;
  }
  export interface ErrorProps {
    heading?: string;
    hero?: AssetProps;
    message?: string;
    component?: string;
    to?: string;
    errors: ErrorMessageProp[];
    timer?: number;
    handleClick?: () => void;
  }
  export type ErrorProp = {
    value: { [key: string]: unknown } | unknown;
    code: string;
    prop: string;
    component?: string;
    isAProp?: boolean;
  };
  export type ErrorMessageProps = {
    error: ErrorProp;
  };
}
