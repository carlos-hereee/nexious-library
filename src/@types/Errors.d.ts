declare module "nxs-errors" {
  import type { AssetProps } from "nxs-assets";

  export type LightSystem = "green" | "yellow" | "red" | null;
  export type ErrorDataProp = { [key: string]: string[] | { [key: string]: unknown } };
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
    errors?: ErrorMessageProp[];
  }
  export type ErrorMessageProps = {
    code: string;
    prop: string;
    component?: string;
    error?: unknown;
  };
}
