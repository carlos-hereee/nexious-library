declare module "nxs-card" {
  import type { AssetProps, UserProps } from "nxs-assets";

  export type DialogProps = {
    theme?: string;
    onDialogClose?: () => void;
    children: React.ReactNode;
    header?: { heading?: string; subtitle?: string; data?: string };
  };
  export type CTAProp = {
    name: string;
    theme?: string;
    label: string;
    icon?: string;
    uid?: string;
    sharedKey?: string;
    heroId?: string;
    // onClick?: (key: unknown) => void;
  };
  export interface MerchProps {
    cost: number;
    inStock: number;
    quantity: number;
    name: string;
    body: string;
    hero: string;
    uid: string;
  }
  export interface CardProp {
    title?: string;
    tagline?: string;
    body?: string;
    name?: string;
    theme?: string;
    label?: string;
    hero?: string;
    uid?: string;
    subtitle?: string;
    hasHero?: boolean;
    hasFeatures?: boolean;
    isForSale?: boolean;
    isBookable?: boolean;
    isAccessory?: boolean;
    quantity?: number;
    inStock?: number;
    count?: number;
    cost?: number;
    hyperlink?: { word: string; link: string }[];
    features?: { uid: string; title: string; hasList: boolean; list: string[] }[];
    cta?: CTAProp[];
  }
  export interface CardProps {
    data: CardProp;
    theme?: string;
    canRemove?: string;
    hero?: AssetProps;
    showPrice?: boolean;
    onClick?: (key: unknown) => void;
    onRemoveFromCart?: (key: unknown) => void;
    onAddToCart?: (key: unknown) => void;
    setQuantity?: (key: number) => void;
  }
  export interface HeroCardProps {
    data: CardProp;
    hero?: AssetProps;
    theme?: string;
    onClick?: (key: unknown) => void;
    viewAsPreview?: boolean;
  }
  export interface CTAProps {
    cta: CTAProp;
    onClick?: (key: unknown) => void;
    // onClick?: (key: unknown) => void;
    viewAsPreview?: boolean;
  }
  export interface CardSectionProps {
    hero?: AssetProps;
    hideReadMore?: boolean;
    data?: string;
    theme?: string;
  }

  export interface UserCardProps {
    hideLabels?: boolean;
    hideHero?: boolean;
    theme?: boolean;
    user: UserProps;
  }

  export type PaymentType = {
    uid: string;
    type: string;
    hero?: AssetProps;
    name?: string;
    icon?: string;
  };
  export type PaymentMethodsProps = {
    data: PaymentType[];
    active: PaymentType;
    onClick: (e: PaymentType) => void;
    visaPayment?: (a: unknown) => void;
    paypalPayment?: (e: unknown) => void;
    inStorePayment?: (a: unknown) => void;
  };
  export interface CartProps {
    data: MerchProps[];
    heading: string;
    removeFromCart: (e: MerchProps) => void;
    onEditDetails: (e: MerchProps) => void;
    setQuantity: (e: MerchProps, count: number) => void;
    theme?: string;
  }
}
