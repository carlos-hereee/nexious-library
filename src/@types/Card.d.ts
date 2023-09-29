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
  export interface CardProps {
    data: {
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
    };
    theme?: string;
    onClick: (key: any) => void;
  }
}

/**
 * Component - Card Footer
 * @param data.data string; display content on page
 * @param data.buttons string[]; display any number of buttons
 * @returns
 */
declare module "nxs-card-footer" {
  export interface CardFooterProps {
    cta?: {
      name: string;
      icon: string;
      uid: string;
      label: string;
    }[];
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }
}

declare module "nxs-user-card" {
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
