declare module "nxs-card" {
  import { AssetProps } from "nxs-assets";
  export type CTAProp = {
    name: string;
    label: string;
    icon?: string;
    uid?: string;
    sharedKey?: string;
    heroId?: string;
  };
  export interface CardProp {
    title: string;
    body: string;
    uid: string;
    subtitle?: string;
    hasHero?: boolean;
    hasFeatures?: boolean;
    isForSale?: boolean;
    isBookable?: boolean;
    isAccessory?: boolean;
    count?: number;
    cost?: number;
    hyperlink?: { word: string; link: string }[];
    features?: { uid: string; title: string; hasList: boolean; list: string[] }[];
    cta?: CTAProp[];
  }
  export interface CardProps {
    data: CardProp;
    theme?: string;
    hero?: AssetProps;
    onClick?: (key: any) => void;
  }
  export interface HeroCardProps {
    data: { title?: string; tagline?: string; subtitle?: string };
    hero?: AssetProps;
    theme?: string;
    cta?: CTAProp[];
  }
  export interface CTAProps {
    cta: CTAProp[];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
    user: {
      hero: AssetProps;
      name?: string;
      email?: string;
      phone?: string;
    };
  }
}

declare module "nxs-cart" {
  export interface CartProps {
    data: any[];
    heading: string;
    removeFromCart: (e: any) => void;
    onEditDetails: (e: any) => void;
    theme?: string;
  }
}
