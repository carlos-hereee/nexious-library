declare module "nxs-payment-methods" {
  export type PaymentType = {
    uid: string;
    type: string;
    hero?: HeroProp;
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
