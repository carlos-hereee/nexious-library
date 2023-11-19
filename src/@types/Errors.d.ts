declare module "nxs-errors" {
  import type { AssetProps } from "nxs-assets";

  export type LightSystem = "green" | "yellow" | "red";
  export type ErrorDataProp = { [key: string]: unknown };
  export interface ErrorMessageProp {
    prop: string;
    code: string;
    name: string;
    value?: string;
    isAProp: boolean;
  }
  export interface ErrorProps {
    heading?: string;
    hero?: AssetProps;
    message?: string;
    component?: string;
    to?: string;
    errors?: ErrorMessageProp[];
  }
  export type ErrorMessageProps = {
    code: string;
    prop: string;
    component?: string;
    error?: unknown;
  };
}
