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
  // Opt in to a CORS-enforced load (sets the img crossOrigin attribute). Default
  // off so cross-origin assets without an Access-Control-Allow-Origin header (the
  // production S3 bucket, FUTURE_PLANS item 68) still paint. Only set this when a
  // caller actually needs a clean canvas read.
  crossOrigin?: boolean;
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
  data: { rating: number; title: string; body: string; data: string };
  theme?: string;
  sender?: boolean;
  children?: React.ReactNode;
}
export interface BubbleProps {
  title: string;
  data: string;
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
