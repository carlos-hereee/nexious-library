declare module "nxs-typography" {
  export interface DataProp {
    data?: string;
    message?: string;
    theme?: string;
    name?: string;
    uid?: string;
    value?: string;
  }
  export interface HyperlinkProp {
    isLink?: boolean;
    link: string;
    data: string;
  }
  export interface KeyValueProps {
    key: string;
    value: string;
  }
  export interface HybribDataProp {
    data: number | string;
  }
  export interface TileProps {
    tile: string | number;
  }
  export interface ReadMoreProps {
    data: string;
    uid: string;
  }
}
