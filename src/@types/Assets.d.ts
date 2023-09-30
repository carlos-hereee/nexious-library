type UnplashAsset = {
  artistName: string;
  artistUrl: string;
  assetUrl: string;
};
type AssetProp = {
  url: string;
  alt?: string;
  name?: string;
  icon?: string;
  small?: string;
  label?: string;
  link?: string;
  credit?: {
    artistName: string;
    artistUrl: string;
    assetUrl: string;
  };
  theme?: string;
  uid?: string;
  assetId?: string;
  logoId?: string;
};
declare module "nxs-assets" {
  export type AssetProps = AssetProp;
  export type UnsplashProps = { creditTo: UnsplashAsset };
  export interface HeroProps {
    hero: AssetProp;
    theme?: string;
    label?: string;
    onImageClick?: (e: any) => void;
  }
  export interface TextBubbleProps {
    hero: HeroProp;
    data: { rating: number; title: string; body: string };
    theme?: string;
  }
  export interface BubbleProps {
    title: string;
    body: string;
  }
}
/**
 * Component Hero Logo
 * @param logo.url string; add url pointing to asset
 * @param logo.alt string; add an alt tag
 * @param name string; add an optional classname for logo container
 * @param logoName string; add an optional classname for logo asset
 * @returns image component
 */
declare module "nxs-assets-medias" {
  export interface MediaProps {
    medias: AssetProp[];
    theme?: string;
    label?: string;
  }
  export type RatingProps = {
    star: number;
    onClick?: (e: any) => void;
  };
}
