declare module "nxs-assets" {
  export type UnplashAsset = {
    artistName: string;
    artistUrl: string;
    assetUrl: string;
  };
  export type AssetProps = {
    url?: string;
    alt?: string;
    name?: string;
    icon?: string;
    media?: string;
    small?: string;
    label?: string;
    link?: string;
    creditTo?: UnplashAsset;
    theme?: string;
    // variable id
    uid?: string;
    sharedKey?: string;
    title?: string;
    assetId?: string;
    logoId?: string;
  };
  export type UnsplashProps = { creditTo: UnplashAsset };
  export interface HeroProps {
    hero: AssetProps;
    theme?: string;
    layout?: string;
    label?: string;
    isDisable?: boolean;
    imageRef?: React.LegacyRef<HTMLImageElement>;
    onImageLoad?: () => void;
    onImageClick?: (e: unknown) => void;
    onLogoClick?: () => void;
  }
  export interface UserProps {
    hero?: string;
    name?: string;
    nickname?: string;
    address?: string;
    username?: string;
    email?: string;
    phone?: string;
    uid?: string;
    userId?: string;
  }
  export interface TextBubbleProps {
    hero: AssetProps;
    data: { rating: number; title: string; body: string };
    theme?: string;
    children?: React.ReactNode;
  }
  export interface BubbleProps {
    title: string;
    body: string;
  }
  export interface BubblyProps {
    bubbles?: number;
  }
  export interface MediaProps {
    medias: AssetProps[];
    hero?: AssetProps;
    theme?: string;
    label?: string;
    heading?: string;
  }
  export type RatingProps = {
    star: number;
    onClick?: (e: unknown) => void;
  };
}
