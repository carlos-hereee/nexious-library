declare module "nxs-typography" {
  export type LinkProp = { data: string; isLink: boolean; link: string };
  export interface DataContent {
    title?: string;
    tagline?: string;
    subtitle?: string;
    description?: string;
    details?: string;
  }
  export interface DataProp {
    data?: string;
    message?: string;
    theme?: string;
    name?: string;
    uid?: string;
    value?: string;
    scale?: 1 | 2 | 3 | 4 | 5 | 6;
  }
  export interface PHeaderCotent {
    data: DataContent;
    children?: React.ReactNode;
    theme?: string;
  }
  export interface HyperlinkProp {
    isLink?: boolean;
    link?: string;
    children?: React.ReactNode;
    data?: string;
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
  export type CardinalDirectionProps = "up" | "down" | "left" | "right" | "north" | "south" | "west" | "east";
  export type ShowScrollProps = {
    [key in CardinalDirectionProps]: boolean;
  };
  export type ScrollTargetProps = {
    width?: number;
    height?: number;
  };
}
