declare module "nxs-payment-methods" {
  import { AssetProps } from "nxs-assets";
  export type PaymentType = {
    uid: string;
    type: string;
    hero?: AssetProps;
    name?: string;
    icon?: string;
  };
  export type PaymentMethodsProps = {
    data: PaymentType[];
    visaPayment?: (a: any) => void;
    paypalPayment?: (e: any) => void;
    inStorePayment?: (a: any) => void;
  };
}
