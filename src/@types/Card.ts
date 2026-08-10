import type { AssetProps, UserProps } from "nxs-assets";

export type DialogProps = {
  className?: string;
  label?: string;
  toggleLabel?: string;
  toggleShow?: boolean;
  onDialogClose?: () => void;
  onConfirmClick?: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
  header?: { heading?: string; subtitle?: string; data?: string };
  // Opt-in modal semantics. When true Dialog adds role="dialog" + aria-modal, traps
  // focus, and closes on Escape. Defaults off so consumers that already wrap Dialog in
  // their own modal shell (e.g. a DialogOverlay with its own focus trap) are unaffected
  // and do not get nested dialog roles or double Escape handling.
  asModal?: boolean;
};
export type CTAProp = {
  name: string;
  className?: string;
  label: string;
  icon?: string;
  uid?: string;
  sharedKey?: string;
  heroId?: string;
  // onClick?: (key: unknown) => void;
};
export interface BannerProps {
  className?: string;
  message?: string;
  children?: React.ReactNode;
}
export interface ItemDetailProps {
  label?: string;
  value?: string;
  hint?: { title: string; body: string };
  labelLayout?: "bolden";
  children?: React.ReactNode;
}
export interface MerchProps {
  cost: number;
  inStock: number;
  quantity: number;
  name: string;
  body: string;
  hero?: AssetProps;
  uid: string;
}
export interface PCardheader {
  title?: string;
  subtitle?: string;
  className?: string;
  details?: string;
  hero?: AssetProps;
}
export interface CardProp {
  title?: string;
  tagline?: string;
  body?: string;
  description?: string;
  name?: string;
  className?: string;
  label?: string;
  hero?: AssetProps;
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
  className?: string;
  canRemove?: boolean;
  hero?: AssetProps;
  showPrice?: boolean;
  showItemTotal?: boolean;
  hidePrice?: boolean;
  hideButtons?: boolean;
  children?: React.ReactNode;
  // NOTE: used inconsistently, Card.tsx calls onClick(cta: CTAProp) while MerchCard.tsx passes
  // it straight to a <button onClick> (a MouseEvent). The `unknown` masks the conflict; narrowing
  // it needs Card and MerchCard reconciled to one contract first (FUTURE_PLANS item 80 #6).
  onClick?: (key: unknown) => void;
  onRemoveFromCart?: (key: unknown) => void;
  onAddToCart?: (key: unknown) => void;
  setQuantity?: (key: number) => void;
}
export interface HeroCardProps {
  data: CardProp;
  hero?: AssetProps;
  className?: string;
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
  className?: string;
}
export interface Section {
  title: string;
  uid: string;
  subtitle: string;
  details: string;
  body: string;
  className?: string;
  sharedKey?: string;
  heroId?: string;
  sectionHero?: AssetProps;
  hero?: AssetProps;
}
export interface CardSectionList {
  sections: Section[];
  className?: string;
  handleClick: (link: unknown) => void;
}

export interface UserCardProps {
  hideLabels?: boolean;
  hideHero?: boolean;
  className?: string;
  user: UserProps;
  // See HeroProps.isDev, overrides dev-panel visibility for this component.
  isDev?: boolean;
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
  heading?: string;
  errorMessage?: string;
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
  className?: string;
  readOnly?: boolean;
  showItemTotal?: boolean;
}
