// shared typings
type HeroProp = {
  url: string;
  alt?: string;
  name?: string;
  icon?: string;
  small?: string;
  label?: string;
  credit?: {
    artistName: string;
    artistUrl: string;
    assetUrl: string;
  };
  theme?: string;
  logoId?: string;
};
type CTAProp = {
  name: string;
  label: string;
  icon?: string;
  uid?: string;
  heroId?: string;
};

/**
 * Component - Card
 *
 * --header
 * @param title string; heading of the card
 * @param hero.theme string; heading of the card
 * @param hero.url string; heading of the card
 * @param click   callback to be fired when button is click
 * --body 
 * @param response string; the text to manipulate
 * @param hyperlink.word; string; the word that's to become a hyperlink
 * @param hyperlink.link; string; link url
 * @param hasLink: boolean; the separator to notify component its working with
 *                          hyperlink
 --footer 
 * @param data.data string; display content on page
 * @param data.buttons string[]; display any number of buttons
 * @returns Card
 */

declare module "nxs-card" {
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
    cta?: {
      name: string;
      icon: string;
      uid: string;
      label: string;
    }[];
  }
  export interface CardProps {
    data: CardProp;
    theme?: string;
    onClick?: (key: any) => void;
  }
  export interface HeroCardProps {
    data: { title?: string; tagline?: string };
    hero: HeroProp;
    theme?: string;
    cta?: CTAProp[];
  }
  export interface CTAProps {
    cta?: CTAProp[];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  }
  export interface CardSectionProps {
    hero?: HeroProp;
    hideReadMore?: boolean;
    data?: string;
    theme?: string;
  }
  export interface UserCardProps {
    hideLabels?: boolean;
    hideHero?: boolean;
    theme?: boolean;
    user: {
      hero: HeroProp;
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
