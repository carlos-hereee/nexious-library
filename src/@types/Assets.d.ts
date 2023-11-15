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
    credit?: {
      artistName: string;
      artistUrl: string;
      assetUrl: string;
    };
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
    label?: string;
    imageRef?: any;
    onImageClick?: (e: any) => void;
  }
  export interface TextBubbleProps {
    hero: AssetProps;
    data: { rating: number; title: string; body: string };
    theme?: string;
  }
  export interface BubbleProps {
    title: string;
    body: string;
  }
  export interface MediaProps {
    medias: AssetProps[];
    theme?: string;
    label?: string;
  }
  export type RatingProps = {
    star: number;
    onClick?: (e: any) => void;
  };
}
